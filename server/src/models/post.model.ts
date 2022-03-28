const mongoose = require('mongoose');
import {Schema} from 'mongoose';

export interface iPost {
    text: string;
    creationDate: Date;
    _id: string;
}

export const PostSchema = new Schema<iPost>({
    text: {
        type: String,
        required: true
    },
    creationDate: {
        type: Date,
        required: true
    },
});

// module.exports = mongoose.model('post', PostSchema);