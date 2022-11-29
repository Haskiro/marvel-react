import { configureStore } from '@reduxjs/toolkit';
import charInfoReducer from '../components/charInfo/charInfoSlice';
import charListReducer from '../components/charList/charListSlice';
import comicInfoReducer from '../components/comicsList/comicInfoSlice';
import comicsListReducer from '../components/comicsList/comicsListSlice';

export const store = configureStore({
    reducer: {
        charList: charListReducer,
        charInfo: charInfoReducer,
        comicsList: comicsListReducer,
        comicInfo: comicInfoReducer
    }
})