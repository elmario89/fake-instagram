const cors = require('cors');
const bodyParser = require('body-parser');

import express from 'express';

require('./config/db.config').connect();

const corsOptions = {
    origin: "*"
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//initialize photos bucker
require('./models/photos.model')(app);

//routes
require('./controllers/auth.controller')(app);
require('./controllers/posts.contoller')(app);
require('./controllers/image.controller')(app);

module.exports = app;