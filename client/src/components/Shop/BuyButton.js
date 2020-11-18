import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import { selectProduct } from '../../actions/shopActions';

// This is a BUY button, that will receive it's label as props
function BuyButton({label, text, id, dispatch}) {
  const history = useHistory();

  // Will set the product ID for Details page.
  function buy() {
    dispatch(selectProduct(id));
    history.push('/details');
  }

  return (
    <button className="buyButton" onClick={() => buy()}>
      <FormattedMessage id={label} defaultMessage={text} />
    </button>
  )
}

// We only need dispatch function, we don't need any variable.
const mapStateToProps = state => ({
  init: state.shop.init
});

export default connect(mapStateToProps)(BuyButton);