import {
  LoginActionTypes
} from "../constants";
import fetch from "cross-fetch";
import APISettings from "../Url/APISettings";

// const requestLoginFetch = requestFetching => {
//   return {
//     type: LoginActionTypes.REQUEST_POSTS,
//     requestFetching: requestFetching
//   };
// };

const confirmLoginStatusActionCreator = status => {
  return {
    type: LoginActionTypes.CONFIRM_LOGIN_STATUS,
    payload: status
  }
}

const storeLoginInformationActionCreator = info => {
  return {
    type: LoginActionTypes.STORE_LOGIN_INFORMATION,
    payload: info
  }
}

//  Interactive with reducer section
const requestGetDataFetch = status => {
  return {
    type: LoginActionTypes.REQUEST_FETCH_API,
    payload: status
  };
};


//  login
const login = ({
  email = "string",
  password = "string"
}) => {
  return async (dispatch, getState) => {
    try {
      //  inform store we are going to fetch some data
      await dispatch(requestGetDataFetch(true));

      // if fetching status of login component is true
      if (getState().Login.fetchStatus) {
        let loginModel = {
          email,
          password
        }


        //  call API to update general information 
        const fetchRequest = await fetch(
          `${APISettings.BASE_API_URL}/${APISettings.ACCOUNT_API_URL}/login`, {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(loginModel),
          }
        );
        console.log(
          "Response data after requesting get data: " +
          JSON.stringify(fetchRequest)
        );

        // the fetch() API only rejects a promise when
        //  a “network error is encountered, although this usually means permissions issues or similar.”
        //  =>  response have ok for other invalid HTTP response
        if (!fetchRequest.ok) {
          throw Error(fetchRequest.statusText);
        }
        if (fetchRequest.status === 401) {
          localStorage.clear();
          throw Error(fetchRequest.statusText);
        }

        //response data
        const result = await fetchRequest.json();

        localStorage.setItem("userRole", result.role);
        localStorage.setItem("userEmail", result.email);
        localStorage.setItem("userAuthToken", result.token);
        localStorage.setItem("userId", result.id);

        //  inform user is already login
        await dispatch(confirmLoginStatusActionCreator(1));

        //  store login infomation
        await dispatch(storeLoginInformationActionCreator(result));
      }
    } catch (error) {
      console.log("An error occurred in login action ", error);
    } finally {
      //  wherether call API success or fail, inform store fetching status request is done
      dispatch(requestGetDataFetch(false));
    }
  };
};

const logout = () => {
  return async (dispatch, getState) => {
    localStorage.clear();
    //  inform user is loggin
    await dispatch(confirmLoginStatusActionCreator(2));
  }
}
// const checkLogin = (state) => {
//   return async (dispatch, getState) => {
//     localStorage.clear();
//     //  inform user is loggin
//     await dispatch(confirmLoginStatusActionCreator(state));
//   }
// }

export default {
  login: login,
  logout: logout,
  // checkLogin: checkLogin
};