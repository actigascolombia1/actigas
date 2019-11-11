/**
 * ==================================================================
 * Copyright © Dinámica Digital S.A.S.
 * Author: Neyib Alexander Daza Guerrero
 * Email: dev.alexander.daza@gmail.com
 * ==================================================================
 */

import express, {Application} from 'express';
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
import * as fs from 'fs'
import * as path from 'path';
import mongoose from 'mongoose';
import { APP_CONFIGURATION } from './config/config';
import helpers from './libs/helpers';

// Initialization
const app: Application = express();
import './config/database';

let db = mongoose.connection;

// Express settings
app.set('port', process.env.PORT || APP_CONFIGURATION.APP.APP_PORT);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(session({
    secret: process.env.SESSION_SECRET || APP_CONFIGURATION.APP.JWT_SECRET_TOKEN,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: db,
    })
}));

// Static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next){
    if (req.session!){
        res.locals = req.session!;
        next();
    } else {
        next();
    }
});

// Importing routes
import webRouter from './routes/webRouter';
import adminRouter from './routes/adminRouter';
import apiRouter from './routes/apiRouter';

// Use routes
app.use('/', webRouter);
app.use('/admin', adminRouter);
app.use('/api', apiRouter);

// Starting express server
app.listen(app.get('port'), () => {
    helpers.DFLogger('info', `Server listen on ${APP_CONFIGURATION.APP.APP_BASE_URL}:${app.get('port')}`);
});