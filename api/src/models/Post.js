const { Schema, model } = require('mongoose');
const User = require('./User');

const postSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        likes: {
            type: Number,
            default: 0,
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

// On post creation, update postCount of user
postSchema.post('save', async function (doc) {
    try {
        const user = await User.findById(doc.user);
        user.postCount += 1;
        await user.save();
    } catch (err) {
        console.log(err);
    }
});

// On post deletion, update postCount of user
postSchema.post('remove', async function (doc) {
    try {
        const user = await User.findById(doc.user);
        user.postCount -= 1;
        await user.save();
    } catch (err) {
        console.log(err);
    }
});

const Post = model('Post', postSchema);

module.exports = Post;
