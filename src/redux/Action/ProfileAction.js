// import {
//   ApplicationActionTypes
// } from "../constants";
import {
  ProfileActionTypes
} from "../constants.js";
import Action from "../Action/index.js";
import fetch from "cross-fetch";
import APISettings from "../Url/APISettings";

// const today = new Date(Date.now());


//  Action creator section
const storeProfileActionCreator = (profile) => {
  return {
    type: ProfileActionTypes.STORE_PROFILE,
    payload: profile
  };
};

const toggleProfileComponentActionCreator = () => {
  return {
    type: ProfileActionTypes.TOGGLE_PROFILE_COMPONENT,
  };
}

//  Interactive with reducer section
const requestGetDataFetch = status => {
  return {
    type: ProfileActionTypes.TOGGLE_PROFILE_COMPONENT,
    payload: status
  };
};

const toggleProfileComponent = () => {

  return async (dispatch, getState) => {

    //  inform store we are going to fetch some data
    await dispatch(toggleProfileComponentActionCreator());


  };
}

//  Update Profile General Information
const updateProfile = ({
  id = 0,
  email = "string",
  address = "string",
  name = "string",
  phone = "string"
}) => {
  return async (dispatch, getState) => {
    try {
      //  inform store we are going to fetch some data
      await dispatch(requestGetDataFetch(true));

      // if fetching status of Profile component is true
      if (getState().Profile.fetchStatus) {
        console.log("State: " + JSON.stringify(getState().Login.loginInfor.token));
        let updateModel = {
          id,
          email,
          address,
          name,
          phone
        }


        //  call API to update general information 
        const fetchRequest = await fetch(
          `${APISettings.BASE_API_URL}/${APISettings.ACCOUNT_API_URL}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: "bearer " + getState().Login.loginInfor.token
            },
            body: JSON.stringify(updateModel),
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
        //  response data
        const result = await fetchRequest.json();
        console.log(
          "Data after requesting get data: " + JSON.stringify(result)
        );
      }
    } catch (error) {
      console.log("An error occurred in Profile action ", error);
    } finally {
      //  wherether call API success or fail, inform store fetching status request is done
      dispatch(requestGetDataFetch(false));
      // console.log(
      //   "State after finish requesting fetch: " + JSON.stringify(getState().Profile)
      // );
    }
  };
};

// Password section
const changePassword = ({
  email = "string",
  current_password = "",
  new_password = "string",
  confirm_password = "string",
  token = ""
}) => {
  return async (dispatch, getState) => {
    try {
      //  inform store we are going to fetch some data
      await dispatch(requestGetDataFetch(true));

      // if fetching status of Profile component is true
      if (getState().Profile.fetchStatus) {
        console.log("State: " + JSON.stringify(getState().Login.loginInfor.token));
        let updateModel = {
          email,
          current_password,
          new_password,
          confirm_password,
          token
        }

        //  call API to update general information 
        const fetchRequest = await fetch(
          `${APISettings.BASE_API_URL}/${APISettings.ACCOUNT_API_URL}/password_changing`, {
            method: "patch",
            headers: {
              "Content-Type": "application/json",
              Authorization: "bearer " + getState().Login.loginInfor.token
            },
            body: JSON.stringify(updateModel),
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
        if (fetchRequest.status === 400) {
          alert("Confirmed password is not match or user has been removed");
          throw Error(fetchRequest.statusText);
        }
        alert("Password has been changed successfully");
        //  response data
        const result = await fetchRequest.json();
        console.log(
          "Data after requesting get data: " + JSON.stringify(result)
        );
      }
    } catch (error) {
      console.log("An error occurred in Profile action ", error);
    } finally {
      //  wherether call API success or fail, inform store fetching status request is done
      dispatch(requestGetDataFetch(false));
      // console.log(
      //   "State after finish requesting fetch: " + JSON.stringify(getState().Profile)
      // );
    }
  };
};

const getProfile = (id = 0, token = "") => {
  return async (dispatch, getState) => {
    try {
      //  inform store we are going to fetch some data
      await dispatch(requestGetDataFetch(true));
      // if fetching status of Employee component is true
      if (getState().Employee.fetchStatus) {
        console.log("State: " + JSON.stringify(getState().Login.loginInfor.token));
        console.log("State: " + JSON.stringify(token));

        //  get list Employee from API
        const fetchRequest = await fetch(
          `${APISettings.BASE_API_URL}/${APISettings.ACCOUNT_API_URL}?ids=${id}&ref_fields=asp_net_user%2Cmanage_project`, {
            method: "get",
            headers: {
              "Content-Type": "Employee/json",
              Authorization: "bearer " + token ? token : getState().Login.loginInfor.token
            }
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
          Action.Login.logout();
          localStorage.clear();
          throw Error(fetchRequest.statusText);
        }
        //  response data
        const result = await fetchRequest.json();
        // console.log(
        //   "Data after requesting get data: " + JSON.stringify(result)
        // );

        //  store payload data into store
        await dispatch(storeProfileActionCreator(result[0]));
      }
    } catch (error) {
      console.log("An error occurred in Employee action ", error);
    } finally {
      //  wherether call API success or fail, inform store fetching status request is done
      dispatch(requestGetDataFetch(false));
    }
  };
};


const toggleProfileInformationModal = dispatch => {
  return dispatch({
    type: ProfileActionTypes.TOGGLE_INFORMATION_MODAL
  });
};
export default {
  getData: getProfile,
  toggleProfileComponent: toggleProfileComponent,
  updateProfile: updateProfile,

  toggleInformationModal: toggleProfileInformationModal,
  changePassword: changePassword
};