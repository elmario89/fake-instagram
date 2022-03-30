const mongoose = require('mongoose');
import {Schema} from 'mongoose';

export interface iPost {
    title: string;
    description: string;
    creationDate: Date;
    _id: string;
    imageUrl: string;
}

export const PostSchema = new Schema<iPost>({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    creationDate: {
        type: Date,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    }
});