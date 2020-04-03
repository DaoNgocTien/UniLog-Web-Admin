import {
  ApplicationActionTypes
} from "../constants";
import {
  baseReducer
} from "./baseReducer";
//  Action type destructor
const {
  REQUEST_FETCH_API,
  // GET_APPLICATION_LIST,
  STORE_APPLICATION_LIST,

  TOGGLE_CREATE_APPLICATION_MODAL,
  TOGGLE_INFORMATION_MODAL,

  STORE_CURRENT_SELECTED_APPLICATION,

  CREATE_NEW_APPLICATION,

  // //  Update
  // UPDATE_APPLICATION_INFORMATION,
  // UPDATE_SYSTEM,
  // UPDATE_REPO,
  // UPDATE_APPLICATION_STATUS,

} = ApplicationActionTypes;

//  Get today
const today = new Date(Date.now());

//  Initial state
const initialState = {
  fetchStatus: true,
  currentDataList: [

    {
      "id": 1,
      "active": true,
      "category": 1,
      "create_time": "2020-03-11T00:00:00",
      "description": null,
      "efford": null,
      "end_date": null,
      "is_done": true,
      "name": "Log API",
      "note": null,
      "origin": "I",
      "priority": 1,
      "source_code_url": null,
      "stage": null,
      "start_date": "2020-03-11T00:00:00",
      "status": 1,
      "systems_id": 1,
      "team": null,
      "technologies": null,
      "type": "N",
      "update_time": "2020-03-12T00:00:00",
      "systems": {
        "id": 1,
        "active": true,
        "create_time": "2020-03-12T00:00:00",
        "description": "Log Record",
        "name": "Log Record",
        "update_time": "2020-03-12T00:00:00",
        "application": []
      },
      "application_instance": [{
          "id": 1,
          "active": true,
          "app_code": "number1",
          "app_id": 1,
          "application_version": null,
          "config_url": null,
          "create_time": "2020-03-12T00:00:00",
          "description": "string",
          "name": "Quan 1",
          "release_url": null,
          "update_time": "2020-03-12T00:00:00",
          "log": [],
          "manage_project": []
        },
        {
          "id": 2,
          "active": true,
          "app_code": "number2",
          "app_id": 1,
          "application_version": null,
          "config_url": null,
          "create_time": "2020-03-12T00:00:00",
          "description": "string",
          "name": "Quan 2",
          "release_url": null,
          "update_time": "2020-03-12T00:00:00",
          "log": [],
          "manage_project": []
        },
        {
          "id": 3,
          "active": true,
          "app_code": "number3",
          "app_id": 1,
          "application_version": null,
          "config_url": null,
          "create_time": "2020-03-12T00:00:00",
          "description": "string",
          "name": "Quan 3",
          "release_url": null,
          "update_time": "2020-03-12T00:00:00",
          "log": [],
          "manage_project": []
        },
        {
          "id": 4,
          "active": true,
          "app_code": "number4",
          "app_id": 1,
          "application_version": null,
          "config_url": null,
          "create_time": "2020-03-12T00:00:00",
          "description": "string",
          "name": "Quan 4",
          "release_url": null,
          "update_time": "2020-03-12T00:00:00",
          "log": [],
          "manage_project": []
        },
        {
          "id": 5,
          "active": true,
          "app_code": "number5",
          "app_id": 1,
          "application_version": null,
          "config_url": null,
          "create_time": "2020-03-12T00:00:00",
          "description": "string",
          "name": "Quan 5",
          "release_url": null,
          "update_time": "2020-03-12T00:00:00",
          "log": [],
          "manage_project": []
        }
      ],
      "application_relation_client": [{
          "id": 1,
          "client_id": 1,
          "service_id": 2,
          "service": null
        },
        {
          "id": 2,
          "client_id": 1,
          "service_id": 3,
          "service": null
        },
        {
          "id": 3,
          "client_id": 1,
          "service_id": 4,
          "service": null
        }
      ],
      "application_relation_service": [{
          "id": 4,
          "client_id": 2,
          "service_id": 1,
          "client": null
        },
        {
          "id": 9,
          "client_id": 3,
          "service_id": 1,
          "client": null
        },
        {
          "id": 10,
          "client_id": 4,
          "service_id": 1,
          "client": null
        }
      ],
      "manage_project": [],
      "repo": [{
        "id": 1,
        "active": true,
        "application_id": 1,
        "create_time": "2020-03-12T00:00:00",
        "name": "string",
        "note": "string",
        "repo_url": "string",
        "server_id": 1,
        "update_time": "2020-03-12T00:00:00",
        "server": null
      }]
    },
  ],


  toggleCreateModal: false,
  toggleInformationModal: false,
  currentSelectedApplication: 1,
};

//    Use dictionary instead of switch statement in reducer
const dictionary = {

  [REQUEST_FETCH_API]: (state, payload) => {
    // alert("RequestFetchingAPI ");

    return payload ? {
        ...state,
        fetchStatus: payload
      } :
      state;
  },

  [STORE_APPLICATION_LIST]: (state, {
    payload = []
  }) => {
    return payload.length > 0 ? {
        ...state,
        currentDataList: payload
      } :
      state;
  },

  [TOGGLE_CREATE_APPLICATION_MODAL]: state => {
    ////console.log("ToggleCreateAPPLICATION " + state);

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

  [STORE_CURRENT_SELECTED_APPLICATION]: (state, {
    payload = 0
  }) => {
    //    //console.log("StoreCurrentSelectedServer ", payload);
    return {
      ...state,
      currentSelectedApplication: payload
    };
  },

  [CREATE_NEW_APPLICATION]: (state, {
    payload
  }) => {
    //console.log("CreateNewAPPLICATION ", payload);
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

export const applicationReducer = baseReducer(initialState, dictionary);