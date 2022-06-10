const { Router } = require('express');
const statsController = require('../controllers/stats');

const statsRouter = Router();

statsRouter.get('/app', statsController.getAppStats);

module.exports = statsRouter;
