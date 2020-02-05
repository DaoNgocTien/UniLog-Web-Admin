import { LoginActionTypes } from "../constants";
import fetch from "cross-fetch";
import APISettings from "../Url/APISettings";


const requestLoginFetch = requestFetching => {
  return {
    type: LoginActionTypes.REQUEST_POSTS,
    requestFetching: requestFetching
  };
};

// const receiveLoginAuthentication = (jwtToken, userID) => {
//   return {
//     type: LoginActionTypes.RECEIVE_LOGIN_AUTHENTICATION,
//     jwtToken: jwtToken,
//     userID: userID
//   };
// };

const checkLogin = (email, password) => {
  return async (dispatch, getState) => {
    await dispatch(requestLoginFetch(true));
    //if (getState().login.initialFetchingState.isFetching) {
    console.log("requestLoginFetch " + getState());
    let loginModel = {
      email: email,
      password: password
    };
    return fetch(`${APISettings.BASE_API_URL}/${APISettings.LOGIN_API_URL}`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginModel)
    })
      .then(
        response => response.json(),
        // console.log("checkLogin: " + JSON.stringify(response));
        // },
        error => {
          console.log("An error occurred.", error);
          dispatch(requestLoginFetch(false));
          Promise.resolve();
        }
      )
      .then(json => {
        console.log("getInfo: " + JSON.stringify(json));
        console.log(`bearer ${json.token}`);
        fetch(
          `${APISettings.BASE_API_URL}/${APISettings.ACCOUNT_API_URL}/${json.id}`,
          {
            method: "get",
            headers: { 
              "Content-Type": "application/json",
              "Authorization": `bearer ${json.token}`
             },
           
          }
        ).then(response => {
          console.log("Final info: " + JSON.stringify(response));
          return (
            response.json(),
            error => {
              console.log("An error occurred.", error);
              dispatch(requestLoginFetch(false));
              Promise.resolve();
            }
          );
        });
      });
    //}
  };
};

export default {
  checkLogin
};
