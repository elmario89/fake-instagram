const express = require('express');
const cors = require('cors');

require('./config/db.config').connect();

const corsOptions = {
    origin: "*"
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

export default app;