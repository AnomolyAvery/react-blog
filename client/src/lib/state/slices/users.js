import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userService from '../../api/users';

const initialState = {
    loading: 'idle',
    error: null,
    user: null,
    posts: [],
};

export const fetchUserAsync = createAsyncThunk(
    'users/fetch',
    async (id, thunkApi) => {
        try {
            const payload = await userService.fetch(id);

            if (!payload.id) {
                return thunkApi.rejectWithValue('Invalid user');
            }

            return thunkApi.fulfillWithValue(payload);
        } catch (err) {
            const msg = getErrorMessage(err);

            return thunkApi.rejectWithValue(msg);
        }
    }
);

export const fetchUserPostsAsync = createAsyncThunk(
    'users/posts',
    async (params, thunkApi) => {
        try {
            const payload = await userService.fetchPosts(params);

            return thunkApi.fulfillWithValue(payload);
        } catch (err) {
            const msg = getErrorMessage(err);

            return thunkApi.rejectWithValue(msg);
        }
    }
);

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserAsync.pending, (state, action) => {
            state.loading = 'pending';
        });

        builder.addCase(fetchUserAsync.fulfilled, (state, action) => {
            state.loading = 'idle';
            state.user = action.payload;
        });

        builder.addCase(fetchUserAsync.rejected, (state, action) => {
            state.loading = 'idle';
            state.error = action.payload;
        });

        builder.addCase(fetchUserPostsAsync.fulfilled, (state, action) => {
            state.posts = action.payload;
        });
    },
});

export const { setError } = usersSlice.actions;

export default usersSlice.reducer;
