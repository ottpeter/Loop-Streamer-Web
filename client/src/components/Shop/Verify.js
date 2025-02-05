import React from 'react'
import { connect } from 'react-redux';
import Footer from './Footer';
import Navbar from './Navbar';
import { useParams } from "react-router";
import { verifyAccount } from '../../actions/shopActions';
import { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LOGOUT } from '../../actions/actionNames';
import { setLoginNameField } from '../../actions/boardActions';

function Verify({user_activated, dispatch, uname, lg}) {
  let { hash } = useParams();
  const history = useHistory();

  useEffect(() => {
    dispatch(verifyAccount(hash));
    return () => {
      console.log("'cleanup'");
      console.log("username: ", uname);
      console.log("logged in: ", lg);
    }
  }, []);

  function toLogin() {
    history.push("/board/login")
  }

  return (
    <div className="shopMain">
      <Navbar />
      {user_activated?
        <p className="form-green"><FormattedMessage id="account_activated"  defaultMessage="Account activated!" /></p>
      :
        <p className="form-red"><FormattedMessage id="code_invalid"  defaultMessage="Activation code not valid anymore. Maybe this account is already activated, or the URL is not correct." /></p>
      }
      <div>
        <button onClick={() => toLogin()}><FormattedMessage id="to_login_page" defaultMessage="Click Here to Login"/></button>
      </div>
      <Footer />
    </div>
  )
}

const mapStateToProps = state => ({
  user_activated: state.shop.user_activated,
  uname: state.board.username,
  lg: state.board.isLoggedIn
});

export default connect(mapStateToProps)(Verify);