import apiClient from '.';

const fetchComments = async (postId) => {
    const resp = await apiClient.get(`/posts/${postId}/comments`);

    return resp.data;
};

const createComment = async (postId, content) => {
    const resp = await apiClient.post(`/posts/${postId}/comments`, {
        content,
    });

    return resp.data;
};

const commentService = {
    createComment,
    fetchComments,
};

export default commentService;
