'use strict';

var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const api = require('../routes/api')
const serverless = require('serverless-http');

var app = express();

// Basic Configuration 
require('dotenv').config();

const port = process.env.PORT || 3000;
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
app.use(cors());

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/public', express.static(process.cwd() + '../public'));
app.use('/.netlify/functions/server', router);  // path must route to lambda


app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '../views/index.html');
});

app.use('/api/shorturl', api);


module.exports.handler = serverless(app);
