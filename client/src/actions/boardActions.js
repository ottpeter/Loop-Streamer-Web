import { LOGIN, LOGOUT, NEW_UPLOAD, PROGRESS, SET_PASSWORD_FIELD, SET_LOGINNAME_FIELD } from './actionNames';
import { toast } from 'react-toastify';     //!! MAYBE WE WILL MOVE THIS
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
      dispatch(userLogin());
      toast.success("Logged in successfully. Welcome " + username + "!");
    } else {
      dispatch({type: LOGOUT});
      toast.error(parseRes);
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
      //Getting authentication from server
      const response = await fetch(process.env.SERVER_URL + ":" + process.env.SERVER_PORT + "/users/get-username", {
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


/** uploadMedia needs to be revised for multiple server scenario */

/** restartService needs to be revised for multiple server scenario */