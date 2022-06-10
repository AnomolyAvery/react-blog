const { model, Schema } = require('mongoose');

const commentSchema = new Schema(
    {
        content: {
            type: String,
            required: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        post: {
            type: Schema.Types.ObjectId,
            ref: 'Post',
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Comment = model('Comment', commentSchema);

module.exports = Comment;
