const express = require('express');
const { isValidObjectId } = require('mongoose');
const User = require('../models/User');

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const getUsers = async (req, res) => {
    try {
        const users = await User.find().lean();

        return res.status(200).json(
            users.map((user) => ({
                id: user._id,
                name: user.name,
                email: user.email,
                biography: user.biography,
                postCount: user.postCount,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
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
const getUserById = async (req, res) => {
    try {
        const id = req.params.id;

        if (!isValidObjectId(id)) {
            return res.status(400).json({
                message: 'Invalid id',
            });
        }

        const user = await User.findById(id).lean();

        if (!user) {
            return res.status(404).json({
                message: 'User not found',
            });
        }

        return res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email,
            biography: user.biography,
            postCount: user.postCount,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message,
        });
    }
};

const usersController = {
    getUsers,
    getUserById,
};

module.exports = usersController;
