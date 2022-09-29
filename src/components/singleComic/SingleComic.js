import './singleComic.scss';
import xMen from '../../resources/img/x-men.png';
import { useParams, Link } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService'
import { useEffect, useState } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const SingleComic = () => {
    const { id } = useParams();
    const { loading, error, getComics, clearError } = useMarvelService();
    const [comics, setComics] = useState({});

    console.log(id)

    useEffect(() => {
        onRequest();
    }, [id])

    const onRequest = () => {
        clearError();
        getComics(id)
            .then(onComicsLoaded);
    }


    const onComicsLoaded = (comics) => {
        setComics(comics);
    }

    const ComicsView = ({ comics }) => {
        let imgStyle = { 'objectFit': 'cover' }
        if (comics.thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
            imgStyle = { 'objectFit': 'unset' }
        }

        return (
            <div className="single-comic">
                <img src={comics.thumbnail} alt="comics.title" className="single-comic__img" style={imgStyle} />
                <div className="single-comic__info">
                    <h2 className="single-comic__name">{comics.title}</h2>
                    <p className="single-comic__descr">{comics.description}</p>
                    <p className="single-comic__descr">{comics.pageCount} pages</p>
                    <p className="single-comic__descr">Language: en-us</p>
                    <div className="single-comic__price">{comics.price}</div>
                </div>
                <Link to='/comics' className="single-comic__back">Back to all</Link>
            </div >
        )
    }


    const spinner = loading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;
    const content = !(loading || error || !comics) ? <ComicsView comics={comics} /> : null;

    return (
        <>
            {spinner}
            {errorMessage}
            {content}
        </>
    )
}

export default SingleComic;