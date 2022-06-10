const { isValidObjectId } = require('mongoose');
const Post = require('../models/Post');

const express = require('express');
const PostLike = require('../models/PostLike');

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const getPosts = async (req, res) => {
    try {
        const queryByUser = req.query.user;

        if (queryByUser) {
            if (!isValidObjectId(queryByUser)) {
                return res.status(400).json({
                    message: 'Invalid user id',
                });
            }

            const posts = await Post.find({ user: queryByUser })
                .populate('user')
                .lean();

            return res.status(200).json(
                posts.map((post) => ({
                    id: post._id,
                    title: post.title,
                    content: post.content,
                    likes: post.likes,
                    user: post.user,
                    createdAt: post.createdAt,
                    updatedAt: post.updatedAt,
                }))
            );
        } else {
            const posts = await Post.find({}).populate('user').lean();

            return res.status(200).json(
                posts.map((post) => ({
                    id: post._id,
                    title: post.title,
                    content: post.content,
                    user: post.user,
                    likes: post.likes,
                    createdAt: post.createdAt,
                    updatedAt: post.updatedAt,
                }))
            );
        }
    } catch (err) {
        return res.status(500).json({
            message: err.message,
        });
    }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const getPostById = async (req, res) => {
    try {
        const id = req.params.id;

        if (!isValidObjectId(id)) {
            return res.status(400).json({
                message: 'Invalid id',
            });
        }

        const post = await Post.findById(id).populate('user').lean();

        if (!post) {
            return res.status(404).json({
                message: 'Post not found',
            });
        }

        return res.status(200).json({
            id: post._id,
            title: post.title,
            content: post.content,
            user: post.user,
            likes: post.likes,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message,
        });
    }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const createPost = async (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({
                message: 'Title and content are required',
            });
        }

        const post = await Post.create({
            title,
            content,
            user: req.user.id,
        });

        return res.status(201).json(post);
    } catch (err) {
        return res.status(500).json({
            message: err.message,
        });
    }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const updatePost = async (req, res) => {
    try {
        const id = req.params.id;

        if (!isValidObjectId(id)) {
            return res.status(400).json({
                message: 'Invalid id',
            });
        }

        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({
                message: 'Post not found',
            });
        }

        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({
                message: 'Title and content are required',
            });
        }

        post.title = title;
        post.content = content;

        await post.save();

        return res.status(200).json(post);
    } catch (err) {
        return res.status(500).json({
            message: err.message,
        });
    }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const deletePost = async (req, res) => {
    try {
        const id = req.params.id;

        if (!isValidObjectId(id)) {
            return res.status(400).json({
                message: 'Invalid id',
            });
        }

        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({
                message: 'Post not found',
            });
        }

        await post.remove();

        return res.status(200).json({
            message: 'Post deleted',
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message,
        });
    }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const addLike = async (req, res) => {
    try {
        const id = req.params.id;

        if (!isValidObjectId(id)) {
            return res.status(400).json({
                message: 'Invalid id',
            });
        }

        const isLiked = await PostLike.findOne({
            user: req.user.id,
            post: id,
        });

        if (isLiked) {
            return res.status(400).json({
                message: 'Post already liked',
            });
        }

        const postLike = await PostLike.create({
            user: req.user.id,
            post: id,
        });

        await Post.findByIdAndUpdate(id, {
            $inc: { likes: 1 },
        });

        return res.status(201).json(postLike.post);
    } catch (err) {
        return res.status(500).json({
            message: err.message,
        });
    }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const removeLike = async (req, res) => {
    try {
        const id = req.params.id;

        if (!isValidObjectId(id)) {
            return res.status(400).json({
                message: 'Invalid id',
            });
        }

        const isLiked = await PostLike.findOne({
            user: req.user.id,
            post: id,
        });

        if (!isLiked) {
            return res.status(400).json({
                message: 'Post not liked',
            });
        }

        const postLike = await PostLike.findOne({
            user: req.user.id,
            post: id,
        });

        if (!postLike) {
            return res.status(404).json({
                message: 'Post like not found',
            });
        }

        await postLike.remove();

        await Post.findByIdAndUpdate(id, {
            $inc: { likes: -1 },
        });

        return res.status(200).json(id);
    } catch (err) {
        return res.status(500).json({
            message: err.message,
        });
    }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const getUserLikes = async (req, res) => {
    try {
        const userId = req.user.id;

        // Map the likes to the post id
        const likes = await PostLike.find({ user: userId }).lean();

        const postIds = likes.map((like) => like.post);

        return res.status(200).json(postIds);
    } catch (err) {
        return res.status(500).json({
            message: err.message,
        });
    }
};

const postsController = {
    getPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
    addLike,
    removeLike,
    getUserLikes,
};

module.exports = postsController;
