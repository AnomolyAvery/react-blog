const postsController = require('../controllers/posts');
const auth = require('../middewares/auth');

const { Router } = require('express');
const commentsController = require('../controllers/comments');

const postsRouter = Router();

postsRouter.get('/', postsController.getPosts);
postsRouter.post('/', auth, postsController.createPost);

postsRouter.post('/:id/comments', auth, commentsController.createComment);
postsRouter.get('/:id/comments', commentsController.getComments);
postsRouter.get('/likes', auth, postsController.getUserLikes);

postsRouter.post('/:id/likes', auth, postsController.addLike);
postsRouter.delete('/:id/likes', auth, postsController.removeLike);

postsRouter.get('/:id', postsController.getPostById);
postsRouter.put('/:id', auth, postsController.updatePost);
postsRouter.delete('/:id', auth, postsController.deletePost);

module.exports = postsRouter;
