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
export interface Person extends mongoose.Document {
    firstName: string,
    lastName: string,
    phone: string,
    mobilePhone: string,
    address: string,
    email: string,
    profilePicture: string,
    user: string
}

/**
 * Define a Schema for the database model
 */
const PersonSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: false
    },
    mobilePhone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId, ref: 'User',
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

export default model<Person>('Person', PersonSchema);