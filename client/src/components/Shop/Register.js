import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { FormattedMessage } from 'react-intl';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { setEmail, setEmailAgain, setUserError } from '../../actions/shopActions';
import ErrorMessage from './ErrorMessage'

function Register({email, email_again, dispatch}) {
  const history = useHistory();

  function handleChange(selector, e) {
    switch (selector) {
      case "email":
        dispatch(setEmail(e.target.value));
        break;

      case "email_again":
        dispatch(setEmailAgain(e.target.value));
        break;

      default:
        break;
    }
    console.log(email);
  }

  // Redirects to next page
  function submit() {
    if (email === email_again) {
      /** Call API that will register the user, or give error. */
      dispatch(setUserError(false));
      history.push('/checkout');
    } else {
     dispatch(setUserError(true));
    }
  }

  return (
    <div className="shopMain">
      <Navbar />
      <ErrorMessage open={true} />
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
          <input></input>
          <input onChange={(e) => handleChange("email", e)}></input>
          <input onChange={(e) => handleChange("email_again", e)}></input>
          <input onChange={(e) => handleChange("password", e)}></input>
          <input onChange={(e) => handleChange("password_again", e)}></input>
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
  error: state.shop.userdata_error,
})

export default connect(mapStateToProps)(Register);