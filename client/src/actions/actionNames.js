/** For the Board */
export const INIT = "INIT"
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const DELETE_USER = "DELETE_USER";       // User can request account deletion.
export const CHANGE_PWD = "CHANGE_PASSWORD";
export const SET_LOGINNAME_FIELD = "SET_LOGINNAME_FIELD";
export const SET_PASSWORD_FIELD = "SET_PASSWORD_FIELD";
export const CHANGE_SETTING_TEXTS = "CHANGE_SETTING_TEXTS";
export const SELECT_SETTING = "SELECT_SETTING";
export const CHANGE_SETTING_VALUE = "CHANGE_SETTING_VALUE";
export const OPEN_TEXT_MODAL = "OPEN_TEXT_MODAL";
export const CLOSE_TEXT_MODAL = "CLOSE_TEXT_MODAL";
export const SET_INSTANCE_IP = "SET_INSTANCE_IP";


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
export const USER_ACTIVATED = "USER_ACTIVATED";
export const CODE_INVALID = "CODE_INVALID";