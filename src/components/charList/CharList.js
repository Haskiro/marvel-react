import './charList.scss';
import Spinner from '../spinner/Spinner'
import React, { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';

class CharList extends Component {
    state = {
        charList: [],
        loading: true,
        error: false,
        offset: 210,
        newItemLoading: false,
        charEnded: false
    }

    refsList = []

    setRefs = elem => {
        this.refsList.push(elem);
    }

    focusOnItem = (id) => {
        this.refsList.forEach(item => {
            item.classList.remove('char__item_selected')
        });
        this.refsList[id].classList.add('char__item_selected')
        this.refsList[id].focus();
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.onRequest();
    }

    componentDidUpdate(prevState) {
        if (prevState.offset !== undefined && this.state.offset !== prevState.offset) {
            console.log(true);
        }
    }

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }

    onRequest = (offset) => {
        this.onCharListLoading();
        this.marvelService
            .getAllCharacters(offset)
            .then(this.onCharListLoaded)
            .catch(this.onError);
    }

    onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        this.setState(({ charList, offset }) => ({
            charList: [...charList, ...newCharList],
            loading: false,
            error: false,
            newItemLoading: false,
            offset: offset + 9,
            charEnded: ended
        }))
    }

    onError = () => {
        this.setState(
            { error: true }
        )
    }

    render() {
        const { charList, loading, error, newItemLoading, offset, charEnded } = this.state;

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
                    ref={this.setRefs}
                    onClick={() => {
                        this.props.onCharSelected(char.id)
                        this.focusOnItem(i);
                    }}
                    onKeyPress={(e) => {
                        if (e.key === ' ' || e.key === "Enter") {
                            this.props.onCharSelected(char.id);
                            this.focusOnItem(i);
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
                    onClick={() => this.onRequest(offset)}
                    disabled={newItemLoading}
                    style={{ 'display': charEnded ? 'none' : 'block' }}
                >
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;