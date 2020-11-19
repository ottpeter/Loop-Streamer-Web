const cors = require('cors');
const fs = require('fs');
const https = require('https');
var privKey = fs.readFileSync('/etc/letsencrypt/live/185-167-97-209.cloud-xip.io/privkey.pem', 'utf-8');
var certificate = fs.readFileSync('/etc/letsencrypt/live/185-167-97-209.cloud-xip.io/cert.pem', 'utf-8');
var credentials = { key: privKey, cert: certificate };
const express = require('express');
var app = express();
const pool = require('./db');

test.serviceHandler("test", "nothing");

// Middleware
app.use(cors());
app.use(express.json());



// All the users routes
app.use('/users', require('./routes/userRoutes'));


/** ...  */


var httpsServer = https.createServer(credentials, app);

httpsServer.listen(5000, () => {
    console.log("The API server has started on port 5000")
});