import mongoose from 'mongoose';
const user = require('./user.model');
const posts = require('./post.model');

mongoose.Promise = global.Promise;

const db = {
    mongoose,
    user,
    posts,
};

export default db;