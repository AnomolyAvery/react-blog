import axios from 'axios';
import { resetAuth } from '../state/slices/auth';
import store from '../state/store';

const apiClient = axios.create({
    baseURL: 'http://localhost:4000/api',
});

apiClient.interceptors.request.use((config) => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
    }

    return config;
});

apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error?.response?.status === 401) {
            localStorage.removeItem('user');
            store.dispatch(resetAuth());
        }

        return Promise.reject(error);
    }
);

export default apiClient;
