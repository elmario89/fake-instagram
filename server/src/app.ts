import express from 'express';
const cors = require('cors');

require('./config/db.config').connect();

const corsOptions = {
    origin: "*"
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

//routes
require('./controllers/auth.controller')(app);
require('./controllers/posts.contoller')(app);

module.exports = app;