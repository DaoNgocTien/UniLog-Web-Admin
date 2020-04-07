import {
    EmployeeActionTypes
} from "../constants";
import {
    baseReducer
} from "./baseReducer";
//  Action type destructor
const {
    REQUEST_FETCH_API,
    // GET_EMPLOYEE_LIST,
    STORE_EMPLOYEE_LIST,

    TOGGLE_CREATE_EMPLOYEE_MODAL,
    TOGGLE_INFORMATION_MODAL,

    STORE_CURRENT_SELECTED_EMPLOYEE,

    CREATE_NEW_EMPLOYEE,

    // //  Update
    // UPDATE_EMPLOYEE_INFORMATION,
    // UPDATE_SYSTEM,
    // UPDATE_REPO,
    // UPDATE_EMPLOYEE_STATUS,

} = EmployeeActionTypes;

//  Get today
// const today = new Date(Date.now());

//  Initial state
const initialState = {
    fetchStatus: true,
    currentDataList: [{
        "id": 1,
        "active": true,
        "address": null,
        "asp_net_user_id": 6,
        "email": "string@gmail.com",
        "name": null,
        "phone": null,
        "role": 1,
        "asp_net_user": null,
        "manage_project": [{
                "id": 5,
                "account_id": 1,
                "application_id": 5,
                "application_instance_id": 1,
                "application": null,
                "application_instance": null
            },
            {
                "id": 6,
                "account_id": 1,
                "application_id": 5,
                "application_instance_id": 2,
                "application": null,
                "application_instance": null
            },
            {
                "id": 7,
                "account_id": 1,
                "application_id": 5,
                "application_instance_id": 3,
                "application": null,
                "application_instance": null
            },
            {
                "id": 8,
                "account_id": 1,
                "application_id": 1,
                "application_instance_id": 6,
                "application": null,
                "application_instance": null
            },
            {
                "id": 9,
                "account_id": 1,
                "application_id": 2,
                "application_instance_id": 6,
                "application": null,
                "application_instance": null
            }
        ]
    }, ],


    toggleCreateModal: false,
    toggleInformationModal: false,
    currentSelectedEmployee: 1,
};

//    Use dictionary instead of switch statement in reducer
const dictionary = {

    [REQUEST_FETCH_API]: (state, payload) => {
        ////console.log("RequestFetchingAPI " + status);

        return payload ? {
                ...state,
                fetchStatus: payload
            } :
            state;
    },

    [STORE_EMPLOYEE_LIST]: (state, {
        payload = []
    }) => {
        return payload.length > 0 ? {
                ...state,
                currentDataList: payload
            } :
            state;
    },

    [TOGGLE_CREATE_EMPLOYEE_MODAL]: state => {
        ////console.log("ToggleCreateEMPLOYEE " + state);

        return {
            ...state,
            toggleCreateModal: !state.toggleCreateModal
        };
    },

    [TOGGLE_INFORMATION_MODAL]: state => {
        ////console.log("ToggleInformation " + state);

        return {
            ...state,
            toggleInformationModal: !state.toggleInformationModal
        };
    },

    [STORE_CURRENT_SELECTED_EMPLOYEE]: (state, {
        payload = 0
    }) => {
        return {
            ...state,
            currentSelectedEmployee: payload
        };
    },

    [CREATE_NEW_EMPLOYEE]: (state, {
        payload
    }) => {
        //console.log("CreateNewEMPLOYEE ", payload);
        return {
            ...state,
            currentDataList: [
                ...state.currentDataList,
                {
                    ...payload,
                    id: state.currentDataList.length + 1
                }
            ]
        };
    },
}

export const employeeReducer = baseReducer(initialState, dictionary);