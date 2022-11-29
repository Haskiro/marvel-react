import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import useMarvelService from '../../services/MarvelService';


const initialState = {
    charList: [],
    loadingStatus: 'idle',
    offset: 210,
    charEnded: false,
    initial: true,
    newItemLoading: false,
}

export const fetchAllChars = createAsyncThunk(
    'charList/fetchChars',
    async ({ offset, getAllCharacters }) => {
        return await getAllCharacters(offset);
    }
)

export const charListSlice = createSlice({
    name: 'charList',
    initialState,
    reducers: {
    },
    extraReducers: builder => {
        builder
            .addCase(fetchAllChars.pending, (state) => {
                state.loadingStatus = 'loading';
                state.newItemLoading = true;
            })
            .addCase(fetchAllChars.fulfilled, (state, action) => {
                state.loadingStatus = 'confirmed';
                state.charList = [...state.charList, ...action.payload];
                state.offset += 9;
                if (state.initial) state.initial = false;
                if (action.payload.lenght < 9) state.charEnded = true;
                state.newItemLoading = false;

            })
            .addCase(fetchAllChars.rejected, (state, action) => {
                state.loadingStatus = 'error';
                state.newItemLoading = false;
            })
            .addDefaultCase(() => { })
    }
})

export default charListSlice.reducer