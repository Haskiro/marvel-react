import './charInfo.scss';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';
import { fetchCharById } from "./charInfoSlice";
import { useDispatch, useSelector } from 'react-redux';

const CharInfo = () => {

    const char = useSelector(state => state.charInfo.charInfo);
    const charId = useSelector(state => state.charInfo.charId);
    const process = useSelector(state => state.charInfo.loadingStatus);

    const { getCharacter } = useMarvelService();
    const dispatch = useDispatch();

    useEffect(() => {
        if (charId) dispatch(fetchCharById({ charId, getCharacter }))
        // eslint-disable-next-line
    }, [charId]);

    return (
        <div className="char__info">
            {setContent(process, View, char)}
        </div>
    )


}

const View = ({ data }) => {
    const { name, description, thumbnail, wiki, homepage, comics } = data;
    let imgStyle = { 'objectFit': 'cover' }
    if (thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
        imgStyle = { 'objectFit': 'unset' }
    }

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : 'There is no comics for this character'}
                {comics.map((item, i) => {
                    // eslint-disable-next-line
                    if (i > 9) return;
                    return (
                        <li className="char__comics-item" key={i}>
                            {item.name}
                        </li>
                    )
                })}
            </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number,
}

export default CharInfo;