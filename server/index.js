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

//test.serviceHandler("test", "nothing");

// Middleware
app.use(cors());
app.use(express.json());



// All the users routes
app.use('/users', require('./routes/userRoutes'));


/** ...  */

// PayPal routes
  //test only
  app.use('/paypaltest', require('./routes/paypalTest'));


var httpsServer = https.createServer(credentials, app);

httpsServer.listen(5000, () => {
    console.log("The API server has started on port 5000")
});