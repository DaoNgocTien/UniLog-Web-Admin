import {
    ProfileActionTypes
} from "../constants";
import {
    baseReducer
} from "./baseReducer";
//  Action type destructor
const {
    REQUEST_FETCH_API,
    // GET_PROFILE_LIST,
    STORE_PROFILE,

    TOGGLE_CREATE_PROFILE_MODAL,
    TOGGLE_INFORMATION_MODAL,

    STORE_CURRENT_SELECTED_PROFILE,

    CREATE_NEW_PROFILE,

    // //  Update
    // UPDATE_PROFILE_INFORMATION,
    // UPDATE_SYSTEM,
    // UPDATE_REPO,
    // UPDATE_PROFILE_STATUS,
    //  LOGIN 
    LOGIN,
    REQUEST_RESET_PASSWORD,
    CHANGE_PASSWORD,

    //  TOGGLE PROFILE PAGE
    TOGGLE_PROFILE_COMPONENT,
} = ProfileActionTypes;

//  Get today
// const today = new Date(Date.now());

//  Initial state
const initialState = {
    fetchStatus: true,
    currentDataList: {
        "id": 15,
        "active": true,
        "address": "Q12, HCMC",
        "asp_net_user_id": 28,
        "email": "swd2020@gmail.com",
        "name": "Jesse",
        "phone": "0988388726",
        "role": 5,
        "asp_net_user": null,
        "manage_project": [
          {
            "id": 1056,
            "account_id": 15,
            "application_id": 2,
            "application_instance_id": 22,
            "application": null,
            "application_instance": null
          },
          {
            "id": 1057,
            "account_id": 15,
            "application_id": 3,
            "application_instance_id": 22,
            "application": null,
            "application_instance": null
          },
          {
            "id": 1058,
            "account_id": 15,
            "application_id": 1,
            "application_instance_id": 22,
            "application": null,
            "application_instance": null
          }
        ]
      },

    toggleProfileComponent: true,
    toggleCreateModal: false,
    toggleInformationModal: false,
    currentSelectedProfile: 1,
};

//    Use dictionary instead of switch statement in reducer
const dictionary = {

    [LOGIN]: (state, payload) => {
        ////console.log("RequestFetchingAPI " + status);
        alert("LOGIN");
        // return payload ? {
        //         ...state,
        //         fetchStatus: payload
        //     } :
        //     state;
    },

    [REQUEST_RESET_PASSWORD]: (state, payload) => {
        ////console.log("RequestFetchingAPI " + status);
        alert("REQUEST_RESET_PASSWORD");
        // return payload ? {
        //         ...state,
        //         fetchStatus: payload
        //     } :
        //     state;
    },

    [CHANGE_PASSWORD]: (state, payload) => {
        ////console.log("RequestFetchingAPI " + status);
        alert("CHANGE_PASSWORD");
        // return payload ? {
        //         ...state,
        //         fetchStatus: payload
        //     } :
        //     state;
    },

    [TOGGLE_PROFILE_COMPONENT]: (state, payload) => {
        return payload ? {
                ...state,
                toggleProfileComponent: !state.toggleProfileComponent
            } :
            state;
    },


    [REQUEST_FETCH_API]: (state, payload) => {
        //    alert("RequestFetchingAPI 2");

        return payload ? {
                ...state,
                fetchStatus: payload
            } :
            state;
    },

    [STORE_PROFILE]: (state, {
        payload
    }) => {
        // console.log("STORE_PROFILE " + JSON.stringify(payload));
        return payload ? {
                ...state,
                currentDataList: payload
            } :
            state;
    },

    [TOGGLE_CREATE_PROFILE_MODAL]: state => {
        ////console.log("ToggleCreateProfile " + state);

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

    [STORE_CURRENT_SELECTED_PROFILE]: (state, {
        payload = 0
    }) => {
        return {
            ...state,
            currentSelectedProfile: payload
        };
    },

    [CREATE_NEW_PROFILE]: (state, {
        payload
    }) => {
        //console.log("CreateNewProfile ", payload);
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

export const profileReducer = baseReducer(initialState, dictionary);