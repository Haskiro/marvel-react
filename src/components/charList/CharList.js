import './charList.scss';
import Spinner from '../spinner/Spinner'
import React, { useState, useEffect, useRef } from 'react';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';

const CharList = ({ onCharSelected }) => {

    const [charList, setCharList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [offset, setOffset] = useState(210);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [charEnded, setCharEnded] = useState(false);

    const refsList = useRef([]);

    const focusOnItem = (id) => {
        refsList.current.forEach(item => {
            item.classList.remove('char__item_selected')
        });
        refsList.current[id].classList.add('char__item_selected')
        refsList.current[id].focus();
    }

    const marvelService = new MarvelService();

    const onCharListLoading = () => {
        setNewItemLoading(true);
    }

    const onRequest = (offset) => {
        onCharListLoading();
        marvelService
            .getAllCharacters(offset)
            .then(onCharListLoaded)
            .catch(onError);
    }

    useEffect(() => {
        onRequest();
    }, []);

    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        setCharList(charList => [...charList, ...newCharList]);
        setLoading(false);
        setError(false);
        setNewItemLoading(false);
        setOffset(offset => offset + 9);
        setCharEnded(ended);
    }

    const onError = () => {
        setError(false);
    }


    const charListView = charList.map((char, i) => {
        let imgStyle = { 'objectFit': 'cover' }
        if (char.thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
            imgStyle = { 'objectFit': 'unset' }
        }
        return (
            <li
                className="char__item"
                key={char.id}
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
        )
    })

    const content = !(loading, error) ? charListView : null;
    const spinner = loading ? <Spinner className={'char-list-spinner'} /> : null;
    const errorMessage = error ? <ErrorMessage /> : null

    return (
        <div className="char__list">
            <ul className="char__grid">
                {content}
                {spinner}
                {errorMessage}
            </ul>
            <button
                className="button button__main button__long"
                onClick={() => onRequest(offset)}
                disabled={newItemLoading}
                style={{ 'display': charEnded ? 'none' : 'block' }}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )

}

export default CharList;