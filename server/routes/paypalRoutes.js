const router = require("express").Router();
const request = require("request");
require('dotenv').config();


// PayPal Credentials
var CLIENT = process.env.PAYPAL_CLIENT;
var SECRET = process.env.PAYPAL_SECRET;
var PAYPAL_API = 'https://api-m.sandbox.paypal.com';

// Here we will first change the database entries (service active), then create the server
// This will be moved to another file
function exampleCall() {
  console.log("exampleCall function called!");

  // Test server creation

  const testOptions = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'AuthClientId': 'a759573dab2e33880e3b5f5492a8a227',
      'AuthSecret': 'bbae6d1ba15fe6444786bec36839c84c'
    },
    body: JSON.stringify({
      "datacenter": "EU",
      "name": "api_server_demo_basic",
      "password": "pass123qZ#1234",
      "cpu": "1B",
      "ram": "512",
      "billing": "hourly",
      "disk_size_0": "10",
      "disk_src_0": "EU:6000C298f8b5c5ff2c2aa9e46ac0d80c",
      "network_name_0": "wan"
    })
  }
  const testRes = request.post('https://console.kamatera.com/service/server', testOptions, function(err, response) {
    console.log("Error: ", err);
    console.log("Kamatera: ", response);
  });
}


// Create payment route
router.post('/create-payment', async (req, res) => {
  console.log("Create payment route...");
  console.log("req.body(create-payment): ", req.body);
  // 2. Call /v1/payments/payment to set up the payment
  request.post(PAYPAL_API + '/v1/payments/payment', {
    auth:
    {
      user: CLIENT,
      pass: SECRET
    },
    body:
    {
      intent: 'sale',
      payer:
      {
        payment_method: 'paypal'
      },
      transactions: [
      {
        amount:
        {
          total: req.body.price,
          currency: 'HUF'
        }
      }],
      // We don't use this at the moment.
      redirect_urls:
      {
        return_url: 'https://example.com',
        cancel_url: 'https://example.com'
      }
    },
    json: true
  }, function(err, response) {
    if (err) {
      console.error(err);
      return res.sendStatus(500);
    }
    // 3. Return the payment ID to the client
    res.json({
      id: response.body.id
    });
  });
  console.log("Create payment route ended.")
});


// Finalize payment route
router.post('/execute-payment', async (req, res) => {
  console.log("Execute route...");
  // 2. Get the payment ID and the payer ID from the request body.
  var paymentID = req.body.paymentID;
  var payerID = req.body.payerID;
  console.log("paymentID: ", paymentID);
  console.log("payerID: ", payerID);
  // 3. Call /v1/payments/payment/PAY-XXX/execute to finalize the payment.
  request.post(PAYPAL_API + '/v1/payments/payment/' + paymentID +
    '/execute',
    {
      auth:
      {
        user: CLIENT,
        pass: SECRET
      },
      body:
      {
        payer_id: payerID,
        transactions: [
        {
          amount:
          {
            total: req.body.price,
            currency: 'HUF'
          }
        }]
      },
      json: true
    },
    function(err, response)
    {
      // If there was an error
      if (err) {
        console.error("Error: ", err);
        return res.sendStatus(500);
      }
      // 4. Return a success response to the client
      console.log("Success.");
      res.json(
      {
        status: 'success'
      });
    });
  console.log("Execute route ended.");
  exampleCall();
});

module.exports = router;