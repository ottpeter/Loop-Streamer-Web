import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { startTextModal } from '../../actions/boardActions';

import TextModal from './TextModal';
import Footer from './Footer';
import Navbar from './Navbar';

function Settings({showTextModal, dispatch}) {
    console.log("SETTINGS");


    // Clicking on button will change the text messages in the Redux Store for the modal.


    return(
      <div className="boardMain">
        <Navbar />
        <div className="SettingsBoard">
          <TextModal show={showTextModal} />
          <h1>Settings Board</h1>

          <div className="SettingsButtons">
              <button className="btn-settings" onClick={() => dispatch(startTextModal("rtmp"))}>Set RTMP key</button>
              <button className="btn-settings">Upload Logo</button>
              <button className="btn-settings" onClick={() => dispatch(startTextModal("logo-position"))} >Change logo position</button>
              <button className="btn-settings" onClick={() => dispatch(startTextModal("logo-size"))} >Change logo size</button>
              <button className="btn-settings" onClick={() => dispatch(startTextModal("slideshow-duration")) }>Change image slideshow duration</button>
              <button className="btn-settings">Change font</button>
              <button className="btn-settings">Change color</button>
              <Link to="/" className="btn-switch-page">Back to Main Board</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
}

const mapStateToProps = state => ({
    init: state.init,
    showTextModal: state.board.textModalOpen
});

export default connect(mapStateToProps)(Settings);


// REVERSE ORDER COLOURS!!