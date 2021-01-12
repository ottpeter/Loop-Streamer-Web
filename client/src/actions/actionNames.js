/** For the Board */
export const INIT = "INIT"
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const DELETE_USER = "DELETE_USER";       // User can request account deletion.
export const CHANGE_PWD = "CHANGE_PASSWORD";
export const SET_LOGINNAME_FIELD = "SET_LOGINNAME_FIELD";
export const SET_PASSWORD_FIELD = "SET_PASSWORD_FIELD";


// The file upload should happen to the server instance
export const NEW_UPLOAD = "NEW_UPLOAD";
export const PROGRESS = "PROGRESS";             // Progress change


/** For the Shop */
export const SELECT = "SELECT";
export const SET_PAYMENT_STATUS = "SET_PAYMENT_STATUS";
export const SET_USERNAME = "SET_USERNAME";     // User can't change his own username.
export const SET_PASSWORD = "SET_PASSWORD";
export const SET_PASSWORD_AGAIN = "SET_PASSWORD_AGAIN";
export const SET_EMAIL = "SET_EMAIL";
export const SET_EMAIL_AGAIN = "SET_EMAIL_AGAIN";
export const SET_USERDATA_ERROR = "SET_USERDATA_ERROR";