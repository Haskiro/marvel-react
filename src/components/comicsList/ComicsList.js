import './comicsList.scss';
import useMarvelService from '../../services/MarvelService';
import { useEffect, useRef, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const setContent = (process, Component, newItemLoading) => {
    switch (process) {
        case 'waiting':
            return <Spinner className='comics-list-spinner' />;
        case 'loading':
            return newItemLoading ? <Component /> : <Spinner className='comics-list-spinner' />;
        case 'confirmed':
            return <Component />;
        case 'error':
            return <ErrorMessage />;
        default:
            throw new Error('Unexpected process state');
    }
}

const ComicsList = () => {
    const { getAllComics, process, setProcess } = useMarvelService();
    const [offset, setOffset] = useState(210);
    const [comicsList, setComicsList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [comicsEnded, setComicsEnded] = useState(false)

    const refsList = useRef([]);

    const focusOnItem = (id) => {
        refsList.current.forEach(item => {
            item.classList.remove('char__item_selected')
        });
        refsList.current[id].classList.add('char__item_selected')
        refsList.current[id].focus();
    }

    useEffect(() => {
        onRequest(offset, true);

    }, [])

    const onRequest = (offset, initial = false) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllComics(offset)
            .then(onComicsListLoaded)
            .then(() => setProcess('confirmed'));
    }

    const onComicsListLoaded = (newComics) => {
        let ended = false;
        if (newComics.length < 12) ended = true;

        setNewItemLoading(false);
        setOffset(offset => offset + 12)
        setComicsList([...comicsList, ...newComics]);
        setComicsEnded(ended);
    }

    const renderComics = (comicsList) => {
        return (
            <TransitionGroup component={null}>
                {comicsList.map((comics, i) => {
                    let imgStyle = { 'objectFit': 'cover' }
                    if (comics.thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
                        imgStyle = { 'objectFit': 'unset' }
                    }
                    return (
                        <CSSTransition
                            key={comics.id}
                            in={comicsList !== []}
                            timeout={300}
                            classNames="comics__item"
                            mountOnEnter
                            unmountOnExit
                        >
                            <li
                                className="comics__item"
                                key={comics.id}
                                ref={el => refsList.current[i] = el}
                                onClick={() => focusOnItem(i)}
                                onKeyPress={(e) => {
                                    if (e.key === ' ' || e.key === "Enter") {
                                        focusOnItem(i);
                                    }
                                }}
                            >
                                <Link to={`/comics/${comics.id}`}>
                                    <img src={comics.thumbnail} alt="ultimate war" className="comics__item-img" style={imgStyle} />
                                    <div className="comics__item-name">{comics.title}</div>
                                    <div className="comics__item-price">{comics.price}</div>
                                </Link>
                            </li >
                        </CSSTransition>
                    )
                }
                )}
            </TransitionGroup>
        )
    }

    const elements = useMemo(() => {
        return (
            setContent(process, () => renderComics(comicsList), newItemLoading)
        )
        // eslint-disable-next-line
    }, [process])


    return (
        <div className="comics__list">
            <ul className="comics__grid">
                {elements}
            </ul>
            <button
                className="button button__main button__long"
                onClick={() => {
                    onRequest(offset);
                }}
                disabled={newItemLoading}
                style={{ 'display': comicsEnded ? 'none' : 'block' }}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;