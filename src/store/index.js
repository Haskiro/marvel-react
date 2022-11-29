import { configureStore } from '@reduxjs/toolkit';
import charInfoReducer from '../components/charInfo/charInfoSlice';
import charListReducer from '../components/charList/charListSlice';

export const store = configureStore({
    reducer: {
        charList: charListReducer,
        charInfo: charInfoReducer
    }
})