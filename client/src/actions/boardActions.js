import axios from 'axios';
import { LOGIN, LOGOUT, NEW_UPLOAD, PROGRESS, SET_PASSWORD_FIELD, SET_LOGINNAME_FIELD } from './actionNames';
// Server URL is stored in .env
require('dotenv').config();

// Login user after authenticated with isAuth
export const userLogin = (username) => ({
  type: LOGIN,
  payload: { username }
});

export const LoginRequest = (username, password) => async (dispatch) => {
  try {
    // Constructing the body of the API call
    const body = {username, password};

    // Sending the API request
    console.log(process.env.REACT_APP_SERVER_URL + ":" + process.env.REACT_APP_SERVER_PORT + "/users/login");
    const response = await fetch(process.env.REACT_APP_SERVER_URL + ":" + process.env.REACT_APP_SERVER_PORT + "/users/login", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(body)
    });
    // Convert response to JSON
    const parseRes = await response.json();
    console.log(parseRes);

    // If login was successful, set cookie, else, dispatch LOGOUT event
    if (parseRes.token) {
      //set cookie
      localStorage.setItem("token", parseRes.token);
      dispatch(userLogin(username));
      return "SUCCESS"
    } else {
      dispatch({type: LOGOUT});
      return parseRes;
    }

  } catch (err) {
    console.error(err.message);
  }
}

// Set username field
export const setLoginNameField = (username) => ({
  type: SET_LOGINNAME_FIELD,
  payload: { username }
});

// Set password field
export const setPasswordField = (password) => ({
  type: SET_PASSWORD_FIELD,
  payload: { password }
});

// New element in uploads array
export const newUpload = (id, filename, progress, done) => ({
  type: NEW_UPLOAD,
  payload: {
      uploadID: id,
      fileName: filename,
      progress: progress,
      isDone:   done
  }
})

// Set progress
export const setProgess = (id, filename, progress, done) => ({
  type: PROGRESS,
  payload: {
      uploadID: id,
      fileName: filename,
      progress: progress,
      isDone:   done
  }
});


// Get username from JWT token or LOGOUT if not authenticated
export const isAuth = (isAuth) => async (dispatch) => {
  try {
      console.log("Checking if user is logged in...")
      //Getting authentication from server
      const response = await fetch(process.env.REACT_APP_SERVER_URL + ":" + process.env.REACT_APP_SERVER_PORT + "/users/get-username", {
          method: "GET",
          headers: { token: localStorage.token }
      })
      //Server will respond with true/false
      const parseRes = await response.json();
      console.log("(isAuth) parseRes: ", parseRes);
      //Dispatching accordingly
      typeof parseRes.username !== 'undefined' ? 
          dispatch(userLogin(parseRes.username))
      :
          dispatch({type: LOGOUT}); 
  } catch (err) {
      console.error(err.message);
  }
}

// Change 1 setting in server_configs database
export const changeSetting = (name, value) => (dispatch) => {
  const settingsObj = { 
    "settingName": name,
    "value": value
  }
  axios.post('https://63-250-57-43.cloud-xip.io:5000/settings/change', settingsObj, {
    headers: { "token": localStorage.token }
  })
  .then(res => {
    console.log("Setting changed successfully.", res);
  }).catch(err => {
    console.error("There was an error while trying to change a setting: ", err);
  });
}


/** uploadMedia needs to be revised for multiple server scenario */
// Upload media (to vids folder or to mp3 folder)
export const uploadMedia = (file, fileType, id) => (dispatch) => {
  const formData = new FormData();
  formData.append('file', file);          // Appending file to form
  formData.append('fileType', fileType);   // This will be req.body.fileType on the server side

  // We need to generate ID somehow
  let uploadID = id;
  dispatch(newUpload(uploadID, file.name, 0, false));

  axios.post('https://185-167-97-209.cloud-xip.io:5000/files/upload', formData, {
      headers: { "token": localStorage.token },    
      onUploadProgress: (ProgressEvent) => {
          let progress = Math.round(
          ProgressEvent.loaded / ProgressEvent.total * 100) + '%';
          dispatch(setProgess(uploadID, file.name, progress, false));
      },
  }).then(res => {
      console.log("Upload successful", res);
      dispatch(setProgess(uploadID, file.name, "100%", true));
      console.log("res: ", res);
  }).catch(err => {
      console.error(err.message);
  });
}

/** restartService needs to be revised for multiple server scenario */
/**
 * Restart services on the server
 * @param {command === restartMain}     Restart main service and video service
 * @param {command === restartVideo}    Restart only video
 */
export const restartService = (command) => (dispatch) => {
  if (command === "restartMain" || command === "restartVideo") {
      axios.post('https://185-167-97-209.cloud-xip.io:5000/settings/restart', { command: command}, {
          headers: { "token": localStorage.token }
      }).then(res => {
          console.log("success....");
      }).catch(err => {
          console.error(err.message);
      })
  } else {
      throw "Invalid command!";
  }
}