import { configureStore } from '@reduxjs/toolkit'
import charListReducer from '../components/charList/charListSlice'

export const store = configureStore({
    reducer: {
        charList: charListReducer
    }
})