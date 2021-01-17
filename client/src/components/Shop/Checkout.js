import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { connect } from 'react-redux';
import PayPalButton from './PayPalButton';
import { useHistory } from 'react-router-dom';


function Checkout({selectedProduct, products}) {
  const history = useHistory();
  
  // INSERT PAYPAL FUNCTION HERE
/*
  function createOrder(data, actions) {
    // 2. Make a request to your server
    console.log("data(payment): ", data);
    return actions.request.post('https://63-250-57-43.cloud-xip.io:5000/paypaltest/create-payment')
      .then(function(res) {
        // 3. Return res.id from the response
        console.log("'create-payment' request sent.");
        return res.id;
      });
  }

  function onApprove(data, actions) {
    // 2. Make a request to your server
    console.log("data(onAuthorize): ", data);
    return actions.request.post('https://63-250-57-43.cloud-xip.io:5000/paypaltest/execute-payment', {
      paymentID: data.paymentID,
      payerID:   data.payerID
    })
      .then(function(res) {
        console.log("'execute-payment' request sent.");
        // 3. Show the buyer a confirmation message.
      });
  }
*/



  return (
    <div className="shopMain">
      <Navbar />
      <div className="checkoutGrid">
        <div className="checkoutGrid-summary">
          <div className="checkoutGrid-name">{products[selectedProduct].name}</div>
          <div className="checkoutGrid-price">{products[selectedProduct].price}</div>
        </div>
        <div className="checkoutGrid-paymentOptions">
          <div className="checkoutGrid-Paypal">
          <PayPalButton />
            {/*<PayPalButton 
              total={parseInt(products[selectedProduct].price)} history={history} 
              createOrder={(data, actions) => createOrder(data, actions)}
              onApprove={(data, actions) => onApprove(data, actions)}
            />*/}
          </div>
          <div className="checkoutGrid-Card">Credit Card <p>coming soon...</p></div>
          <div className="checkoutGrid-Crypto"></div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

const mapStateToProps = state => ({
  selectedProduct: state.shop.selectedProduct,
  products: state.shop.products,
});

export default connect(mapStateToProps)(Checkout);