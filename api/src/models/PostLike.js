const { Schema, model } = require('mongoose');

const postLikeSchema = new Schema(
    {
        post: {
            type: Schema.Types.ObjectId,
            ref: 'Post',
            required: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const PostLike = model('PostLike', postLikeSchema);

module.exports = PostLike;
