import {
    LogActionTypes
} from "../constants";
import {
    baseReducer
} from "./baseReducer";

//    Action type destructor
let {
    REQUEST_FETCH_API,
    STORE_LOG_LIST,
    TOGGLE_CREATE_LOG_MODAL,
    STORE_LOG_LIST_BASE_ON_APPLICATION_INSTANCE
} = LogActionTypes;

//  initial state
const initialState = {
    fetchStatus: false,
    currentDataList: [
        {
            "id": 40,
            "active": true,
            "app_code": "Kachy",
            "error_code_id": null,
            "file_name": "ApplicationInstancesController.cs:line 30",
            "line_code": 202,
            "log_date": "2020-04-06T19:45:19.747",
            "log_type": 3,
            "message": "The method or operation is not implemented.",
            "project_name": "Controllers",
            "serverity": 5,
            "app_code_navigation": null,
            "error_code": null
          },
     
    ],
    userChosenDataList: [
        {
            "id": 40,
            "active": true,
            "app_code": "Kachy",
            "error_code_id": null,
            "file_name": "ApplicationInstancesController.cs:line 30",
            "line_code": 202,
            "log_date": "2020-04-06T19:45:19.747",
            "log_type": 3,
            "message": "The method or operation is not implemented.",
            "project_name": "Controllers",
            "serverity": 5,
            "app_code_navigation": null,
            "error_code": null
          },
        
    ],
    toggleCreateModal: false,
};

const dictionary = {
    [REQUEST_FETCH_API]: (state, payload) => {
        return payload ? {
            ...state,
            fetchStatus: payload
        } : state;
    },

    [STORE_LOG_LIST]: (state, {
        payload = []
    }) => {
        return payload.length ? {
            ...state,
            currentDataList: payload,
            userChosenDataList: payload
        } : state;
    },

    [STORE_LOG_LIST_BASE_ON_APPLICATION_INSTANCE]: (state, {
        payload = []
    }) => {
        alert(payload.length);
        return {
            ...state,
            userChosenDataList: payload
        };
    },

    [TOGGLE_CREATE_LOG_MODAL]: state => {
        //console.log("ToggleInformation " + state);

        return {
            ...state,
            toggleCreateModal: !state.toggleCreateModal
        };
    },

}

export const logReducer = baseReducer(initialState, dictionary);