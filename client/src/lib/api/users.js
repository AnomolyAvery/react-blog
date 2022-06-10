import apiClient from '.';

const userService = {
    fetch: async (id) => {
        const resp = await apiClient.get(`/users/${id}`);

        return resp.data;
    },
    fetchPosts: async (params) => {
        const resp = await apiClient.get(`/posts?user=${params}`);

        return resp.data;
    },
};

export default userService;
