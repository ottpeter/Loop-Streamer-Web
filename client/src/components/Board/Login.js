import React from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { LOGOUT } from '../../actions/actionNames';
import { userLogin, setLoginNameField, setPasswordField, LoginRequest } from '../../actions/boardActions';

function Login({dispatch, isLoggedIn, username, password}) {
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
      dispatch(LoginRequest(username, password));
    }
    /*try {
        // Constructing the body of the API call
        const body = {username, password};
        // Sending API request
        const response = await fetch('https://185-167-97-209.cloud-xip.io:5000/users/login', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
        });
        const parseRes = await response.json();

        // If login was successful, set cookie, else, dispatch LOGOUT event
        if (parseRes.token) {
            //set cookie
            localStorage.setItem("token", parseRes.token);
            dispatch(userLogin());
            toast.success("Logged in successfully. Welcome " + username + "!");
        } else {
            dispatch({type: LOGOUT});
            toast.error(parseRes);
        }

    } catch (err) {
        console.error(err.message);
        toast.error("Error in application (Login)");
    }*/
}

  return (
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
  )
}

const mapStateToProps = state => ({
  isLoggedIn: state.board.isLoggedIn,
  username: state.board.username,
  password: state.board.loginPassword
});

export default connect(mapStateToProps)(Login);