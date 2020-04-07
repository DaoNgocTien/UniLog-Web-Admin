import {
  ApplicationActionTypes
} from "../constants";
import fetch from "cross-fetch";
import APISettings from "../Url/APISettings";

// const today = new Date(Date.now());


//  Action creator section
const storeApplicationListActionCreator = (ApplicationList = []) => {
  return {
    type: ApplicationActionTypes.STORE_APPLICATION_LIST,
    payload: ApplicationList
  };
};

const storeCurrentSelectedApplicationActionCreater = id => {
  return {
    type: ApplicationActionTypes.STORE_CURRENT_SELECTED_APPLICATION,
    payload: id
  };
};

//  Interactive with reducer section
const requestGetDataFetch = status => {
  return {
    type: ApplicationActionTypes.REQUEST_FETCH_API,
    payload: status
  };
};

const getApplicationList = () => {
  
  return async (dispatch, getState) => {
    try {
      //  inform store we are going to fetch some data
      await dispatch(requestGetDataFetch(true));
      // if fetching status of Application component is true
      if (getState().Application.fetchStatus) {
        console.log("State: " + JSON.stringify(getState().Login.loginInfor.token));

        //  get list Application from API
        const fetchRequest = await fetch(
          `${APISettings.BASE_API_URL}/${APISettings.APPLICATION_API_URL}?ref_fields=systems%2Crepo`, {
            method: "get",
            headers: {
              "Content-Type": "application/json",
              Authorization: "bearer " + getState().Login.loginInfor.token
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
          localStorage.clear();
          throw Error(fetchRequest.statusText);
        }
        //  response data
        const result = await fetchRequest.json();
        // console.log(
        //   "Data after requesting get data: " + JSON.stringify(result)
        // );

        //  store payload data into store
        await dispatch(storeApplicationListActionCreator(result));

      }
    } catch (error) {
      console.log("An error occurred in Application action ", error);
    } finally {
      //  wherether call API success or fail, inform store fetching status request is done
      dispatch(requestGetDataFetch(false));
    }
  };
};

const toggleCreateApplicationModal = (dispatch, getState) => {
  return dispatch({
    type: ApplicationActionTypes.TOGGLE_CREATE_APPLICATION_MODAL
  });
};

const toggleApplicationInformationModal = dispatch => {
  return dispatch({
    type: ApplicationActionTypes.TOGGLE_INFORMATION_MODAL
  });
};

const storeCurrentSelectedApplication = id => {
  return async (dispatch, getState) => {
    await dispatch(storeCurrentSelectedApplicationActionCreater(id));
  };
};

//  Create section
const createNewApplication = ({
  start_date = new Date(Date.now()),
  name = "string",
  category = 1,
  origin = "I",
  type = "N",
  priority = 1,
  status = 1
}) => {
  return async (dispatch, getState) => {
    try {
      //  inform store we are going to fetch some data
      await dispatch(requestGetDataFetch(true));

      // if fetching status of Application component is true
      if (getState().Application.fetchStatus) {
        let createModel = {
          start_date,
          name,
          category,
          origin,
          type,
          priority,
          status
        }

        console.log(createModel)
        //  call API to update general information 
        const fetchRequest = await fetch(
          `${APISettings.BASE_API_URL}/${APISettings.APPLICATION_API_URL}`, {
            method: "post",
            headers: {
              "Content-Type": "application/json",
              Authorization: "bearer " + getState().Login.loginInfor.token
            },
            body: JSON.stringify(createModel),
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
        // const result = await fetchRequest.json();
      }
    } catch (error) {
      console.log("An error occurred in Application action ", error);
    } finally {
      //  wherether call API success or fail, inform store fetching status request is done
      dispatch(requestGetDataFetch(false));
      // console.log(
      //   "State after finish requesting fetch: " + JSON.stringify(getState().Application)
      // );
    }
  };
};

//  Update Application General Information
const updateApplicationGeneralInformation = ({
  id = 0,
  system_id = 0,
  name = "string",
  description = "string",
  note = "string",
  start_date = new Date(Date.now()),
  end_date = new Date(Date.now()),
  category = 0,
  stage = 0,
  origin = "string",
  type = "string",
  source_code_url = "string",
  technologies = "string",
  priority = 0,
  status = 0
}) => {
  return async (dispatch, getState) => {
    try {
      //  inform store we are going to fetch some data
      await dispatch(requestGetDataFetch(true));
      // if fetching status of Application component is true
      if (getState().Application.fetchStatus) {
        console.log("State: " + JSON.stringify(getState().Login.loginInfor.token));
        let updateModel = {
          id,
          system_id,
          name,
          description,
          note,
          start_date,
          end_date,
          category,
          stage,
          origin,
          type,
          source_code_url,
          technologies,
          priority,
          status
        }

console.log("111111 " +JSON.stringify(updateModel));
        //  call API to update general information 
        const fetchRequest = await fetch(
          `${APISettings.BASE_API_URL}/${APISettings.APPLICATION_API_URL}`, {
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
        // const result = await fetchRequest.json();
        // console.log(
        //   "Data after requesting get data: " + JSON.stringify(result)
        // );

        //  store payloaddata into store
        // await dispatch(storeApplicationListActionCreator(result));
        // console.log(
        //   "State after requesting get data: " +
        //     JSON.stringify(getState().Application)
        // );
      }
    } catch (error) {
      console.log("An error occurred in Application action ", error);
    } finally {
      //  wherether call API success or fail, inform store fetching status request is done
      dispatch(requestGetDataFetch(false));
      // console.log(
      //   "State after finish requesting fetch: " + JSON.stringify(getState().Application)
      // );
    }
  };
};

//  Update Application Status 
const updateApplicationStatus = (
  id = 0,
  active = true,
) => {
  return async (dispatch, getState) => {
    try {
      //  inform store we are going to fetch some data
      await dispatch(requestGetDataFetch(true));

      // if fetching status of Application component is true
      if (getState().Application.fetchStatus) {
        console.log("State: " + JSON.stringify(getState().Login.loginInfor.token));

        //  update Application detail
        let updateModel = {
          id: id,
          active: active,
          change_status: true,
          Application_detail: null
        }
        // let updateModel = {
        //   "client_id": 0,
        //   "service_id": 0
        // }

        const fetchRequest = await fetch(
          `${APISettings.BASE_API_URL}/${APISettings.Application_API_URL}`, {
            mode: "cors",
            method: "patch",
            headers: {
              Accept: 'application/json',
              "Content-Type": "application/json",
              Authorization: "bearer " + getState().Login.loginInfor.token,
              // "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(updateModel)
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
          console.log(JSON.stringify(fetchRequest));
          throw Error(fetchRequest.statusText);
        }
        if (fetchRequest.status === 401) {
          localStorage.clear();
          throw Error(fetchRequest.statusText);
        }
        // const fetchGetRequest = await fetch(
        //   `${APISettings.BASE_API_URL}/${APISettings.Application_API_URL}/?ref_fields=Application_detail%2Crepo%2CApplication_account`, {
        //     method: "get",
        //     headers: {
        //       "Content-Type": "application/json",
        //       Authorization: "bearer " + getState().Login.loginInfor.token
        //     }
        //   }
        // );

        // // the fetch() API only rejects a promise when
        // //  a “network error is encountered, although this usually means permissions issues or similar.”
        // //  =>  response have ok for other invalid HTTP response
        // if (!fetchGetRequest.ok) {
        //   throw Error(fetchGetRequest.statusText);
        // }
        // if (fetchGetRequest.status === 401) {
        //   localStorage.clear();
        //   throw Error(fetchGetRequest.statusText);
        // }
        // //  response data
        // const getResult = await fetchGetRequest.json();
        // // console.log(
        // //   "Data after requesting get data: " + JSON.stringify(result)
        // // );

        // //  store payload data into store
        // await dispatch(storeApplicationListActionCreator(getResult));

        // //  store Applications regist as Application master
        // await dispatch(
        //   storeApplicationMasterListActionCreator(getState().Application.currentDataList)
        // );

      }
    } catch (error) {
      console.log("An error occurred in Application action ", error);
    } finally {
      //  wherether call API success or fail, inform store fetching status request is done
      dispatch(requestGetDataFetch(false));
      //  recall getting Application list after update
    }
  };
}

//  Update Application Detail 
const updateApplicationDetail = (
  Application_detail_id = 0,
  id = 0,
  disk1 = "",
  disk2 = "",
  disk3 = "",
  volume_disk1 = "",
  volume_disk2 = "",
  volume_disk3 = ""
) => {
  return async (dispatch, getState) => {
    try {
      //  inform store we are going to fetch some data
      await dispatch(requestGetDataFetch(true));

      // if fetching status of Application component is true
      if (getState().Application.fetchStatus) {
        console.log("State: " + JSON.stringify(getState().Login.loginInfor.token));

        //  update Application detail
        let updateModel = {
          id: id,
          active: true,
          change_status: false,
          Application_detail: {
            id: Application_detail_id,
            Application_id: id,
            disk1: disk1,
            volume_disk1: volume_disk1,
            disk2: disk2,
            volume_disk2: volume_disk2,
            disk3: disk3,
            volume_disk3: volume_disk3,
            active: true
          }
        }
        const fetchRequest = await fetch(
          `${APISettings.BASE_API_URL}/${APISettings.Application_API_URL}`, {
            method: "patch",
            headers: {
              "Content-Type": "application/json",
              Authorization: "bearer " + getState().Login.loginInfor.token
            },
            body: JSON.stringify(updateModel)
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
      }
    } catch (error) {
      console.log("An error occurred in Application action ", error);
    } finally {
      //  wherether call API success or fail, inform store fetching status request is done
      dispatch(requestGetDataFetch(false));
    }
  };
}

//  Update Application Account 
const updateApplicationAccount = ({
  Application_id = 0,
  username = "",
  password = ""
}) => {
  return async (dispatch, getState) => {
    try {
      //  inform store we are going to fetch some data
      await dispatch(requestGetDataFetch(true));

      // if fetching status of Application component is true
      if (getState().Application.fetchStatus) {
        console.log("State: " + JSON.stringify(getState().Login.loginInfor.token));

        //  update Application account
        let updateModel = {
          "Application_id": Application_id,
          "username": username,
          "password": password
        }
        const fetchRequest = await fetch(
          `${APISettings.BASE_API_URL}/${APISettings.Application_ACCOUNT_URL}`, {
            method: "put",
            headers: {
              "Content-Type": "application/json",
              Authorization: "bearer " + getState().Login.loginInfor.token
            },
            body: JSON.stringify(updateModel)
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
      }
    } catch (error) {
      console.log("An error occurred in Application action ", error);
    } finally {
      //  wherether call API success or fail, inform store fetching status request is done
      dispatch(requestGetDataFetch(false));
    }
  };
}

export default {
  getData: getApplicationList,
  createNewApplication: createNewApplication,
  toggleCreateModal: toggleCreateApplicationModal,
  toggleInformationModal: toggleApplicationInformationModal,
  storeCurrentSelectedApplication: storeCurrentSelectedApplication,
  updateApplicationGeneralInformation: updateApplicationGeneralInformation,
  updateApplicationStatus: updateApplicationStatus,
  updateApplicationDetail: updateApplicationDetail,
  updateApplicationAccount: updateApplicationAccount,

};