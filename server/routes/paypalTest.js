const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const request = require("request");
const jwtGenerator = require("../utils/jwtGenerator");
const validinfo = require("../middleware/validinfo");
const authorization = require("../middleware/authorization");


function exampleCall() {
  console.log("exampleCall function called!");

  // Test server creation

  const testOptions = {
    method: 'GET',
    headers: {
      'AuthClientId': '',
      'AuthSecret': ''
    }
  }
  const testRes = request.get('https://console.kamatera.com/service/servers', testOptions, function(err, response) {
    console.log("Error: ", err);
    console.log("Kamatera: ", response.body);
  });

}


// Add your credentials:
// Add your client ID and secret
// These will be in env
var CLIENT =
  'AahP0uPuabNc2rxw-3Grnsf8ncNchABTp6rPHnrEJ8FVuWw2_uoKY7b8uo-vejfPzfTyrY-0ldPJXAfQ';
var SECRET =
  'EGqhlqhZE_nk--JI2xGfxRxWf2vR4X5Ssj8pinZrFh3V-pCoeR2Ox7L8tfH45IoN1_pPf2bTPea1GnS1';
var PAYPAL_API = 'https://api-m.sandbox.paypal.com';


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
          total: '7000',
          currency: 'HUF'
        }
      }],
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
            total: '7000',
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