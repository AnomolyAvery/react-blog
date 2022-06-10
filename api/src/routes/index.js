const { Router } = require('express');
const authRouter = require('./auth');
const postsRouter = require('./posts');
const statsRouter = require('./stats');
const usersRouter = require('./users');

const mainRouter = Router();

mainRouter.use('/auth', authRouter);
mainRouter.use('/posts', postsRouter);
mainRouter.use('/users', usersRouter);
mainRouter.use('/stats', statsRouter);

module.exports = mainRouter;
