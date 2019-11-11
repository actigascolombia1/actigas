/**
 * ==================================================================
 * Copyright © Dinámica Digital S.A.S.
 * Author: Neyib Alexander Daza Guerrero
 * Email: dev.alexander.daza@gmail.com
 * ==================================================================
 */

import mongoose, {Schema, model} from 'mongoose';

/**
 * Define a interface for model
 */
export interface User extends mongoose.Document {
    email: string,
    plainPassword: string,
    password: string,
    salt: string,
    roles: object,
    recovery: string,
    enabled: boolean
}

/**
 * Define a Schema for the database model
 */
const UserSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    plainPassword: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    roles: {
        type: Array,
        required: true,
        default: ['ROLE_USER']
    },
    recovery: {
        type: String,
        required: false
    },
    enabled: {
        type: Boolean,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: new Date()
    },
    updatedAt: {
        type: Date,
        required: true,
        default: new Date()
    },
});

export default model<User>('User', UserSchema);