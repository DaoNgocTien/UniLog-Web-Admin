import {
    SystemActionTypes
} from "../constants";
import fetch from "cross-fetch";
import APISettings from "../Url/APISettings";


//  Action creator section
const storeSystemListActionCreator = (SystemList = []) => {
    return {
        type: SystemActionTypes.STORE_SYSTEM_LIST,
        payload: SystemList
    };
};

//  Interactive with reducer section
const requestGetDataFetch = status => {
    return {
        type: SystemActionTypes.REQUEST_FETCH_API,
        payload: status
    };
};

const getSystemList = () => {
    return async (dispatch, getState) => {
        try {
            //  inform store we are going to fetch some data
            await dispatch(requestGetDataFetch(true));
            // if fetching status of System component is true
            if (getState().System.fetchStatus) {
                console.log("State: " + JSON.stringify(getState().Login.loginInfor.token));

                //  get list System from API
                const fetchRequest = await fetch(
                    `${APISettings.BASE_API_URL}/${APISettings.SYSTEM_API_URL}`, {
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
                await dispatch(storeSystemListActionCreator(result));

            }
        } catch (error) {
            console.log("An error occurred in System action ", error);
        } finally {
            //  wherether call API success or fail, inform store fetching status request is done
            dispatch(requestGetDataFetch(false));
        }
    };
};

const createNewSystem = () => {
    return async (dispatch, getState) => {
        try {
            //  inform store we are going to fetch some data
            await dispatch(requestGetDataFetch(true));
            // if fetching status of System component is true
            if (getState().System.fetchStatus) {
                console.log("State: " + JSON.stringify(getState().Login.loginInfor.token));

                //  get list System from API
                const fetchRequest = await fetch(
                    `${APISettings.BASE_API_URL}/${APISettings.SYSTEM_API_URL}`, {
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
                await dispatch(storeSystemListActionCreator(result));

            }
        } catch (error) {
            console.log("An error occurred in System action ", error);
        } finally {
            //  wherether call API success or fail, inform store fetching status request is done
            dispatch(requestGetDataFetch(false));
        }
    };
};

const deleteSystem = (id = 0) => {
    return async (dispatch, getState) => {
        try {
            //  inform store we are going to fetch some data
            await dispatch(requestGetDataFetch(true));
            // if fetching status of System component is true
            if (getState().System.fetchStatus) {
                console.log("State: " + JSON.stringify(getState().Login.loginInfor.token));

                //  get list System from API
                const fetchRequest = await fetch(
                    `${APISettings.BASE_API_URL}/${APISettings.SYSTEM_API_URL}`, {
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
                await dispatch(storeSystemListActionCreator(result));

            }
        } catch (error) {
            console.log("An error occurred in System action ", error);
        } finally {
            //  wherether call API success or fail, inform store fetching status request is done
            dispatch(requestGetDataFetch(false));
        }
    };
};

export default {
    getData: getSystemList,
    createNewSystem: createNewSystem,
    deleteSystem: deleteSystem,

};