import apiClient from '.';

const postService = {
    create: async (post) => {
        const resp = await apiClient.post('/posts', post);

        return resp.data;
    },
    fetch: async (params) => {
        const resp = await apiClient.get('/posts', { params });

        return resp.data;
    },
    fetchById: async (id) => {
        const resp = await apiClient.get(`/posts/${id}`);

        return resp.data;
    },
    addLike: async (id) => {
        const resp = await apiClient.post(`/posts/${id}/likes`);

        return resp.data;
    },
    removeLike: async (id) => {
        const resp = await apiClient.delete(`/posts/${id}/likes`);

        return resp.data;
    },
    getLikedPosts: async () => {
        const resp = await apiClient.get('/posts/likes');

        return resp.data;
    },
};

export default postService;
