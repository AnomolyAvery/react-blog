const jwt = require('jsonwebtoken');
const config = require('../core/config');

const getAccessToken = (user) => {
    const payload = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
    };

    return jwt.sign(payload, config.jwtSecret, {
        expiresIn: '1h',
    });
};

const jwtService = {
    getAccessToken,
};

module.exports = jwtService;
