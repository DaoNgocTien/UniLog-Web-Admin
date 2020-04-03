import {
  LoginActionTypes
} from "../constants.js";
import {
  baseReducer
} from "./baseReducer.js";
//  Action type destructor
const {
  CONFIRM_LOGIN_STATUS,
  STORE_LOGIN_INFORMATION,
  REQUEST_FETCH_API
} = LoginActionTypes;

const initialState = {
  fetchStatus: false,
  isLoggedIn: 2,
  loginInfor: {
    "id": 4,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjEwIiwibmJmIjoxNTg0MDg0MDUyLCJleHAiOjE1ODQ2ODg4NTIsImlhdCI6MTU4NDA4NDA1Mn0.BvtM4Y2c_baIqoHk7ZFMpfPRcSsWAvap1Af_DzCqvlk",
    "role": 1,
    "email": "kachyctt@gmail.com"
  },
  profile: {}
};

//    Use dictionary instead of switch statement in reducer
const dictionary = {
  [CONFIRM_LOGIN_STATUS]: (state, {
    payload
  }) => {
    // alert(payload);
    return {
      ...state,
      isLoggedIn: payload
    };
  },

  [STORE_LOGIN_INFORMATION]: (state, {
    payload
  }) => {
    console.log("STORE_LOGIN_INFORMATION " + JSON.stringify(payload));
    return {
      ...state,
      loginInfor: payload
    };
  },

  [REQUEST_FETCH_API]: (state, {
    payload
  }) => {
    //console.log("RequestFetchingAPI " + status);

    return payload ? {
        ...state,
        fetchStatus: payload
      } :
      state;
  },
};

export const loginReducer = baseReducer(initialState, dictionary);