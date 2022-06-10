const express = require('express');
const { isValidObjectId } = require('mongoose');
const Comment = require('../models/Comment');

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const getComments = async (req, res) => {
    try {
        const postId = req.params.id;

        if (!isValidObjectId(postId)) {
            return res.status(400).json({
                message: 'Invalid id',
            });
        }

        const comments = await Comment.find({
            post: postId,
        })
            .populate('user')
            .lean();

        return res.status(200).json(
            comments.map((comment) => ({
                id: comment._id,
                content: comment.content,
                user: comment.user,
                post: comment.post,
                createdAt: comment.createdAt,
                updatedAt: comment.updatedAt,
            }))
        );
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
const createComment = async (req, res) => {
    try {
        const postId = req.params.id;

        if (!isValidObjectId(postId)) {
            return res.status(400).json({
                message: 'Invalid id',
            });
        }

        const { content } = req.body;

        const comment = await Comment.create({
            content,
            user: req.user.id,
            post: postId,
        });

        const commentData = await Comment.findById(comment._id)
            .populate('user')
            .lean();

        return res.status(201).json({
            id: commentData._id,
            content: commentData.content,
            user: commentData.user,
            post: commentData.post,
            createdAt: commentData.createdAt,
            updatedAt: commentData.updatedAt,
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message,
        });
    }
};

const commentsController = {
    getComments,
    createComment,
};

module.exports = commentsController;
