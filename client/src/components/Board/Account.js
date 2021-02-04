import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Navbar from './Navbar';
import Footer from './Footer';

function Account(props) {
    return(
      <div className="boardMain">
        <Navbar />
        <div className="AccountBoard">
            <h1>Account Board</h1>
            <div className="AccountBoard">
                <button>Change password</button>
                <button>Delete account</button>
                {props.username === "admin" ? (
                  <button>Reset password for user</button>
                  ) : (
                    <p></p>
                    )}
                <Link to="/" className="btn-switch-page">Back to Main Board</Link>
            </div>
        </div>
        <Footer />
      </div>
    );
}

const mapStateToProps = state => ({
    username: state.board.username,
    isServerError: state.board.isServerError
});

export default connect(mapStateToProps)(Account);