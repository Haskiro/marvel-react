import './charList.scss';
import Spinner from '../spinner/Spinner'
import { Component } from 'react';
import MarvelService from '../../services/MarvelService';

class CharList extends Component {
    state = {
        charList: [],
        loading: false,
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateCharList();
    }

    onCharListLoaded = (charList) => {
        this.setState({
            charList,
            loading: false,
        })
    }

    updateCharList = () => {
        this.setState({
            loading: true
        });
        this.marvelService
            .getAllCharacters()
            .then(this.onCharListLoaded)
    }

    render() {
        const { charList, loading } = this.state;
        const charListView = charList.map(char => (
            <li className="char__item" key={char.name}>
                <img src={char.thumbnail} alt={char.name} />
                <div className="char__name">{char.name}</div>
            </li>
        ))
        const content = loading ? <Spinner className={'spinner'} /> : charListView;

        return (
            <div className="char__list">
                <ul className="char__grid">
                    {content}
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;