require('dotenv').config();

const config = {
    port: process.env.PORT || 4000,
    mongoUri: process.env.MONGO_URI,
    jwtSecret: process.env.JWT_SECRET,
};

module.exports = config;
