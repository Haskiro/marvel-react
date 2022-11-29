import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    comicsList: [],
    loadingStatus: 'idle',
    offset: 210,
    comicsEnded: false,
    initial: true,
    newItemLoading: false,
}

export const fetchAllComics = createAsyncThunk(
    'comicsList/fetchComics',
    async ({ offset, getAllComics }) => {
        return await getAllComics(offset);
    }
)

export const comicsListSlice = createSlice({
    name: 'comicsList',
    initialState,
    reducers: {
    },
    extraReducers: builder => {
        builder
            .addCase(fetchAllComics.pending, (state) => {
                state.loadingStatus = 'loading';
                state.newItemLoading = true;
            })
            .addCase(fetchAllComics.fulfilled, (state, action) => {
                state.loadingStatus = 'confirmed';
                state.comicsList = [...state.comicsList, ...action.payload];
                state.offset += 9;
                if (state.initial) state.initial = false;
                if (action.payload.lenght < 9) state.comicsEnded = true;
                state.newItemLoading = false;

            })
            .addCase(fetchAllComics.rejected, (state) => {
                state.loadingStatus = 'error';
                state.newItemLoading = false;
            })
            .addDefaultCase(() => { })
    }
})

export default comicsListSlice.reducer