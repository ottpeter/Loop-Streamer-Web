import React, { Component } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { useHistory } from "react-router-dom";

function Details ({selectedProduct, products}) {
  const history = useHistory();

  function goBack() {
    history.push('/');
  }

  function buy() {
    // maybe here we could test if user is registered.
    history.push('/register');
  }

  return (
    <div className="shopMain">
      <Navbar />
      {console.log(products)}
      <div className="detailsGrid d-flex">
        <div className="detailsGrid-left">
          <img src={products[selectedProduct].img} alt="No image"></img>
        </div>
        <div className="detailsGrid-right d-flex flex-column">
          <div className="detailsGrid-name">{products[selectedProduct].name}</div>
          <div className="detailsGrid-info">{products[selectedProduct].info}</div>
          <div className="detailsGrid-buttons">
            <button className="detailsGrid-goBack" onClick={() => goBack()}>
              <FormattedMessage id="go_back" defaultMessage="Go Back"></FormattedMessage>
            </button>
            <button className="detailsGrid-Buy" onClick={() => buy()}>
              <FormattedMessage id="buy" defaultMessage="Buy"></FormattedMessage>
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

const mapStateToProps = state => ({
  selectedProduct: state.shop.selectedProduct,
  products: state.shop.products,
  init: state.shop.init
})

export default connect(mapStateToProps)(Details);