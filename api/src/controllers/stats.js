const Post = require('../models/Post');
const User = require('../models/User');

const getAppStats = async (req, res) => {
    try {
        const users = await User.find().lean();
        const posts = await Post.find().lean();

        return res.status(200).json({
            users: users.length,
            posts: posts.length,
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message,
        });
    }
};

const statsController = {
    getAppStats,
};

module.exports = statsController;
