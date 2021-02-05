import React, { Component } from 'react'
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import Navbar from './Navbar';
import Footer from './Footer';
import { useEffect, useState } from 'react';
import { LOGOUT } from '../../actions/actionNames';
import { uploadMedia, restartService, getInstanceIP } from '../../actions/boardActions';
import { useHistory, Link } from 'react-router-dom';

function MainBoard({selectedProduct, dispatch, ongoingUploads, nextID}) {
  const history = useHistory();
  const [seconds, setSeconds] = useState(0);        // move to redux store?
  const message = null;           // move to redux store?

  useEffect(() => {
    // Redirect to checkout if there is purchase in progress
    console.log("Redirecting to checkout...");
    if (selectedProduct !== "empty") history.push('/checkout');
    dispatch(getInstanceIP());
    // This is necessary to refresh periodically
    const interval = setInterval(() => {
      setSeconds(seconds => seconds + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleVid = (e) => {
    const file = e.target.files[0];     // Accessing file
    console.log("Selected file: ", file);
    if (!isValidExtension(file, "vid")) {
        console.error("This is not a video file or extension is not correct.");
        toast.error("This is not a video file or extension is not correct.");
        return -1;
    }
    console.log("length: ", ongoingUploads.length)
    dispatch(uploadMedia(file, "vid", nextID))
  }

  const handleMusic = (e) => {
    const file = e.target.files[0];     // Accessing file
    console.log("Selected file: ", file);
    if (!isValidExtension(file, "music")) {
        console.error("This is not an audio file or extension is not correct.");
        toast.error("This is not an audio file or extension is not correct.");
        return -1;
    }
    console.log("length: ", ongoingUploads.length)
    dispatch(uploadMedia(file, "music", ongoingUploads.length))
  }

  function restartMain() {
    dispatch(restartService("restartMain"));
  }

  function logOut() {
    localStorage.setItem("token", null);
    dispatch({type: LOGOUT});
    toast.success("Logged out successfully");
  }

    // List of progressbars 
    const progressElements = ongoingUploads.map((upload) =>
        <li>
            file: {upload.fileName}
            <div id={`upload-${upload.id}`} className="progressContainer">
                <div id={`bar-${upload.id}`} className="progressBar" style={{width: `${upload.progress}`}}>
                    {upload.progress}
                </div>
            </div>
        </li>
    );

  return (
    <div className="boardMain">
    <Navbar />   
      <div className="MainBoard">
        <h1>Main Board</h1>
        <div className="MainBoardButtons">
            <input type="file" id="fileInputVid" onChange={handleVid} style={{display: 'none'}} />
            <label htmlFor="fileInputVid" className="btn-upload">Upload video or image</label>

            <input type='file' id="fileInputMusic" onChange={handleMusic} style={{display: 'none'}} />
            <label htmlFor="fileInputMusic" className="btn-upload">Upload music</label>
        
            <Link to="/board/settings" className="btn-switch-page">Application settings</Link>
            <Link to="/board/account" className="btn-switch-page">Account settings</Link>
            <button onClick={() => restartMain()} className="btn-warning">RESTART MAIN</button>
            <button onClick={() => logOut()} className="btn-danger">Logout</button>
        </div>

        <div className="MainBoardMessages">
            <p>{message}</p>
            <div className="progressBars">
                <ul>
                {progressElements}
                </ul>
            </div>
        </div>    
      </div>
    <Footer />
  </div>
  )
}

const isValidExtension = (file, mediaType) => {
  console.log("file.mimetype: ", file.type);

  if (mediaType === "vid") {
      return file.type.split('/')[0] ==="video" || file.type.split('/')[0] ==="image";
  } else if (mediaType === "music") {
      return file.type.split('/')[0] ==="audio";
  } else {
      console.error("mediaType needs to be 'vid' or 'music'");
      return false;
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.board.isLoggedIn,
  serverError: state.board.serverError,
  selectedProduct: state.shop.selectedProduct,
  username: state.board.username,
  ongoingUploads: state.board.uploads,
  nextID: state.board.arrayLength
});

export default connect(mapStateToProps)(MainBoard);