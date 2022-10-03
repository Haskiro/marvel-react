import AppBanner from '../appBanner/AppBanner';
import useMarvelService from '../../services/MarvelService';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';


const SinglePage = ({ Component, dataType }) => {
    const [data, setData] = useState({});
    const { error, loading, getCharacter, getComics, clearError } = useMarvelService();
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
                break;
            case 'comics':
                getComics(id)
                    .then(onDataLoaded)
                break;
            default:
                break
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

    const spinner = loading ? <Spinner style={styles} /> : null;
    const errorMessage = error ? <ErrorMessage style={styles} /> : null;
    const content = !(error || loading) ? <Component data={data} /> : null;

    return (
        <>
            <AppBanner />
            {spinner}
            {errorMessage}
            {content}
        </>
    )
}

export default SinglePage;