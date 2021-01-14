import React, { Component } from 'react'
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import Navbar from './Navbar';
import Footer from './Footer';
import { useEffect } from 'react';
import { LOGOUT } from '../../actions/actionNames';
import { useHistory } from 'react-router-dom';

function MainBoard({selectedProduct, dispatch}) {
  const history = useHistory();

  useEffect(() => {
    console.log("Redirecting to checkout...");
    if (selectedProduct !== "empty") history.push('/checkout');
    return () => {
      console.log("use effect finished.");
    }
  }, []);

  function logOut() {
    localStorage.setItem("token", null);
    dispatch({type: LOGOUT});
    toast.success("Logged out successfully");
  }

  return (
    <div className="boardMain">
    <Navbar />   
      <div>
        The main board.
        <button onClick={() => logOut()} className="btn-danger">Logout</button>
      </div>
    <Footer />
  </div>
  )
}

const mapStateToProps = state => ({
  isLoggedIn: state.board.isLoggedIn,
  serverError: state.board.serverError,
  selectedProduct: state.shop.selectedProduct,
  username: state.board.username
});

export default connect(mapStateToProps)(MainBoard);