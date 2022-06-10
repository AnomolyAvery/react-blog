import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import postService from '../../api/post';
import { getErrorMessage } from '../../utils/errors';

// Post state that will handle getting all posts, get a single post, creating postings, updating posts, and deleting posts.
const initialState = {
    loading: 'idle',
    error: null,
    posts: [],
    likedPosts: null,
    post: null,
};

export const createPostAsync = createAsyncThunk(
    'posts/create',
    async (post, thunkApi) => {
        try {
            const payload = await postService.create(post);

            if (!payload.id) {
                return thunkApi.rejectWithValue('Invalid post');
            }

            return thunkApi.fulfillWithValue(payload);
        } catch (err) {
            const msg = getErrorMessage(err);

            return thunkApi.rejectWithValue(msg);
        }
    }
);

export const getLikedPostsAsync = createAsyncThunk(
    'posts/liked',
    async (user, thunkApi) => {
        try {
            const payload = await postService.getLikedPosts();

            return thunkApi.fulfillWithValue(payload);
        } catch (err) {
            const msg = getErrorMessage(err);

            return thunkApi.rejectWithValue(msg);
        }
    }
);

export const fetchPostsAsync = createAsyncThunk(
    'posts/fetch',
    async (params, thunkApi) => {
        try {
            const payload = await postService.fetch(params);

            if (!payload.length) {
                return thunkApi.rejectWithValue('Invalid posts');
            }

            return thunkApi.fulfillWithValue(payload);
        } catch (err) {
            const msg = getErrorMessage(err);

            return thunkApi.rejectWithValue(msg);
        }
    }
);

export const fetchPostByIdAsync = createAsyncThunk(
    'posts/fetchById',
    async (id, thunkApi) => {
        try {
            const payload = await postService.fetchById(id);

            if (!payload.id) {
                return thunkApi.rejectWithValue('Invalid post');
            }

            return thunkApi.fulfillWithValue(payload);
        } catch (err) {
            const msg = getErrorMessage(err);

            return thunkApi.rejectWithValue(msg);
        }
    }
);

export const addLikeAsync = createAsyncThunk(
    'posts/addLike',
    async (id, thunkApi) => {
        try {
            const payload = await postService.addLike(id);

            if (!payload) {
                return thunkApi.rejectWithValue('Invalid post');
            }

            return thunkApi.fulfillWithValue(payload);
        } catch (err) {
            const msg = getErrorMessage(err);

            return thunkApi.rejectWithValue(msg);
        }
    }
);

export const removeLikeAsync = createAsyncThunk(
    'posts/removeLike',
    async (id, thunkApi) => {
        try {
            const payload = await postService.removeLike(id);

            if (!payload) {
                return thunkApi.rejectWithValue('Invalid post');
            }

            return thunkApi.fulfillWithValue(payload);
        } catch (err) {
            const msg = getErrorMessage(err);

            return thunkApi.rejectWithValue(msg);
        }
    }
);

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createPostAsync.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(createPostAsync.fulfilled, (state, action) => {
                state.loading = 'idle';
                state.posts = [action.payload, ...state.posts];
            })
            .addCase(createPostAsync.rejected, (state, action) => {
                state.loading = 'idle';
                state.error = action.payload;
            });

        builder
            .addCase(fetchPostsAsync.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(fetchPostsAsync.fulfilled, (state, action) => {
                state.loading = 'idle';
                state.posts = action.payload;
            })
            .addCase(fetchPostsAsync.rejected, (state, action) => {
                state.loading = 'idle';
                state.error = action.payload;
            });

        builder
            .addCase(fetchPostByIdAsync.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(fetchPostByIdAsync.fulfilled, (state, action) => {
                state.loading = 'idle';
                state.post = action.payload;
            })
            .addCase(fetchPostByIdAsync.rejected, (state, action) => {
                state.loading = 'idle';
                state.error = action.payload;
            });

        builder
            .addCase(getLikedPostsAsync.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(getLikedPostsAsync.fulfilled, (state, action) => {
                state.loading = 'idle';
                state.likedPosts = action.payload;
            })
            .addCase(getLikedPostsAsync.rejected, (state, action) => {
                state.loading = 'idle';
                state.error = action.payload;
            });

        builder
            .addCase(addLikeAsync.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(addLikeAsync.fulfilled, (state, action) => {
                state.loading = 'idle';
                if (!state.likedPosts) {
                    state.likedPosts = [];
                }
                state.likedPosts = [action.payload, ...state.likedPosts];
                state.post.likes += 1;
            })
            .addCase(addLikeAsync.rejected, (state, action) => {
                state.loading = 'idle';
                state.error = action.payload;
            });
        builder
            .addCase(removeLikeAsync.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(removeLikeAsync.fulfilled, (state, action) => {
                state.loading = 'idle';
                if (!state.likedPosts) {
                    state.likedPosts = [];
                }
                state.likedPosts = state.likedPosts.filter(
                    (post) => post.id !== action.payload.id
                );
                state.post.likes -= 1;
            })
            .addCase(removeLikeAsync.rejected, (state, action) => {
                state.loading = 'idle';
                state.error = action.payload;
            });
    },
});

export const { setError } = postsSlice.actions;

export default postsSlice.reducer;
