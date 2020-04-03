import {
  ServerActionTypes
} from "../constants";
import fetch from "cross-fetch";
import APISettings from "../Url/APISettings";

// const today = new Date(Date.now());


//  Action creator section
const storeServerListActionCreator = (serverList = []) => {
  return {
    type: ServerActionTypes.STORE_SERVER_LIST,
    payload: serverList
  };
};

const storeServerMasterListActionCreator = (currentDataList = []) => {
  //console.log("storeServerMasterListActionCreator", currentDataList);
  let servermasterList = [];
  if (currentDataList.length > 0) {
    //console.log("storeServerMasterListActionCreator 2", currentDataList);
    currentDataList.map(server => {
      return servermasterList.push({
        id: server.id,
        name: server.name
      });
    });
  }

  return {
    type: ServerActionTypes.STORE_SERVER_MASTER_LIST,
    payload: servermasterList
  };
};

const storeCurrentSelectedServerActionCreater = id => {
  return {
    type: ServerActionTypes.STORE_CURRENT_SELECTED_SERVER,
    payload: id
  };
};

//  Interactive with reducer section
const requestGetDataFetch = status => {
  return {
    type: ServerActionTypes.REQUEST_FETCH_API,
    payload: status
  };
};

const getServerList = () => {
  return async (dispatch, getState) => {
    try {
      //  inform store we are going to fetch some data
      await dispatch(requestGetDataFetch(true));
      // if fetching status of Server component is true
      if (getState().Server.fetchStatus) {
        console.log("State: " + JSON.stringify(getState().Login.loginInfor.token));

        //  get list server from API
        const fetchRequest = await fetch(
          `${APISettings.BASE_API_URL}/${APISettings.SERVER_API_URL}/?ref_fields=server_detail%2Crepo%2Cserver_account`, {
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
        await dispatch(storeServerListActionCreator(result));

        //  store servers regist as server master
        await dispatch(
          storeServerMasterListActionCreator(getState().Server.currentDataList)
        );
      }
    } catch (error) {
      console.log("An error occurred in server action ", error);
    } finally {
      //  wherether call API success or fail, inform store fetching status request is done
      dispatch(requestGetDataFetch(false));
    }
  };
};

const toggleCreateServerModal = (dispatch, getState) => {
  return dispatch({
    type: ServerActionTypes.TOGGLE_CREATE_SERVER_MODAL
  });
};

const toggleServerInformationModal = dispatch => {
  return dispatch({
    type: ServerActionTypes.TOGGLE_INFORMATION_MODAL
  });
};

const storeCurrentSelectedServer = id => {
  return async (dispatch, getState) => {
    await dispatch(storeCurrentSelectedServerActionCreater(id));
  };
};

//  Create section
const createNewServer = ({
  name = "string",
  type = 1,
  os = 1,
  server_code = "string"
}) => {
  return async (dispatch, getState) => {
    try {
      //  inform store we are going to fetch some data
      await dispatch(requestGetDataFetch(true));

      // if fetching status of Server component is true
      if (getState().Server.fetchStatus) {
        let createModel = {
          name,
          type,
          os,
          server_code
        }

        console.log(createModel)
        //  call API to update general information 
        const fetchRequest = await fetch(
          `${APISettings.BASE_API_URL}/${APISettings.SERVER_API_URL}`, {
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
        const result = await fetchRequest.json();
        console.log(
          "Data after requesting get data: " + JSON.stringify(result)
        );

        //  store payloaddata into store
        await dispatch(storeServerListActionCreator(result));

        //  store servers regist as server master
        await dispatch(
          storeServerMasterListActionCreator(getState().Server.currentDataList)
        );
        // console.log(
        //   "State after requesting get data: " +
        //     JSON.stringify(getState().Server)
        // );
      }
    } catch (error) {
      console.log("An error occurred in server action ", error);
    } finally {
      //  wherether call API success or fail, inform store fetching status request is done
      dispatch(requestGetDataFetch(false));
      // console.log(
      //   "State after finish requesting fetch: " + JSON.stringify(getState().Server)
      // );
    }
  };
};

//  Update Server General Information
const updateServerGeneralInformation = ({
  id = 0,
  server_master = 0,
  name = "string",
  ip_address = "string",
  type = 0,
  os = 0,
  server_url = "string",
  description = "string",
  expire_date = new Date(Date.now()),
  server_code = "string"
}) => {
  return async (dispatch, getState) => {
    try {
      //  inform store we are going to fetch some data
      await dispatch(requestGetDataFetch(true));

      // if fetching status of Server component is true
      if (getState().Server.fetchStatus) {
        console.log("State: " + JSON.stringify(getState().Login.loginInfor.token));
        let updateModel = {
          id,
          server_master,
          name,
          ip_address,
          type,
          os,
          server_url,
          description,
          expire_date,
          server_code,
          server_detail: null,
        }


        //  call API to update general information 
        const fetchRequest = await fetch(
          `${APISettings.BASE_API_URL}/${APISettings.SERVER_API_URL}`, {
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

        //  store payloaddata into store
        await dispatch(storeServerListActionCreator(result));

        //  store servers regist as server master
        await dispatch(
          storeServerMasterListActionCreator(getState().Server.currentDataList)
        );
        // console.log(
        //   "State after requesting get data: " +
        //     JSON.stringify(getState().Server)
        // );
      }
    } catch (error) {
      console.log("An error occurred in server action ", error);
    } finally {
      //  wherether call API success or fail, inform store fetching status request is done
      dispatch(requestGetDataFetch(false));
      // console.log(
      //   "State after finish requesting fetch: " + JSON.stringify(getState().Server)
      // );
    }
  };
};

//  Update Server Status 
const updateServerStatus = (
  id = 0,
  active = true,
) => {
  return async (dispatch, getState) => {
    try {
      //  inform store we are going to fetch some data
      await dispatch(requestGetDataFetch(true));

      // if fetching status of Server component is true
      if (getState().Server.fetchStatus) {
        console.log("State: " + JSON.stringify(getState().Login.loginInfor.token));

        //  update server detail
        let updateModel = {
          id: id,
          active: active,
          change_status: true,
          server_detail: null
        }
        // let updateModel = {
        //   "client_id": 0,
        //   "service_id": 0
        // }

        const fetchRequest = await fetch(
          `${APISettings.BASE_API_URL}/${APISettings.SERVER_API_URL}`, {
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
        //   `${APISettings.BASE_API_URL}/${APISettings.SERVER_API_URL}/?ref_fields=server_detail%2Crepo%2Cserver_account`, {
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
        // await dispatch(storeServerListActionCreator(getResult));

        // //  store servers regist as server master
        // await dispatch(
        //   storeServerMasterListActionCreator(getState().Server.currentDataList)
        // );

      }
    } catch (error) {
      console.log("An error occurred in server action ", error);
    } finally {
      //  wherether call API success or fail, inform store fetching status request is done
      dispatch(requestGetDataFetch(false));
      //  recall getting server list after update
    }
  };
}

//  Update Server Detail 
const updateServerDetail = (
  server_detail_id = 0,
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

      // if fetching status of Server component is true
      if (getState().Server.fetchStatus) {
        console.log("State: " + JSON.stringify(getState().Login.loginInfor.token));

        //  update server detail
        let updateModel = {
          id: id,
          active: true,
          change_status: false,
          server_detail: {
            id: server_detail_id,
            server_id: id,
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
          `${APISettings.BASE_API_URL}/${APISettings.SERVER_API_URL}`, {
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
      console.log("An error occurred in server action ", error);
    } finally {
      //  wherether call API success or fail, inform store fetching status request is done
      dispatch(requestGetDataFetch(false));
    }
  };
}

//  Update Server Account 
const updateServerAccount = ({
  server_id = 0,
  username = "",
  password = ""
}) => {
  return async (dispatch, getState) => {
    try {
      //  inform store we are going to fetch some data
      await dispatch(requestGetDataFetch(true));

      // if fetching status of Server component is true
      if (getState().Server.fetchStatus) {
        console.log("State: " + JSON.stringify(getState().Login.loginInfor.token));

        //  update server account
        let updateModel = {
          "server_id": server_id,
          "username": username,
          "password": password
        }
        const fetchRequest = await fetch(
          `${APISettings.BASE_API_URL}/${APISettings.SERVER_ACCOUNT_URL}`, {
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
      console.log("An error occurred in server action ", error);
    } finally {
      //  wherether call API success or fail, inform store fetching status request is done
      dispatch(requestGetDataFetch(false));
    }
  };
}

export default {
  getData: getServerList,
  createNewServer: createNewServer,
  toggleCreateModal: toggleCreateServerModal,
  toggleInformationModal: toggleServerInformationModal,
  storeCurrentSelectedServer: storeCurrentSelectedServer,
  updateServerGeneralInformation: updateServerGeneralInformation,
  updateServerStatus: updateServerStatus,
  updateServerDetail: updateServerDetail,
  updateServerAccount: updateServerAccount,

};