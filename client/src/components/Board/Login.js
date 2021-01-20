import React from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import Navbar from './Navbar';
import Footer from './Footer'
import { setLoginNameField, setPasswordField, LoginRequest } from '../../actions/boardActions';

function Login({dispatch, isLoggedIn, username, shopUsername, password}) {

  const onChangeNameField = e => {
    dispatch(setLoginNameField(e.target.value));
  }

  const onChangePasswordField = e => {
    dispatch(setPasswordField(e.target.value));
  }

  // Submit form
  const onSubmitForm = async e => {
    e.preventDefault();
    // Might be conditions to sanitize, etc...
    if (5 !== 5) {
      console.error("Error! 5 is not equal 5!");
    } else {
      console.log("Dispatching Login Request...");
      let response = await dispatch(LoginRequest(username, password));
      if (response === "SUCCESS") {
        toast.success("Logged in successfully. Welcome " + username + "!");
      } else {
        toast.error(response.error);
      }
    }
  }

  return (
        <div className="boardMain">
        <Navbar />
          <div id="login" className="login">
            <h1>Logo</h1>
            <form onSubmit={onSubmitForm} className="login-form">
                <input 
                    type="text"
                    name="name"
                    placeholder="username"
                    className="formElement"
                    value={username}
                    onChange={e => onChangeNameField(e)}
                />
                <input 
                    type="password"
                    name="password"
                    placeholder="password"
                    className="formElement"
                    value={password}
                    onChange={e => onChangePasswordField(e)}
                />
                <button>
                    Login
                </button>
            </form>
          </div>
        <Footer />
      </div>
  )
}

const mapStateToProps = state => ({
  isLoggedIn: state.board.isLoggedIn,
  username: state.board.username,
  shopUsername: state.shop.username,
  password: state.board.loginPassword
});

export default connect(mapStateToProps)(Login);