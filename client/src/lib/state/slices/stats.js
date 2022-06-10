import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiClient from '../../api';
import { getErrorMessage } from '../../utils/errors';

const initialState = {
    loading: 'idle',
    error: null,
    usersCount: 0,
    postsCount: 0,
};

export const fetchAppStatsAsync = createAsyncThunk(
    'stats/fetch',
    async (params, thunkApi) => {
        try {
            const resp = await apiClient.get('/stats/app');

            const stats = resp.data;

            return thunkApi.fulfillWithValue(stats);
        } catch (err) {
            const msg = getErrorMessage(err);

            return thunkApi.rejectWithValue(msg);
        }
    }
);

const statsSlice = createSlice({
    name: 'stats',
    initialState,
    reducers: {
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAppStatsAsync.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(fetchAppStatsAsync.fulfilled, (state, action) => {
                state.loading = 'idle';
                state.usersCount = action.payload.users;
                state.postsCount = action.payload.posts;
            })
            .addCase(fetchAppStatsAsync.rejected, (state, action) => {
                state.loading = 'idle';
                state.error = action.payload;
            });
    },
});

export const { setError } = statsSlice.actions;

export default statsSlice.reducer;
