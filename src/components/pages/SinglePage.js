import AppBanner from '../appBanner/AppBanner';
import useMarvelService from '../../services/MarvelService';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import setContent from '../../utils/setContent';


const SinglePage = ({ Component, dataType }) => {
    const [data, setData] = useState({});
    const { getCharacter, getComics, clearError, process, setProcess } = useMarvelService();
    const { id } = useParams();

    useEffect(() => {
        onRequest();
    }, [id]);

    const onRequest = () => {
        clearError()
        switch (dataType) {
            case 'char':
                getCharacter(id)
                    .then(onDataLoaded)
                    .then(() => setProcess('confirmed'));
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

    return (
        <>
            <AppBanner />
            {setContent(process, Component, data, styles)}
        </>
    )
}

export default SinglePage;