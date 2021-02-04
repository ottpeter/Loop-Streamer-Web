import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { changeSetting } from '../../actions/boardActions';
import Footer from './Footer';
import Navbar from './Navbar';

function Settings({dispatch}) {
    console.log("SETTINGS");
    function changeRTMP() {
      dispatch(changeSetting("rtmp-key", "1"));
    }

    return(
      <div className="boardMain">
        <Navbar />
        <div className="SettingsBoard">
            <h1>Settings Board</h1>

            <div className="SettingsButtons">
                <button className="btn-settings" onClick={() => changeRTMP()}>Set RTMP key</button>
                <button className="btn-settings">Upload Logo</button>
                <button className="btn-settings">Change logo position</button>
                <button className="btn-settings">Change logo size</button>
                <button className="btn-settings">Change image slideshow duration</button>
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
    init: state.init
});

export default connect(mapStateToProps)(Settings);