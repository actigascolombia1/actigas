/**
 * ==================================================================
 * Copyright © Dinámica Digital S.A.S.
 * Author: Neyib Alexander Daza Guerrero
 * Email: dev.alexander.daza@gmail.com
 * ==================================================================
 */

import mongoose from 'mongoose';
import { APP_CONFIGURATION } from './config';
import helpers from '../libs/helpers';

// Initialize database connections validations and expose connection if database connect is defined true
if (APP_CONFIGURATION.MONGOOSE.USE_MONGOOSE){
    mongoose.Promise = global.Promise;
    let mongoUri = `mongodb+srv://${APP_CONFIGURATION.MONGOOSE.PARAMETERS.USERNAME}:${APP_CONFIGURATION.MONGOOSE.PARAMETERS.PASSWORD}@${APP_CONFIGURATION.MONGOOSE.PARAMETERS.URL}/${APP_CONFIGURATION.MONGOOSE.PARAMETERS.DATABASE}?retryWrites=true&w=majority`;
    mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (err) => {
        if (err) console.log(err);
        helpers.DFLogger('info', `MongoDB connected succefully`);
    });
}