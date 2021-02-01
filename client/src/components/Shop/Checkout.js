import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { connect } from 'react-redux';
import PayPalButton from './PayPalButton';
import { useHistory } from 'react-router-dom';


function Checkout({selectedProduct, products}) {
  const history = useHistory();

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
          </div>
          <div className="checkoutGrid-Card">Credit Card <p>coming soon...</p></div>
          <div className="checkoutGrid-Crypto">Crypto<p>also coming soon...</p></div>
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