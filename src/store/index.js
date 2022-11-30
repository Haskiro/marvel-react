import { configureStore } from '@reduxjs/toolkit';
import charInfoReducer from '../components/charInfo/charInfoSlice';
import charListReducer from '../components/charList/charListSlice';
import charSearchReducer from '../components/charSearch/charSearchSlice';
import randomCharReducer from '../components/randomChar/randomCharSlice';
import comicInfoReducer from '../components/comicsList/comicInfoSlice';
import comicsListReducer from '../components/comicsList/comicsListSlice';

export const store = configureStore({
    reducer: {
        charList: charListReducer,
        charInfo: charInfoReducer,
        charSearch: charSearchReducer,
        randomChar: randomCharReducer,
        comicsList: comicsListReducer,
        comicInfo: comicInfoReducer,
    }
})