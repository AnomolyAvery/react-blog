const { Router } = require('express');
const usersController = require('../controllers/users');
const auth = require('../middewares/auth');

const usersRouter = Router();

usersRouter.get('/', auth, usersController.getUsers);
usersRouter.get('/:id', usersController.getUserById);

module.exports = usersRouter;
