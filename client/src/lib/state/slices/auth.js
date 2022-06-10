import { createSlice, createAsyncThunk, isAllOf } from '@reduxjs/toolkit';
import { getErrorMessage } from '../../utils/errors';
import authService from '../../api/auth';

const userFromStorage = JSON.parse(localStorage.getItem('user'))?.user || null;

const isDarkMode = JSON.parse(localStorage.getItem('isDarkMode')) || false;

const initialState = {
    loading: 'idle',
    isAuthenticated: !!userFromStorage,
    user: userFromStorage ? userFromStorage : null,
    darkMode: isDarkMode,
    error: null,
};

export const loginAsync = createAsyncThunk(
    'auth/login',
    async (user, thunkApi) => {
        try {
            const payload = await authService.login(user.email, user.password);

            if (
                !payload.id ||
                !payload.name ||
                !payload.email ||
                !payload.role
            ) {
                return thunkApi.rejectWithValue('Invalid user');
            }

            return thunkApi.fulfillWithValue(payload);
        } catch (err) {
            const msg = getErrorMessage(err);

            return thunkApi.rejectWithValue(msg);
        }
    }
);

export const registerAsync = createAsyncThunk(
    'auth/register',
    async (user, thunkApi) => {
        try {
            const payload = await authService.register(
                user.name,
                user.email,
                user.password
            );

            console.log(payload);

            if (
                !payload.id ||
                !payload.name ||
                !payload.email ||
                !payload.role
            ) {
                return thunkApi.rejectWithValue('Invalid user');
            }

            return thunkApi.fulfillWithValue(payload);
        } catch (err) {
            const msg = getErrorMessage(err);

            return thunkApi.rejectWithValue(msg);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetError: (state) => {
            state.error = null;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        resetAuth: (state) => {
            state.isAuthenticated = false;
            state.user = null;
        },
        setDarkMode: (state, action) => {
            state.darkMode = action.payload;
            localStorage.setItem('isDarkMode', JSON.stringify(action.payload));
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginAsync.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(loginAsync.fulfilled, (state, action) => {
                state.loading = 'idle';
                state.isAuthenticated = !!action.payload;
                state.user = action.payload;
            })
            .addCase(loginAsync.rejected, (state, action) => {
                state.loading = 'idle';
                state.error = action.payload;
            });
        builder
            .addCase(registerAsync.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(registerAsync.fulfilled, (state, action) => {
                state.loading = 'idle';
                state.isAuthenticated = !!action.payload;
                state.user = action.payload;
            })
            .addCase(registerAsync.rejected, (state, action) => {
                state.loading = 'idle';
                state.error = action.payload;
            });
    },
});

export const { resetError, setError, resetAuth, setDarkMode } =
    authSlice.actions;

export default authSlice.reducer;
