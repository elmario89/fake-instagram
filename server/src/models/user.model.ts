const mongoose = require('mongoose');
import { Schema } from 'mongoose';

import { iPost } from './post.model';

export interface iUser {
    _id?: string;
    userName: string;
    email: string;
    password: string;
    token: string;
    creationDate: Date;
    posts: string[];
}

const UserSchema = new Schema<iUser>({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    creationDate: {
        type: Date,
        required: true
    },
    token: String,
    posts: Array,
});

module.exports = mongoose.model('user', UserSchema);
