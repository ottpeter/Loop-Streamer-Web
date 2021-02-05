import { INIT, LOGIN, LOGOUT, SET_LOGINNAME_FIELD, SET_PASSWORD_FIELD, CHANGE_SETTING_TEXTS, OPEN_TEXT_MODAL, CLOSE_TEXT_MODAL, SELECT_SETTING, CHANGE_SETTING_VALUE, SET_INSTANCE_IP } from '../actions/actionNames';

const initialState = {
  isLoggedIn: false,
  serverError: false,
  username: "_not_set_",
  loginPassword: null,
  instanceIP: null,
  uploads: [],
  arrayLength: 0,
  modalTitleID: "init_title",
  modalTitle: "Init Title",
  modalTextID: "init_text",
  modalText: "Initial text before change",
  modalPrefix: null,
  textModalOpen: false,
  xyzModalOpen: false,
  settingName: null,
  settingValue: null
}

const boardReducer = function (state = initialState, action) {
  switch (action.type) {
    case INIT:
      return {
        ...state,
      };
    case SET_LOGINNAME_FIELD:
      return {
        ...state,
        username: action.payload.username
      };

    case SET_PASSWORD_FIELD:
      return {
        ...state,
        loginPassword: action.payload.password
      }
    
    case LOGIN:
      return {
        ...state,
        username: action.payload.username,
        loginPassword: null,
        isLoggedIn: true
      }

    case LOGOUT:
      return {
        ...state,
        loginPassword: null,
        isLoggedIn: false,
      }
    
    case CHANGE_SETTING_TEXTS:
      return {
        ...state,
        modalTitleID: action.payload.modalTitleID,
        modalTitle: action.payload.modalTitle,
        modalTextID: action.payload.modalTextID,
        modalText: action.payload.modalText,
        modalPrefix: action.payload.modalPrefix
      }
    case OPEN_TEXT_MODAL:
      return {
        ...state,
        textModalOpen: true
      }
    case CLOSE_TEXT_MODAL:
      return {
        ...state,
        textModalOpen: false
      }
    case SELECT_SETTING:
      return {
        ...state,
        settingName: action.payload.settingName
      }
    case CHANGE_SETTING_VALUE:
      return {
        ...state,
        settingValue: action.payload.settingValue
      }
    case SET_INSTANCE_IP:
      return {
        ...state,
        instanceIP: action.payload.ip
      }

    default:
      return state;
  }
}

export default boardReducer;