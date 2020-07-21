const express = require('express');
const app = express();
const logger = require('morgan');
const port = process.env.PORT || 3001;
const cors = require('cors')

require('dotenv').config();
require('./config/database');

const userRouter = require('./routes/users');
const apiRouter = require('./routes/api');


app.use(cors());
app.use(logger('dev'));
app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api', apiRouter);

app.listen(port, ()=> {
    console.log(`Express is listening on port ${port}.`)
});
