import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


const initialState = {
    comicInfo: null,
    loadingStatus: 'idle',
}

export const fetchComicById = createAsyncThunk(
    'comicInfo/fetchComicById',
    async ({ comicId, getComics }) => {
        return await getComics(comicId);
    }
)

export const comicInfoSlice = createSlice({
    name: 'comicInfo',
    initialState,
    reducers: {
    },
    extraReducers: builder => {
        builder
            .addCase(fetchComicById.pending, (state) => {
                state.loadingStatus = 'loading';
            })
            .addCase(fetchComicById.fulfilled, (state, action) => {
                state.loadingStatus = 'confirmed';
                state.comicInfo = action.payload;
            })
            .addCase(fetchComicById.rejected, (state) => {
                state.loadingStatus = 'error';
            })
            .addDefaultCase(() => { })
    }
})

export default comicInfoSlice.reducer;