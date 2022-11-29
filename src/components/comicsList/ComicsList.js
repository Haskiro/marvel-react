import './comicsList.scss';
import useMarvelService from '../../services/MarvelService';
import { useEffect, useRef, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import { fetchAllComics } from './comicsListSlice';

const setContent = (process, Component, newItemLoading) => {
    switch (process) {
        case 'idle':
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
    const comicsList = useSelector(state => state.comicsList.comicsList);
    const dispatch = useDispatch();
    const offset = useSelector(state => state.comicsList.offset);
    const initial = useSelector(state => state.comicsList.initial);
    const comicsEnded = useSelector(state => state.comicsList.comicsEnded);
    const process = useSelector(state => state.comicsList.loadingStatus);
    const newItemLoading = useSelector(state => state.comicsList.newItemLoading);

    const { getAllComics } = useMarvelService();

    const refsList = useRef([]);

    const focusOnItem = (id) => {
        refsList.current.forEach(item => {
            item.classList.remove('char__item_selected')
        });
        refsList.current[id].classList.add('char__item_selected')
        refsList.current[id].focus();
    }

    useEffect(() => {
        dispatch(fetchAllComics({ offset, getAllComics }));
        // eslint-disable-next-line
    }, [])

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
            setContent(process, () => renderComics(comicsList), !initial)
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
                    dispatch(fetchAllComics({ offset, getAllComics }));
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