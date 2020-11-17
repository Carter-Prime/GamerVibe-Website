'use strict';
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const authRoute = require('./routes/authRoute');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Routes
app.use(express.static('./frontend'));
//app.use('/', (req, res) => res.send('App is working fine')); // For testing only
app.use('/auth', authRoute);

app.listen(port, () => console.log(`App is listening port ${port}`));