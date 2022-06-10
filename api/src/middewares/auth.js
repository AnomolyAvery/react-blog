const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('../core/config');
/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const auth = (req, res, next) => {
    try {
        if (!req.headers || !req.headers.authorization) {
            return res.status(401).json({
                message: 'Unauthorized',
            });
        }

        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, config.jwtSecret);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({
            message: 'Unauthorized',
        });
    }
};

module.exports = auth;
