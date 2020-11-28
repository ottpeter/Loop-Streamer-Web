import React, {useEffect} from 'react';;

export default function PaypalComponent() {
    useEffect(()=> {
        window.paypal.Button.render({
            env: 'sandbox', // Or 'production'
            // Set up the payment:
            // 1. Add a payment callback
            payment: function(data, actions) {
              // 2. Make a request to your server
              return actions.request.post('https://63-250-57-43.cloud-xip.io:5000/paypaltest/create-payment')
                .then(function(res) {
                  // 3. Return res.id from the response
                  console.log("res.id: ", res.id);
                  return res.id;
                });
            },
            // Execute the payment:
            // 1. Add an onAuthorize callback
            onAuthorize: function(data, actions) {
              console.log("data.paymentID: ", data.paymentID);
              console.log("data.payerID: ", data.payerID);
              const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                  paymentID: data.paymentID,
                  payerID:   data.payerID 
                })
              };
              // 2. Make a request to your server
              return fetch('https://63-250-57-43.cloud-xip.io:5000/paypaltest/execute-payment', requestOptions)
              /*return actions.request.post('https://63-250-57-43.cloud-xip.io:5000/paypaltest/execute-payment', {
                paymentID: data.paymentID,
                payerID:   data.payerID
              })*/
                .then(function(res) {
                  // 3. Show the buyer a confirmation message.
                  alert("payment got successful");
                });
            }
          }, '#paypal-button');
    }, []);
    return (
        <div>
            <h1>Paypal integration</h1>
            <div id="paypal-button"></div>

        </div>
    )
}