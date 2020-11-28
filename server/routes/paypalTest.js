const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const request = require("request");
const jwtGenerator = require("../utils/jwtGenerator");
const validinfo = require("../middleware/validinfo");
const authorization = require("../middleware/authorization");


function exampleCall() {
  console.log("exampleCall function called!");
}


// Add your credentials:
// Add your client ID and secret
// These will be in env
var CLIENT =
  'AUJoKVGO3q1WA1tGgAKRdY6qx0qQNIQ6vl6D3k7y64T4qh5WozIQ7V3dl3iusw5BwXYg_T5FzLCRguP8';
var SECRET =
  'EOw8LNwDhM7esrQ3nHfzKc7xiWnJc83Eawln4YLfUgivfx1LGzu9Mj0F5wlarilXDqdK9Q5aHVo-VGjJ';
var PAYPAL_API = 'https://api-m.sandbox.paypal.com';


// Create payment route
router.post('/create-payment', async (req, res) => {
  console.log("Create payment route...");
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
          total: '5.99',
          currency: 'USD'
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
            total: '5.99',
            currency: 'USD'
          }
        }]
      },
      json: true
    },
    function(err, response)
    {
      // If there was an error
      if (err) {
        console.error(err);
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