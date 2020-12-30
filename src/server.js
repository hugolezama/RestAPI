const express = require('express');
const app = express();
require('dotenv/config');
const mongoose = require('mongoose');

const usersRouter = require('./routes/users');
app.use(express.json());
app.use('/api/v1/users', usersRouter);


const port = process.env.PORT || 4000;
app.listen(port, function () {
    console.log(`Server listening on ${port}`);
});

mongoose.connect(process.env.DB_CONNECTION,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () => console.log('Connected to DB!!'));


