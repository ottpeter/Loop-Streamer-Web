import { LOGIN, NEW_UPLOAD, PROGRESS } from './actionNames';
// Server URL is stored in .env
require('dotenv').config();

// Login user after authenticated with isAuth
export const userLogin = (username) => ({
  type: LOGIN,
  payload: { username }
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