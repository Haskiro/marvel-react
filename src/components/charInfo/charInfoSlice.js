import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


const initialState = {
    charInfo: null,
    loadingStatus: 'idle',
}

export const fetchCharById = createAsyncThunk(
    'charInfo/fetchCharById',
    async ({ charId, getCharacter }) => {
        return await getCharacter(charId);
    }
)

export const charInfoSlice = createSlice({
    name: 'charInfo',
    initialState,
    reducers: {
    },
    extraReducers: builder => {
        builder
            .addCase(fetchCharById.pending, (state) => {
                state.loadingStatus = 'loading';
            })
            .addCase(fetchCharById.fulfilled, (state, action) => {
                state.loadingStatus = 'confirmed';
                state.charInfo = action.payload;
            })
            .addCase(fetchCharById.rejected, (state) => {
                state.loadingStatus = 'error';
            })
            .addDefaultCase(() => { })
    }
})

export default charInfoSlice.reducer;