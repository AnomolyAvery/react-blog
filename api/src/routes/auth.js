const { Router } = require('express');
const authController = require('../controllers/auth');
const auth = require('../middewares/auth');

const authRouter = Router();

authRouter.post('/login', authController.login);
authRouter.post('/register', authController.register);
authRouter.get('/me', auth, authController.me);

module.exports = authRouter;
