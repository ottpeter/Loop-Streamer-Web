import React from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';
import { setStatus } from '../../actions/shopActions';
import { connect } from 'react-redux';
require('dotenv').config();
 
class PayPal extends React.Component {
    render() {
        const onSuccess = (payment) => {
            // Congratulation, it came here means everything's fine!
            // You can bind the "payment" object's value to your state or props or whatever here, please see below for sample returned data
                console.log("The payment was succeeded!", payment);
                // Set payment status successful
                /*OBSOLATE*///this.props.dispatch(createAccount(this.props.email, this.props.username));
                this.props.dispatch(setStatus("SUCCESS", true));
                this.props.history.push('/done');
        }
 
        const onCancel = (data) => {
            // User pressed "cancel" or close Paypal's popup!
            console.log('The payment was cancelled!', data);
            // Set payment status successful
            this.props.dispatch(setStatus("CANCELLED", false));
            this.props.history.push('/done');
            // You can bind the "data" object's value to your state or props or whatever here, please see below for sample returned data
        }
 
        const onError = (err) => {
            // The main Paypal's script cannot be loaded or somethings block the loading of that script!
            console.log("Error!", err);
            // Set payment status successful
            this.props.dispatch(setStatus("ERROR", false));
            this.props.history.push('/done');
            // Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
            // => sometimes it may take about 0.5 second for everything to get set, or for the button to appear
        }
 
        let env = 'sandbox'; // you can set here to 'production' for production
        let currency = 'HUF'; // or you can set this value from your props or state
        // Document on Paypal's currency code: https://developer.paypal.com/docs/classic/api/currency_codes/
 
        const client = {
            sandbox:    process.env.REACT_APP_SANDBOX_ID,
            production: 'YOUR-PRODUCTION-APP-ID',
        }
        // In order to get production's app-ID, you will have to send your app to Paypal for approval first
        // For sandbox app-ID (after logging into your developer account, please locate the "REST API apps" section, click "Create App"):
        //   => https://developer.paypal.com/docs/classic/lifecycle/sb_credentials/
        // For production app-ID:
        //   => https://developer.paypal.com/docs/classic/lifecycle/goingLive/
 
        // NB. You can also have many Paypal express checkout buttons on page, just pass in the correct amount and they will work!
        return (
            <PaypalExpressBtn 
              env={env}
              client={client}
              currency={currency}
              total={this.props.total}
              onError={onError}
              onSuccess={onSuccess}
              onCancel={onCancel} 
            />
        );
    }
}

const mapStateToProps = state => ({
  init: state.shop.init,
  email: state.shop.email,
  username: state.shop.username
});

export default connect(mapStateToProps)(PayPal)