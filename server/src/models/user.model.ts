const mongoose = require('mongoose');
import { Schema } from 'mongoose';
import { PostSchema } from './post.model';

import { iPost } from './post.model';

export interface iUser {
    _id?: string;
    userName: string;
    email: string;
    password: string;
    token: string;
    creationDate: Date;
    posts: {
        type: iPost;
        default: [];
    };
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
    posts:{
        type: [PostSchema]
    }
});

module.exports = mongoose.model('user', UserSchema);
