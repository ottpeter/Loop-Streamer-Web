import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { connect } from 'react-redux';

function Checkout({selectedProduct, products}) {
  return (
    <div className="shopMain">
      <Navbar />
      <div className="checkoutGrid">
        <div className="checkoutGrid-summary">
          <div className="checkoutGrid-name">{products[selectedProduct].name}</div>
          <div className="checkoutGrid-price">{products[selectedProduct].price}</div>
        </div>
        <div className="checkoutGrid-paymentOptions">
          <div className="checkoutGrid-Paypal">Paypal</div>
          <div className="checkoutGrid-Card">Credit Card</div>
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