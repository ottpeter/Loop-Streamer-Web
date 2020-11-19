import React from 'react'
import Navbar from './Navbar';
import Footer from './Footer';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

function Done({success, status}) {
  return (
    <div className="shopMain">
      <Navbar />
      {success === true ? (
        <div className="paymentSuccess"><FormattedMessage id={status} defaultMessage="The payment was successful. You will soon receive an e-mail with login details. Thank you for your purchase!" /></div>
      ) : (
        <div className="paymentFailed"><FormattedMessage id={status} defaultMessage="The payment was not successul." /></div>
      )}
      <Footer />
    </div>
  )
}

const mapStateToProps = state => ({
  success: state.shop.paymentSuccessful,
  status: state.shop.paymentStatus,
});

export default connect(mapStateToProps)(Done);