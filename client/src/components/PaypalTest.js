import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { selectProduct } from '../actions/shopActions';


function PaypalComponent({init, products, selectedProduct}) {
    useEffect(()=> {
      // Only load the button, if the products are already loaded into the Redux Store
      if (products[0]) {
        window.paypal.Button.render({
          env: 'sandbox', // Or 'production'
          // Set up the payment:
          // 1. Add a payment callback
          payment: async function(data, actions) {
            // 2. Make a request to your server
            const requestOptions = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ 
                price: products[selectedProduct].price
              })
            };
            /** The first verison doesn't give response and price is not in request, 
             * the second gives respnse and there is price */
            //const res = actions.request.post('https://63-250-57-43.cloud-xip.io:5000/paypaltest/create-payment')
            const res = await fetch(process.env.REACT_APP_SERVER_URL + ':' + process.env.REACT_APP_SERVER_PORT + '/paypaltest/create-payment', requestOptions).then(response => response.json());
            // 3. Return res.id from the response
            console.log("res.id: ", res.id);
            return res.id;
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
            return fetch(process.env.REACT_APP_SERVER_URL + ':' + process.env.REACT_APP_SERVER_PORT + '/paypaltest/execute-payment', requestOptions)
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
      }
    }, [products]);

    //if (!products[0]) console.log("Waiting products");

    return (
        <div>
            <h1>Paypal integration</h1>
            <div id="paypal-button"></div>

        </div>
    )
}

const mapStateToProps = state => ({
  selectedProduct: 0,
  products: state.shop.products,
});

export default connect(mapStateToProps)(PaypalComponent)