const mongoose = require('mongoose');
const config = require('./config');

const db = async () => {
    try {
        const db = await mongoose.connect(config.mongoUri);
        console.log('Connected to MongoDB');
        return db;
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

module.exports = db;
