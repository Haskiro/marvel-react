import CharList from '../charList/CharList';
import CharInfo from '../charInfo/CharInfo';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import RandomChar from '../randomChar/RandomChar';
import decoration from '../../resources/img/vision.png';
import CharSearch from '../charSearch/CharSearch';
import { Helmet } from 'react-helmet';

const MainPage = () => {
    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Marvel information portal"
                />
                <title>Marvel information portal</title>
            </Helmet>
            <ErrorBoundary>
                <RandomChar />
            </ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary>
                    <CharList />
                </ErrorBoundary>
                <div>
                    <ErrorBoundary>
                        <CharInfo />
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <CharSearch />
                    </ErrorBoundary>
                </div>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision" />
        </>
    )
}

export default MainPage;