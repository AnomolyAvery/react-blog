import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import commentService from '../../api/comments';
import { getErrorMessage } from '../../utils/errors';

const initialState = {
    comments: [],
    loading: false,
    error: null,
};

export const fetchCommentsAsync = createAsyncThunk(
    'comments/fetchComments',
    async (postId, { rejectWithValue, fulfillWithValue }) => {
        try {
            const comments = await commentService.fetchComments(postId);

            return fulfillWithValue(comments);
        } catch (err) {
            const msg = getErrorMessage(err);
            return rejectWithValue(msg);
        }
    }
);

export const createCommentAsync = createAsyncThunk(
    'comments/createComment',
    async ({ postId, content }, { rejectWithValue, fulfillWithValue }) => {
        try {
            const comment = await commentService.createComment(postId, content);

            return fulfillWithValue(comment);
        } catch (err) {
            const msg = getErrorMessage(err);
            return rejectWithValue(msg);
        }
    }
);

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCommentsAsync.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchCommentsAsync.fulfilled, (state, action) => {
            state.comments = action.payload;
            state.loading = false;
        });
        builder.addCase(fetchCommentsAsync.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        });

        builder.addCase(createCommentAsync.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(createCommentAsync.fulfilled, (state, action) => {
            state.comments.push(action.payload);
            state.loading = false;
        });
        builder.addCase(createCommentAsync.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        });
    },
});

export default commentsSlice.reducer;
