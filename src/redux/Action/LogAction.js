import {
    LogActionTypes
} from "../constants";
import fetch from "cross-fetch";
import APISettings from "../Url/APISettings";


//  Action creator section
const storeLogListActionCreator = (LogList = []) => {
    return {
        type: LogActionTypes.STORE_LOG_LIST,
        payload: LogList
    };
};
const storeLogListBaseOnApplicationInstanceActionCreator = (LogList = []) => {
    return {
        type: LogActionTypes.STORE_LOG_LIST_BASE_ON_APPLICATION_INSTANCE,
        payload: LogList
    };
};

//  Interactive with reducer section
const requestGetDataFetch = status => {
    return {
        type: LogActionTypes.REQUEST_FETCH_API,
        payload: status
    };
};

const getLogList = (id = 0) => {
    return async (dispatch, getState) => {
        try {
            //  inform store we are going to fetch some data
            await dispatch(requestGetDataFetch(true));

            // if fetching status of Log component is true
            if (getState().Log.fetchStatus) {
                //  get list Log from API
                const link = id === 0 ?
                    `${APISettings.BASE_API_URL}/${APISettings.LOG_API_URL}` :
                    `${APISettings.BASE_API_URL}/${APISettings.LOG_API_URL}?serverity=${id}`;
                console.log("getLogList " + link);
                const fetchRequest = await fetch(
                    link, {
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
                // let storeList = [];
                // if (getState().Login.loginInfor.role !== 1) {
                //   getState().Login.loginInfor.manage_project.map(item => {
                //     result.map(log => {
                //       return item.application_instance_id === instance.id && item.application_instance_id !== 22 ?
                //         storeList.push(instance) : null;
                //     })
                //   })
                // } else {
                //   storeList = result;
                // }
                await dispatch(storeLogListActionCreator(result));

            }
        } catch (error) {
            console.log("An error occurred in Log action ", error);
        } finally {
            //  wherether call API success or fail, inform store fetching status request is done
            dispatch(requestGetDataFetch(false));
        }
    };
};

const getLogListBaseOnApplicationInstance = (app_code = "Kachy") => {
    return async (dispatch, getState) => {
        let currentLogData = getState().Log.currentDataList ? getState().Log.currentDataList : [];
        let newList = currentLogData.filter((item, index) => {
            return item.app_code === app_code;
        });
        await dispatch(storeLogListBaseOnApplicationInstanceActionCreator(newList));
    };
};

const createNewLog = ({
    server_id = 1,
    name = "new Logsitory",
    application_id = 1,
    Log_url = "google.com.vn",
    note = "string"
}) => {
    return async (dispatch, getState) => {
        try {
            //  inform store we are going to fetch some data
            await dispatch(requestGetDataFetch(true));

            // if fetching status of Server component is true
            if (getState().Server.fetchStatus) {
                let createModel = {
                    server_id,
                    name,
                    application_id,
                    Log_url,
                    note
                }
                console.log(createModel)
                //  call API to update general information 
                const fetchRequest = await fetch(
                    `${APISettings.BASE_API_URL}/${APISettings.LOG_API_URL}`, {
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

const deleteLog = (id = 0) => {
    return async (dispatch, getState) => {
        try {
            //  inform store we are going to fetch some data
            await dispatch(requestGetDataFetch(true));
            // if fetching status of Log component is true
            if (getState().Log.fetchStatus) {
                console.log("State: " + JSON.stringify(getState().Login.loginInfor.token));

                //  get list Log from API
                const fetchRequest = await fetch(
                    `${APISettings.BASE_API_URL}/${APISettings.LOG_API_URL}`, {
                        method: "delete",
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
                await dispatch(storeLogListActionCreator(result));

            }
        } catch (error) {
            console.log("An error occurred in Log action ", error);
        } finally {
            //  wherether call API success or fail, inform store fetching status request is done
            dispatch(requestGetDataFetch(false));
        }
    };
};

const toggleCreateModal = dispatch => {
    return dispatch({
        type: LogActionTypes.TOGGLE_CREATE_LOG_MODAL
    });
};

const updateLogStatus = (id, active) => {
    return async (dispatch, getState) => {
        try {
            //  inform store we are going to fetch some data
            await dispatch(requestGetDataFetch(true));

            // if fetching status of Log component is true
            if (getState().Log.fetchStatus) {
                let updateModel = {
                    id,
                    active
                  }
          
                //  get list Log from API
                const link = 
                    `${APISettings.BASE_API_URL}/${APISettings.LOG_API_URL}`;
                console.log("getLogList " + link);
                const fetchRequest = await fetch(
                    link, {
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
                //  response data
                const result = await fetchRequest.json();
                // console.log(
                //   "Data after requesting get data: " + JSON.stringify(result)
                // );

                //  store payload data into store
                await dispatch(storeLogListActionCreator(result));

            }
        } catch (error) {
            console.log("An error occurred in Log action ", error);
        } finally {
            //  wherether call API success or fail, inform store fetching status request is done
            dispatch(requestGetDataFetch(false));
        }
    };
}
export default {
    getData: getLogList,
    getChosenData : getLogListBaseOnApplicationInstance,
    createNewLog: createNewLog,
    deleteLog: deleteLog,
    toggleCreateModal: toggleCreateModal,
    updateLogStatus: updateLogStatus
};