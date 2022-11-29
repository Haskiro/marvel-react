import './charList.scss';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import useMarvelService from '../../services/MarvelService';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllChars } from './charListSlice';


const setContent = (process, Component, newItemLoading) => {
    switch (process) {
        case 'idle':
            return <Spinner className='char-list-spinner' />;
        case 'loading':
            return newItemLoading ? <Component /> : <Spinner className='char-list-spinner' />;
        case 'confirmed':
            return <Component />;
        case 'error':
            return <ErrorMessage />;
        default:
            console.log(process)
            throw new Error('Unexpected process state');
    }
}

const CharList = ({ onCharSelected }) => {

    const charList = useSelector(state => state.charList.charList);
    const dispatch = useDispatch();
    const offset = useSelector(state => state.charList.offset);
    const initial = useSelector(state => state.charList.initial);
    const charEnded = useSelector(state => state.charList.charEnded);
    const process = useSelector(state => state.charList.loadingStatus);
    const newItemLoading = useSelector(state => state.charList.newItemLoading);

    const refsList = useRef([]);
    const { getAllCharacters } = useMarvelService();

    const focusOnItem = (id) => {
        refsList.current.forEach(item => {
            item.classList.remove('char__item_selected')
        });
        refsList.current[id].classList.add('char__item_selected')
        refsList.current[id].focus();
    }

    useEffect(() => {
        dispatch(fetchAllChars({ offset, getAllCharacters }));
        // eslint-disable-next-line
    }, []);

    const renderItems = (charList) => {
        const items = charList.map((char, i) => {
            let imgStyle = { 'objectFit': 'cover' }
            if (char.thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
                imgStyle = { 'objectFit': 'unset' }
            }

            return (
                <CSSTransition
                    key={char.id}
                    in={charList !== []}
                    timeout={300}
                    classNames="char__item"
                    mountOnEnter
                    unmountOnExit
                >
                    <li
                        className="char__item"
                        tabIndex={0}
                        ref={el => refsList.current[i] = el}
                        onClick={() => {
                            onCharSelected(char.id)
                            focusOnItem(i);
                        }}
                        onKeyPress={(e) => {
                            if (e.key === ' ' || e.key === "Enter") {
                                onCharSelected(char.id);
                                focusOnItem(i);
                            }
                        }}
                    >
                        <img src={char.thumbnail} alt={char.name} style={imgStyle} />
                        <div className="char__name">{char.name}</div>
                    </li>
                </CSSTransition>
            )
        })

        return (
            <TransitionGroup component={null}>
                {items}
            </TransitionGroup>
        )
    }

    const elements = useMemo(() => {
        return (
            setContent(process, () => renderItems(charList), !initial)
        )
        // eslint-disable-next-line
    }, [process])

    return (
        <div className="char__list">
            <ul className='char__grid'>
                {elements}
            </ul>
            <button
                className="button button__main button__long"
                onClick={() => dispatch(fetchAllChars({ offset, getAllCharacters }))}
                disabled={newItemLoading}
                style={{ 'display': charEnded ? 'none' : 'block' }}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )

}

export default CharList;