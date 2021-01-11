import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { FormattedMessage } from 'react-intl';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { createAccount, setEmail, setEmailAgain, setPassword, setPasswordAgain, setUserError, setUsername } from '../../actions/shopActions';
import ErrorMessage from './ErrorMessage'

function Register({username, email, email_again, password, password_again, error, dispatch}) {
  const history = useHistory();

  function handleChange(selector, e) {
    switch (selector) {
      case "email":
        dispatch(setEmail(e.target.value));
        break;

      case "email_again":
        dispatch(setEmailAgain(e.target.value));
        break;

      case "password":
        dispatch(setPassword(e.target.value));
        break;

      case "password_again":
        dispatch(setPasswordAgain(e.target.value));
        break;
        
      case "username":
        dispatch(setUsername(e.target.value));
        break;

      default:
        break;
    }
    console.log(email);
  }

  // Redirects to next page
  function submit() {
    if (email !== email_again) {
      dispatch(setUserError(true));
    } else if (password !== password_again) {
      dispatch(setUserError(true));
    } else {
      /** Call API that will register the user, or give error. */
      dispatch(setUserError(false));
      dispatch(createAccount(email, username, password));
      //history.push('/checkout');
    }
  }

  return (
    <div className="shopMain">
      <Navbar />
      <ErrorMessage open={error} />
      <div className="userinputGrid">
        <div className="userinputGrid-left">
          <div className="userinputGrid-row"><FormattedMessage id="user_promt"  defaultMessage="Username:" /></div>
          <div className="userinputGrid-row"><FormattedMessage id="e-mail" defaultMessage="E-mail:" /></div>
          <div className="userinputGrid-row"><FormattedMessage id="e-mail_again" defaultMessage="E-mail again:" /></div>
          <div className="userinputGrid-row"><FormattedMessage id="new_password" defaultMessage="Password:" /></div>
          <div className="userinputGrid-row"><FormattedMessage id="new_password_again" defaultMessage="Password again:" /></div>
          <div className="userinputGrid-row"><p></p></div>
        </div>
        <div className="userinputGrid-right">
          <input type="username" onChange={(e) => handleChange("username", e)} value={username}></input>
          <input type="email" onChange={(e) => handleChange("email", e)} value={email}></input>
          <input type="email" onChange={(e) => handleChange("email_again", e)} value={email_again} className={email===email_again?"form-green":"form-red"}></input>
          <input type="password" onChange={(e) => handleChange("password", e)} value={password}></input>
          <input type="password" onChange={(e) => handleChange("password_again", e)} value={password_again} className={password===password_again?"form-green":"form-red"}></input>
          <button onClick={() => submit()}>Mindent elfogadok.</button>
        </div>
      </div>
      <Footer />
    </div>
  )
}

const mapStateToProps = state => ({
  email: state.shop.email,
  email_again: state.shop.email_again,
  password: state.shop.password,
  password_again: state.shop.password_again,
  username: state.shop.username,
  error: state.shop.userdata_error,
})

export default connect(mapStateToProps)(Register);