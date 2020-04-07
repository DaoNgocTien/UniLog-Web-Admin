import {
    ApplicationInstanceActionTypes
  } from "../constants";
  import {
    baseReducer
  } from "./baseReducer";
  //  Action type destructor
  const {
    REQUEST_FETCH_API,
    // GET_APPLICATION_INSTANCE_LIST,
    STORE_APPLICATION_INSTANCE_LIST,
  
    TOGGLE_CREATE_APPLICATION_INSTANCE_MODAL,
    TOGGLE_INFORMATION_MODAL,
  
    STORE_CURRENT_SELECTED_APPLICATION_INSTANCE,
  
  } = ApplicationInstanceActionTypes;
  
  //  Get today
  // const today = new Date(Date.now());
  
  //  Initial state
  const initialState = {
    fetchStatus: true,
    currentDataList: [
        {
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
            "app": {
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
              "systems": null,
              "application_instance": [],
              "manage_project": [],
              "repo": []
            },
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
            "app": {
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
              "systems": null,
              "application_instance": [
                {
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
                }
              ],
              "manage_project": [],
              "repo": []
            },
            "log": [],
            "manage_project": []
          }
    ],
  
  
    toggleCreateModal: false,
    toggleInformationModal: false,
    currentSelectedApplicationInstance: 1,
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
  
    [STORE_APPLICATION_INSTANCE_LIST]: (state, {
      payload = []
    }) => {
      return payload.length > 0 ? {
          ...state,
          currentDataList: payload
        } :
        state;
    },
  
    [TOGGLE_CREATE_APPLICATION_INSTANCE_MODAL]: state => {
      ////console.log("ToggleCreateAPPLICATION_INSTANCE " + state);
  
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
  
    [STORE_CURRENT_SELECTED_APPLICATION_INSTANCE]: (state, {
      payload = 0
    }) => {
      return {
        ...state,
        currentSelectedApplicationInstance: payload
      };
    },

  }
  
  export const applicationInstanceReducer = baseReducer(initialState, dictionary);