const http = require('http');
const bcrypt = require('bcryptjs');
const User = require('./models/user.model');
const postsRouter = require('./routers/posts.router');
const authRouter = require('./routers/auth.router');
const imageRouter = require('./routers/image.router');

const port = process.env.PORT || 3001;
require('dotenv').config();

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

//initialize photos bucket
require('./models/photos.model')(app);

//routes
app.use('/api', postsRouter(app));
app.use('/api', authRouter())
app.use('/api', imageRouter(app))

const server = http.createServer(app);

// server listening
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = app;