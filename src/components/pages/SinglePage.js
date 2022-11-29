import AppBanner from '../appBanner/AppBanner';
import useMarvelService from '../../services/MarvelService';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import setContent from '../../utils/setContent';
import { fetchCharById } from '../charInfo/charInfoSlice';
import { fetchComicById } from '../comicsList/comicInfoSlice';
import { useSelector, useDispatch } from 'react-redux';


const SinglePage = ({ Component, dataType }) => {
    const { getCharacter, getComics } = useMarvelService();
    const { id } = useParams();
    const dispatch = useDispatch();
    const charLoadingStatus = useSelector(state => state.charInfo.loadingStatus)
    const char = useSelector(state => state.charInfo.charInfo);
    const comicLoadingStatus = useSelector(state => state.comicInfo.loadingStatus)
    const comic = useSelector(state => state.comicInfo.comicInfo);

    useEffect(() => {
        onRequest();
        // eslint-disable-next-line
    }, [id]);


    const onRequest = () => {
        switch (dataType) {
            case 'char':
                dispatch(fetchCharById({ charId: id, getCharacter }));
                break;
            case 'comics':
                dispatch(fetchComicById({ comicId: id, getComics }));
                break;
            default:
                break;
        }
    }

    const styles = {
        'position': 'absolute',
        'top': '150px',
        'left': '50%',
        'transform': 'translateX(-50%)'
    }

    const content = dataType === 'char' ?
        setContent(charLoadingStatus, Component, char, styles) :
        setContent(comicLoadingStatus, Component, comic, styles)

    return (
        <>
            <AppBanner />
            {content}
        </>
    )
}

export default SinglePage;