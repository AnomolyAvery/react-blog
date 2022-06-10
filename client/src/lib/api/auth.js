import apiClient from '.';

/**
 *
 * @param {String} email
 * @param {String} password
 */
const login = async (email, password) => {
    const resp = await apiClient.post('/auth/login', {
        email,
        password,
    });

    const token = resp.data.token;

    if (token) {
        const userInfo = {
            user: resp.data.user,
            token: token,
        };

        localStorage.setItem('user', JSON.stringify(userInfo));
    }

    return resp.data.user;
};

/**
 *
 * @param {String} name
 * @param {String} email
 * @param {String} password
 */
const register = async (name, email, password) => {
    const resp = await apiClient.post('/auth/register', {
        name,
        email,
        password,
    });

    const token = resp.data.token;

    if (token) {
        const userInfo = {
            user: resp.data.user,
            token: token,
        };

        localStorage.setItem('user', JSON.stringify(userInfo));
    }

    return resp.data.user;
};

const me = async () => {
    const userInfo = JSON.parse(localStorage.getItem('user'));

    return userInfo.user;
};

const updateMe = async (name, biography) => {
    const resp = await apiClient.put('/auth/me', {
        name,
        biography,
    });

    return resp.data;
};

const authService = {
    login,
    register,
    updateMe,
};

export default authService;
