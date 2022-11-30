import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    chars: [],
    loadingStatus: 'idle'
}

export const fetchCharByName = createAsyncThunk(
    'charSearch/fetchCharByName',
    async ({ charName, getCharacterByName }) => {
        return await getCharacterByName(charName);
    }
)

export const charSearchSlice = createSlice({
    name: 'charSearch',
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder
            .addCase(fetchCharByName.pending, (state) => {
                state.loadingStatus = 'loading';
            })
            .addCase(fetchCharByName.fulfilled, (state, action) => {
                state.loadingStatus = 'confirmed';
                state.chars = action.payload;
            })
            .addCase(fetchCharByName.rejected, (state) => {
                state.loadingStatus = 'error';
            })
    }
})


export default charSearchSlice.reducer;