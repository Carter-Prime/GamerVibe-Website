'use strict';
const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

// Routes
app.use(express.static('./frontend'));
app.use('/', ((req, res) => res.send('App is working fine')))

app.listen(port, () => console.log(`App is listening port ${port}`))