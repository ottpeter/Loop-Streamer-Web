import React, { Component } from 'react';
import { connect } from 'react-redux';

class Details extends Component {
  render() {
    return (
      <div>
        in details
        {this.props.selectedProduct}
        
      </div>
    )
  }
}

const mapStateToProps = state => ({
  selectedProduct: state.shop.selectedProduct,
  init: state.shop.init
})

export default connect(mapStateToProps)(Details);