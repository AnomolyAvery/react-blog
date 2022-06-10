const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwtService = require('../services/jwt');

/**
 *
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: 'Email and password are required',
            });
        }

        const user = await User.findOne({
            email,
        });

        if (!user) {
            return res.status(400).json({
                message: 'Invalid email or password',
            });
        }

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            return res.status(400).json({
                message: 'Invalid email or password',
            });
        }

        const token = jwtService.getAccessToken(user);

        if (!token) {
            return res.status(500).json({
                message: 'Error creating token',
            });
        }

        return res.status(200).json({
            token: token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                biography: user.biography,
            },
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message,
        });
    }
};

/**
 *
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: 'Name, email and password are required',
            });
        }

        const user = await User.findOne({
            email,
        });

        if (user) {
            return res.status(400).json({
                message: 'User already exists with this email',
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const createdUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        const token = jwtService.getAccessToken(createdUser);

        if (!token) {
            return res.status(500).json({
                message: 'Error creating token',
            });
        }

        return res.status(201).json({
            token: token,
            user: {
                id: createdUser._id,
                name: createdUser.name,
                email: createdUser.email,
                role: createdUser.role,
                biography: createdUser.biography,
            },
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message,
        });
    }
};

/**
 *
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
const me = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                message: 'User not found',
            });
        }

        return res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            biography: user.biography,
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message,
        });
    }
};

/**
 *
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
const update = async (req, res) => {
    try {
        const { name, biography } = req.body;

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                message: 'User not found',
            });
        }

        if (name) {
            user.name = name;
        }

        if (biography) {
            user.biography = biography;
        }

        await user.save();

        return res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            biography: user.biography,
        });
    } catch (err) {}
};

const authController = {
    login,
    register,
    me,
    update,
};

module.exports = authController;
