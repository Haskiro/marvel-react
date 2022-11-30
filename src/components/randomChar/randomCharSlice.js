import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    char: null,
    loadingStatus: 'idle'
}

export const fetchCharById = createAsyncThunk(
    'randomChar/fetchCharById',
    async ({ charId, getCharacter }) => {
        return await getCharacter(charId);
    }
)

export const randomCharSlice = createSlice({
    name: 'randomChar',
    initialState,
    reducer: {},
    extraReducers: builder => {
        builder
            .addCase(fetchCharById.pending, (state) => {
                state.loadingStatus = 'loading';
            })
            .addCase(fetchCharById.fulfilled, (state, action) => {
                state.loadingStatus = 'confirmed';
                state.char = action.payload;
            })
            .addCase(fetchCharById.rejected, (state) => {
                state.loadingStatus = 'error';
            })
    }
})

export default randomCharSlice.reducer;