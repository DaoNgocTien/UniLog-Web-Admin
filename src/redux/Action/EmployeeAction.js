import {
    EmployeeActionTypes
} from "../constants";
import fetch from "cross-fetch";
import APISettings from "../Url/APISettings";

// const today = new Date(Date.now());


//  Action creator section
const storeEmployeeListActionCreator = (EmployeeList = []) => {
    return {
        type: EmployeeActionTypes.STORE_EMPLOYEE_LIST,
        payload: EmployeeList
    };
};

const storeCurrentSelectedEmployeeActionCreater = id => {
    return {
        type: EmployeeActionTypes.STORE_CURRENT_SELECTED_EMPLOYEE,
        payload: id
    };
};

//  Interactive with reducer section
const requestGetDataFetch = status => {
    return {
        type: EmployeeActionTypes.REQUEST_FETCH_API,
        payload: status
    };
};

const getEmployeeList = () => {
    return async (dispatch, getState) => {
        try {
            //  inform store we are going to fetch some data
            await dispatch(requestGetDataFetch(true));
            // if fetching status of Employee component is true
            if (getState().Employee.fetchStatus) {
                console.log("State: " + JSON.stringify(getState().Login.loginInfor.token));

                //  get list Employee from API
                const fetchRequest = await fetch(
                    `${APISettings.BASE_API_URL}/${APISettings.ACCOUNT_API_URL}?ref_fields=asp_net_user%2Cmanage_project`, {
                        method: "get",
                        headers: {
                            "Content-Type": "Employee/json",
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
                await dispatch(storeEmployeeListActionCreator(result));

            }
        } catch (error) {
            console.log("An error occurred in Employee action ", error);
        } finally {
            //  wherether call API success or fail, inform store fetching status request is done
            dispatch(requestGetDataFetch(false));
        }
    };
};

const toggleCreateEmployeeModal = (dispatch, getState) => {
    return dispatch({
        type: EmployeeActionTypes.TOGGLE_CREATE_EMPLOYEE_MODAL
    });
};

const toggleEmployeeInformationModal = dispatch => {
    return dispatch({
        type: EmployeeActionTypes.TOGGLE_INFORMATION_MODAL
    });
};

const storeCurrentSelectedEmployee = id => {
    return async (dispatch, getState) => {
        await dispatch(storeCurrentSelectedEmployeeActionCreater(id));
    };
};

//  Create section
const createNewEmployee = ({
    password = "string",
    confirm_password = "string",
    is_admin = false,
    email = "string.com.vn",
    address = "string",
    name = "string",
    phone = "099999999",
    manager_registration_token = "string",
    role = 5
}) => {
    return async (dispatch, getState) => {
        try {
            //  inform store we are going to fetch some data
            await dispatch(requestGetDataFetch(true));

            // if fetching status of Employee component is true
            if (getState().Employee.fetchStatus) {
                let createModel = {
                    password,
                    confirm_password,
                    is_admin: false,
                    email,
                    address,
                    name,
                    phone,
                    manager_registration_token: getState().Login.loginInfor.role && getState().Login.loginInfor.role === 1 ? "token_v2_7/2019" : "string",
                    role: getState().Login.loginInfor.role && getState().Login.loginInfor.role === 2 ? 3 : 5
                }

                console.log("createNewEmployee " + JSON.stringify(createModel));
                //  call API to update general information 
                const fetchRequest = await fetch(
                    `${APISettings.BASE_API_URL}/${APISettings.ACCOUNT_API_URL}/register`, {
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
                alert("Create successfully");
            }
        } catch (error) {

            alert("Wrong input");
            console.log("An error occurred in Employee action ", error);
        } finally {
            //  wherether call API success or fail, inform store fetching status request is done
            dispatch(requestGetDataFetch(false));
            // console.log(
            //   "State after finish requesting fetch: " + JSON.stringify(getState().Employee)
            // );
        }
    };
};

//  Request reseting pasword
const requestResetPassword = (
    email = "string.com.vn"
) => {
    return async (dispatch, getState) => {
        try {
            //  inform store we are going to fetch some data
            await dispatch(requestGetDataFetch(true));

            // if fetching status of Employee component is true
            if (getState().Employee.fetchStatus) {

                console.log("requestResetPassword " + email);
                //  call API to update general information 
                const fetchRequest = await fetch(
                    `${APISettings.BASE_API_URL}/${APISettings.ACCOUNT_API_URL}/reset?email=${email}`, {
                        method: "post",
                        headers: {
                            "Content-Type": "Application/json",
                        },
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
                alert("Request successfully");
            }
        } catch (error) {

            alert("Wrong email");
            console.log("An error occurred in Employee action ", error);
        } finally {
            //  wherether call API success or fail, inform store fetching status request is done
            dispatch(requestGetDataFetch(false));
            // console.log(
            //   "State after finish requesting fetch: " + JSON.stringify(getState().Employee)
            // );
        }
    };
};

//  Update Employee General Information
const updateEmployeeGeneralInformation = ({
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
            // if fetching status of Employee component is true
            if (getState().Employee.fetchStatus) {
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

                console.log("111111 " + JSON.stringify(updateModel));
                //  call API to update general information 
                const fetchRequest = await fetch(
                    `${APISettings.BASE_API_URL}/${APISettings.ACCOUNT_API_URL}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "Employee/json",
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
                // await dispatch(storeEmployeeListActionCreator(result));
                // console.log(
                //   "State after requesting get data: " +
                //     JSON.stringify(getState().Employee)
                // );
            }
        } catch (error) {
            console.log("An error occurred in Employee action ", error);
        } finally {
            //  wherether call API success or fail, inform store fetching status request is done
            dispatch(requestGetDataFetch(false));
            // console.log(
            //   "State after finish requesting fetch: " + JSON.stringify(getState().Employee)
            // );
        }
    };
};

//  Project assignment
const addEmployeeIntoProject = ({
    id = 0,
    application_id = 0,
    Application_instance_id = 0
}) => {
    return async (dispatch, getState) => {
        try {
            //  inform store we are going to fetch some data
            await dispatch(requestGetDataFetch(true));
            // if fetching status of Employee component is true
            if (getState().Employee.fetchStatus) {
                let createModel = {
                    id,
                    application_id,
                    Application_instance_id
                }
                console.log("addEmployeeIntoProject " + JSON.stringify(createModel));

                //  call API to update general information 
                const fetchRequest = await fetch(
                    `${APISettings.BASE_API_URL}/${APISettings.ACCOUNT_API_URL}/employee_assignment`, {
                        method: "patch",
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

            console.log("An error occurred in Employee action ", error);
        } finally {
            //  wherether call API success or fail, inform store fetching status request is done
            dispatch(requestGetDataFetch(false));
            // console.log(
            //   "State after finish requesting fetch: " + JSON.stringify(getState().Employee)
            // );
        }
    };
};

//  Update Employee Status 
const updateEmployeeStatus = (
    id = 0,
    active = true,
) => {
    return async (dispatch, getState) => {
        try {
            //  inform store we are going to fetch some data
            await dispatch(requestGetDataFetch(true));

            // if fetching status of Employee component is true
            if (getState().Employee.fetchStatus) {
                console.log("State: " + JSON.stringify(getState().Login.loginInfor.token));

                //  update Employee detail
                let updateModel = {
                    id: id,
                    active: active,
                    change_status: true,
                    Employee_detail: null
                }
                // let updateModel = {
                //   "client_id": 0,
                //   "service_id": 0
                // }

                const fetchRequest = await fetch(
                    `${APISettings.BASE_API_URL}/${APISettings.ACCOUNT_API_URL}`, {
                        mode: "cors",
                        method: "patch",
                        headers: {
                            Accept: 'Employee/json',
                            "Content-Type": "Employee/json",
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
                //   `${APISettings.BASE_API_URL}/${APISettings.ACCOUNT_API_URL}/?ref_fields=Employee_detail%2Crepo%2CEmployee_account`, {
                //     method: "get",
                //     headers: {
                //       "Content-Type": "Employee/json",
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
                // await dispatch(storeEmployeeListActionCreator(getResult));

                // //  store Employees regist as Employee master
                // await dispatch(
                //   storeEmployeeMasterListActionCreator(getState().Employee.currentDataList)
                // );

            }
        } catch (error) {
            console.log("An error occurred in Employee action ", error);
        } finally {
            //  wherether call API success or fail, inform store fetching status request is done
            dispatch(requestGetDataFetch(false));
            //  recall getting Employee list after update
        }
    };
}

//  Update Employee Detail 
const updateEmployeeDetail = (
    Employee_detail_id = 0,
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

            // if fetching status of Employee component is true
            if (getState().Employee.fetchStatus) {
                console.log("State: " + JSON.stringify(getState().Login.loginInfor.token));

                //  update Employee detail
                let updateModel = {
                    id: id,
                    active: true,
                    change_status: false,
                    Employee_detail: {
                        id: Employee_detail_id,
                        Employee_id: id,
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
                    `${APISettings.BASE_API_URL}/${APISettings.ACCOUNT_API_URL}`, {
                        method: "patch",
                        headers: {
                            "Content-Type": "Employee/json",
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
            console.log("An error occurred in Employee action ", error);
        } finally {
            //  wherether call API success or fail, inform store fetching status request is done
            dispatch(requestGetDataFetch(false));
        }
    };
}

//  Update Employee Account 
const updateEmployeeAccount = ({
    Employee_id = 0,
    username = "",
    password = ""
}) => {
    return async (dispatch, getState) => {
        try {
            //  inform store we are going to fetch some data
            await dispatch(requestGetDataFetch(true));

            // if fetching status of Employee component is true
            if (getState().Employee.fetchStatus) {
                console.log("State: " + JSON.stringify(getState().Login.loginInfor.token));

                //  update Employee account
                let updateModel = {
                    "Employee_id": Employee_id,
                    "username": username,
                    "password": password
                }
                const fetchRequest = await fetch(
                    `${APISettings.BASE_API_URL}/${APISettings.Employee_ACCOUNT_URL}`, {
                        method: "put",
                        headers: {
                            "Content-Type": "Employee/json",
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
            console.log("An error occurred in Employee action ", error);
        } finally {
            //  wherether call API success or fail, inform store fetching status request is done
            dispatch(requestGetDataFetch(false));
        }
    };
}

export default {
    getData: getEmployeeList,
    createNewEmployee: createNewEmployee,
    toggleCreateModal: toggleCreateEmployeeModal,
    toggleInformationModal: toggleEmployeeInformationModal,
    storeCurrentSelectedEmployee: storeCurrentSelectedEmployee,
    updateEmployeeGeneralInformation: updateEmployeeGeneralInformation,
    updateEmployeeStatus: updateEmployeeStatus,
    updateEmployeeDetail: updateEmployeeDetail,
    updateEmployeeAccount: updateEmployeeAccount,
    addEmployeeIntoProject: addEmployeeIntoProject,
    requestResetPassword: requestResetPassword,

};