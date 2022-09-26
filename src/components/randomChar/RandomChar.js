import './randomChar.scss';
import { useState, useEffect } from 'react';
import mjolnir from '../../resources/img/mjolnir.png';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage'

const RandomChar = () => {

    const [char, setChar] = useState({});
    const [imgNotFound, setImgNotFound] = useState(false);

    const { loading, error, getCharacter, clearError } = useMarvelService();

    useEffect(() => {
        updateChar();
        const timerId = setInterval(updateChar, 60000);

        return () => clearInterval(timerId);
    }, []);

    const onImgNotFound = (thumbnail) => {
        if (thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
            setImgNotFound(true);
        } else {
            setImgNotFound(false);
        }
    }

    const onCharLoaded = (char) => {
        setChar(char);
        onImgNotFound(char.thumbnail);
    }

    const updateChar = () => {
        clearError();
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        getCharacter(id)
            .then(onCharLoaded)
    }


    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner className='random-char-spinner' /> : null;
    const content = !(loading || error) ? <View char={char} imgNotFound={imgNotFound} /> : null;

    return (
        <div className="randomchar">
            {errorMessage}
            {spinner}
            {content}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br />
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main" onClick={updateChar}>
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
            </div>
        </div>
    )

}

const View = ({ char, imgNotFound }) => {
    const { name, description, thumbnail, homepage, wiki } = char;
    const imgClass = imgNotFound ? 'randomchar__img not-found' : 'randomchar__img';

    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className={imgClass} />
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;