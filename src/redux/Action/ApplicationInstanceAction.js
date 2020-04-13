import {
  ApplicationInstanceActionTypes
} from "../constants";
import fetch from "cross-fetch";
import APISettings from "../Url/APISettings";

// const today = new Date(Date.now());


//  Action creator section
const storeApplicationInstanceListActionCreator = (ApplicationInstanceList = []) => {
  return {
    type: ApplicationInstanceActionTypes.STORE_APPLICATION_INSTANCE_LIST,
    payload: ApplicationInstanceList
  };
};

const storeCurrentSelectedApplicationInstanceActionCreater = id => {
  return {
    type: ApplicationInstanceActionTypes.STORE_CURRENT_SELECTED_APPLICATION_INSTANCE,
    payload: id
  };
};

//  Interactive with reducer section
const requestGetDataFetch = status => {
  return {
    type: ApplicationInstanceActionTypes.REQUEST_FETCH_API,
    payload: status
  };
};

const getApplicationInstanceList = () => {
  return async (dispatch, getState) => {
    try {
      //  inform store we are going to fetch some data
      await dispatch(requestGetDataFetch(true));
      // if fetching status of ApplicationInstance component is true
      if (getState().ApplicationInstance.fetchStatus) {
        console.log("State: " + JSON.stringify(getState().Login.loginInfor.token));

        //  get list ApplicationInstance from API
        const fetchRequest = await fetch(
          `${APISettings.BASE_API_URL}/${APISettings.APPLICATION_INSTANCE_API_URL}?ref_fields=app`, {
            method: "get",
            headers: {
              "Content-Type": "Application/json",
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
        let storeList = [];
        if (getState().Login.loginInfor.role !== 1) {
          if(getState().Login.loginInfor.role !== 2){
            getState().Login.loginInfor.manage_project.map(item => {
              result.map(instance => {
                console.log ("storeList " + item.application_instance_id + " " + instance.id);
                return item.application_instance_id === instance.id && item.application_instance_id !== 22 ?
                  storeList.push(instance) : null;
              })
            })
          }
          else {
            getState().Login.loginInfor.manage_project.map(item => {
              result.map(instance => {
                console.log ("storeList " + item.application_instance_id + " " + instance.id);
                return item.application_id === instance.app_id && item.application_id !== 22 ?
                  storeList.push(instance) : null;
              })
            })
          }          
        } else {
          storeList = result;
        }
        storeList.forEach(element => {
          console.log ("storeList aaa " + element.id);
        });
        await dispatch(storeApplicationInstanceListActionCreator(storeList));

      }
    } catch (error) {
      console.log("An error occurred in ApplicationInstance action ", error);
    } finally {
      //  wherether call API success or fail, inform store fetching status request is done
      dispatch(requestGetDataFetch(false));
    }
  };
};

const toggleCreateApplicationInstanceModal = (dispatch, getState) => {
  return dispatch({
    type: ApplicationInstanceActionTypes.TOGGLE_CREATE_APPLICATION_INSTANCE_MODAL
  });
};

const toggleApplicationInstanceInformationModal = dispatch => {
  return dispatch({
    type: ApplicationInstanceActionTypes.TOGGLE_INFORMATION_MODAL
  });
};

const storeCurrentSelectedApplicationInstance = id => {
  return async (dispatch, getState) => {
    await dispatch(storeCurrentSelectedApplicationInstanceActionCreater(id));
  };
};

//  Create section
const createNewApplicationInstance = ({
  app_code = "string",
  application_id = 0,
  name = "string"
}) => {
  return async (dispatch, getState) => {
    try {
      //  inform store we are going to fetch some data
      await dispatch(requestGetDataFetch(true));

      // if fetching status of ApplicationInstance component is true
      if (getState().ApplicationInstance.fetchStatus) {
        let createModel = {
          app_code,
          application_id,
          name
        }

        console.log(createModel)
        //  call API to update general information 
        const fetchRequest = await fetch(
          `${APISettings.BASE_API_URL}/${APISettings.APPLICATION_INSTANCE_API_URL}`, {
            method: "post",
            headers: {
              "Content-Type": "Application/json",
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
      }
    } catch (error) {
      console.log("An error occurred in ApplicationInstance action ", error);
    } finally {
      //  wherether call API success or fail, inform store fetching status request is done
      dispatch(requestGetDataFetch(false));
      // console.log(
      //   "State after finish requesting fetch: " + JSON.stringify(getState().ApplicationInstance)
      // );
    }
  };
};

//  Update ApplicationInstance General Information
const updateApplicationInstanceGeneralInformation = ({
  id = 0,
  application_version = 0,
  config_url = "string",
  description = "string",
  name = "string",
  release_url = "string",
  app_code = "string"
}) => {
  return async (dispatch, getState) => {
    try {
      //  inform store we are going to fetch some data
      await dispatch(requestGetDataFetch(true));
      // if fetching status of ApplicationInstance component is true
      if (getState().ApplicationInstance.fetchStatus) {
        console.log("State: " + JSON.stringify(getState().Login.loginInfor.token));
        let updateModel = {
          id,
          application_version,
          config_url,
          description,
          name,
          release_url,
          app_code
        }

        console.log("111111 " + JSON.stringify(updateModel));
        //  call API to update general information 
        const fetchRequest = await fetch(
          `${APISettings.BASE_API_URL}/${APISettings.APPLICATION_INSTANCE_API_URL}`, {
            method: "PUT",
            headers: {
              "Content-Type": "Application/json",
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
        // await dispatch(storeApplicationInstanceListActionCreator(result));
        // console.log(
        //   "State after requesting get data: " +
        //     JSON.stringify(getState().ApplicationInstance)
        // );
      }
    } catch (error) {
      console.log("An error occurred in ApplicationInstance action ", error);
    } finally {
      //  wherether call API success or fail, inform store fetching status request is done
      dispatch(requestGetDataFetch(false));
      // console.log(
      //   "State after finish requesting fetch: " + JSON.stringify(getState().ApplicationInstance)
      // );
    }
  };
};

//  Update ApplicationInstance Status 
const updateApplicationInstanceStatus = (
  id = 0,
  active = true,
) => {
  return async (dispatch, getState) => {
    try {
      //  inform store we are going to fetch some data
      await dispatch(requestGetDataFetch(true));

      // if fetching status of ApplicationInstance component is true
      if (getState().ApplicationInstance.fetchStatus) {
        console.log("State: " + JSON.stringify(getState().Login.loginInfor.token));

        //  update ApplicationInstance detail
        let updateModel = {
          id: id,
          active: active,
          change_status: true,
          APPLICATION_INSTANCE_detail: null
        }
        // let updateModel = {
        //   "client_id": 0,
        //   "service_id": 0
        // }

        const fetchRequest = await fetch(
          `${APISettings.BASE_API_URL}/${APISettings.APPLICATION_INSTANCE_API_URL}`, {
            mode: "cors",
            method: "patch",
            headers: {
              Accept: 'Application/json',
              "Content-Type": "Application/json",
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
        //   `${APISettings.BASE_API_URL}/${APISettings.APPLICATION_INSTANCE_API_URL}/?ref_fields=APPLICATION_INSTANCE_detail%2Crepo%2CAPPLICATION_INSTANCE_account`, {
        //     method: "get",
        //     headers: {
        //       "Content-Type": "Application/json",
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
        // await dispatch(storeApplicationInstanceListActionCreator(getResult));

        // //  store ApplicationInstances regist as ApplicationInstance master
        // await dispatch(
        //   storeApplicationInstanceMasterListActionCreator(getState().ApplicationInstance.currentDataList)
        // );

      }
    } catch (error) {
      console.log("An error occurred in ApplicationInstance action ", error);
    } finally {
      //  wherether call API success or fail, inform store fetching status request is done
      dispatch(requestGetDataFetch(false));
      //  recall getting ApplicationInstance list after update
    }
  };
}

//  Update ApplicationInstance Detail 
const updateApplicationInstanceDetail = (
  APPLICATION_INSTANCE_detail_id = 0,
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

      // if fetching status of ApplicationInstance component is true
      if (getState().ApplicationInstance.fetchStatus) {
        console.log("State: " + JSON.stringify(getState().Login.loginInfor.token));

        //  update ApplicationInstance detail
        let updateModel = {
          id: id,
          active: true,
          change_status: false,
          APPLICATION_INSTANCE_detail: {
            id: APPLICATION_INSTANCE_detail_id,
            APPLICATION_INSTANCE_id: id,
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
          `${APISettings.BASE_API_URL}/${APISettings.APPLICATION_INSTANCE_API_URL}`, {
            method: "patch",
            headers: {
              "Content-Type": "Application/json",
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
      console.log("An error occurred in ApplicationInstance action ", error);
    } finally {
      //  wherether call API success or fail, inform store fetching status request is done
      dispatch(requestGetDataFetch(false));
    }
  };
}

//  Update ApplicationInstance Account 
const updateApplicationInstanceAccount = ({
  APPLICATION_INSTANCE_id = 0,
  username = "",
  password = ""
}) => {
  return async (dispatch, getState) => {
    try {
      //  inform store we are going to fetch some data
      await dispatch(requestGetDataFetch(true));

      // if fetching status of ApplicationInstance component is true
      if (getState().ApplicationInstance.fetchStatus) {
        console.log("State: " + JSON.stringify(getState().Login.loginInfor.token));

        //  update ApplicationInstance account
        let updateModel = {
          "APPLICATION_INSTANCE_id": APPLICATION_INSTANCE_id,
          "username": username,
          "password": password
        }
        const fetchRequest = await fetch(
          `${APISettings.BASE_API_URL}/${APISettings.APPLICATION_INSTANCE_ACCOUNT_URL}`, {
            method: "put",
            headers: {
              "Content-Type": "Application/json",
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
      console.log("An error occurred in ApplicationInstance action ", error);
    } finally {
      //  wherether call API success or fail, inform store fetching status request is done
      dispatch(requestGetDataFetch(false));
    }
  };
}

export default {
  getData: getApplicationInstanceList,
  createNewApplicationInstance: createNewApplicationInstance,
  toggleCreateModal: toggleCreateApplicationInstanceModal,
  toggleInformationModal: toggleApplicationInstanceInformationModal,
  storeCurrentSelectedApplicationInstance: storeCurrentSelectedApplicationInstance,
  updateApplicationInstanceGeneralInformation: updateApplicationInstanceGeneralInformation,
  updateApplicationInstanceStatus: updateApplicationInstanceStatus,
  updateApplicationInstanceDetail: updateApplicationInstanceDetail,
  updateApplicationInstanceAccount: updateApplicationInstanceAccount,

};