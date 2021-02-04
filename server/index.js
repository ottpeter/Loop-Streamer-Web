const cors = require('cors');
const fs = require('fs');
const https = require('https');
require('dotenv').config();
var privKey = fs.readFileSync(process.env.SSL_KEY, 'utf-8');
var certificate = fs.readFileSync(process.env.SSL_CERT, 'utf-8');
var credentials = { key: privKey, cert: certificate };
const express = require('express');
var app = express();
const pool = require('./db');
const { getInfo } = require('./utils/serverUtils');
const router = require('./routes/userRoutes');
const request = require('request');


//test.serviceHandler("test", "nothing");

// Middleware
  //Allow Cross-Origin
/*app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header('Access-Control-Allow-Credentials', true);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});*/

// Task Scheduler
// ...

app.use(cors());
app.use(express.json());



// All the users routes
app.use('/users', require('./routes/userRoutes'));

// PayPal routes
app.use('/paypal', require('./routes/paypalRoutes'));

// Instance routes (called from the direction of the instance)
app.use('/instance', require('./routes/instanceRoutes'));

// Settings routes
app.use('/settings', require('./routes/settingsRoutes'));

// Test routes
app.use('/tests', require('./routes/testRoutes'));

var httpsServer = https.createServer(credentials, app);

httpsServer.listen(5000, () => {
    console.log("The API server has started on port 5000")
});