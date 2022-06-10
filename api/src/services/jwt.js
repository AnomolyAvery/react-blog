const jwt = require('jsonwebtoken');

const getAccessToken = (user) => {
    if (!user || !user.id) {
        return null;
    }

    const payload = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
    };

    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
};

const jwtService = {
    getAccessToken,
};

module.exports = jwtService;
