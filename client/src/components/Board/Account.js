import React, { Component } from 'react'
import Navbar from './Navbar';
import Footer from './Footer';

export default class Account extends Component {
  render() {
    return (
      <div className="boardMain">
      <Navbar />        
        <div>
          Account board.
        </div>
      <Footer />
    </div>
    )
  }
}
