const mongoose = require('mongoose');

const config = {
    HOST: "localhost",
    PORT: 27017,
    DB: "fakeig_db"
};

export const MONGO_URI = `mongodb://${config.HOST}:${config.PORT}/${config.DB}`;

exports.connect = () => {
    // Connecting to the database
    mongoose
        .connect(MONGO_URI)
        .then(() => {
            console.log("Successfully connected to database");
        })
        .catch((error: Error) => {
            console.log("database connection failed. exiting now...");
            console.error(error);
            process.exit(1);
        });
};