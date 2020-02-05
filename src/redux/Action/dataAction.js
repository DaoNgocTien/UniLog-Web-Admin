import { ActionTypes } from "./../constants";
import fetch from "cross-fetch";
export const checkLogin = (email, password) => {
  return (dispatch, getState) => {
    
  };
};

const searchByName = key => {
  return {
    type: ActionTypes.SEARCH_BY_NAME,
    key: key
  };
};

const addNewUser = user => {
  return {
    type: ActionTypes.Add_NEW_USER,
    user: user
  };
};

const getUserInfo = user => {
  return {
    type: ActionTypes.GET_USER_INFO,
    user: user
  };
};

const editUserInfo = user => {
  return {
    type: ActionTypes.EDIT_USER_INFO,
    newUserInfo: user
  };
};

const deleteUser = id => {
  return {
    type: ActionTypes.DELETE_USER,
    id: id
  };
};

export default {
  getDataFromAPI,
  searchByName,
  addNewUser,
  getUserInfo,
  editUserInfo,
  deleteUser
};
