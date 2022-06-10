const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    biography: {
        type: String,
        default: 'Edit your biography @ /settings.',
    },
    role: {
        type: String,
        required: true,
        enum: ['user', 'admin'],
        default: 'user',
    },
    postCount: {
        type: Number,
        default: 0,
    },
});

const User = model('User', userSchema);

module.exports = User;
