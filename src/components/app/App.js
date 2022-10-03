import AppHeader from "../appHeader/AppHeader";
import Spinner from '../spinner/Spinner';
import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SingleCharLayout from '../pages/singleCharLayout/SingleCharLayout';
import SingleComicLayout from '../pages/singleComicLayout/SingleComicLayout';

const Page404 = lazy(() => import('../pages/404'));
const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const SinglePage = lazy(() => import('../pages/SinglePage'));


const App = () => {
    return (
        <Router>
            <div className="app">
                <AppHeader />
                <main>
                    <Suspense fallback={<Spinner />}>
                        <Routes>
                            <Route path='/' element={<MainPage />} />
                            <Route path='comics/' element={<ComicsPage />} />
                            <Route path='char/:id' element={<SinglePage Component={SingleCharLayout} dataType='char' />} />
                            <Route path='*' element={<Page404 />} />
                            <Route path='comics/:id' element={<SinglePage Component={SingleComicLayout} dataType='comics' />} />
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </Router>
    )
}

export default App;