import mongoose, { Schema } from 'mongoose';
import { iPost, PostSchema } from './post.model';

interface iUser {
    userName: string;
    email: string;
    password: string;
    token: string;
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
    token: String,
    posts:{
        type: [PostSchema]
    }
});

module.exports = mongoose.model('User', UserSchema);
