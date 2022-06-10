import { configureStore } from '@reduxjs/toolkit';
import auth from './slices/auth';
import posts from './slices/posts';
import users from './slices/users';
import stats from './slices/stats';
import comments from './slices/comments';

const store = configureStore({
    reducer: {
        auth,
        posts,
        users,
        stats,
        comments,
    },
});

export default store;
