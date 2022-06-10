const express = require('express');
const cors = require('cors');
const db = require('./db');
const mainRouter = require('../routes');

const app = async () => {
    const app = express();

    const conn = await db();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(
        cors({
            origin: 'http://localhost:3000',
        })
    );

    app.use('/api', mainRouter);

    return app;
};

module.exports = app;
