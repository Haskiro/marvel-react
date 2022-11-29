import AppBanner from '../appBanner/AppBanner';
import useMarvelService from '../../services/MarvelService';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import setContent from '../../utils/setContent';
import { fetchCharById } from '../charInfo/charInfoSlice';
import { useSelector, useDispatch } from 'react-redux';


const SinglePage = ({ Component, dataType }) => {
    const [data, setData] = useState({});
    const { getCharacter, getComics, setProcess } = useMarvelService();
    const { id } = useParams();
    const dispatch = useDispatch();
    const process = useSelector(state => state.charInfo.loadingStatus)
    const char = useSelector(state => state.charInfo.charInfo);

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
                getComics(id)
                    .then(onDataLoaded)
                    .then(() => setProcess('confirmed'));
                break;
            default:
                break;
        }
    }
    const onDataLoaded = (data) => {
        setData(data);
    }

    const styles = {
        'position': 'absolute',
        'top': '150px',
        'left': '50%',
        'transform': 'translateX(-50%)'
    }

    const content = dataType === 'char' ?
        setContent(process, Component, char, styles) :
        setContent(process, Component, data, styles)

    return (
        <>
            <AppBanner />
            {content}
        </>
    )
}

export default SinglePage;