import mongoose from 'mongoose';
const user = require('./user.model');

mongoose.Promise = global.Promise;

const db = {
    mongoose,
    user,
};

export default db;