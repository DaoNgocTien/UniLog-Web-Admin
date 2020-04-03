import {
  ServerActionTypes
} from "../constants";
import {
  baseReducer
} from "./baseReducer";
//  Action type destructor
const {
  REQUEST_FETCH_API,
  STORE_SERVER_LIST,
  STORE_SERVER_MASTER_LIST,
  TOGGLE_CREATE_SERVER_MODAL,
  TOGGLE_INFORMATION_MODAL,
  STORE_CURRENT_SELECTED_SERVER,
  CREATE_NEW_SERVER,
  COUNT,

  APPLICATION_TEST,

} = ServerActionTypes;

//  Get today
const today = new Date(Date.now());

//  Initial state
const initialState = {
  count: 0,
  fetchStatus: true,
  currentDataList: [
    // {
    //   id: 1,
    //   active: true,
    //   server_master_registration: true,

    //   create_date: today.toISOString().slice(0, 23),
    //   description: "first server",
    //   expred_date: today.toISOString().slice(0, 23),
    //   ip_address: "192.168.1.1",
    //   server_name: "1st server",
    //   os: 2,
    //   server_code: "code",
    //   server_master: 1,
    //   link: "www.google.com",
    //   type: 2,
    //   update_date: today.toISOString().slice(0, 23)
    // },
    {
      "id": 1,
      "active": true,
      "create_time": "2020-03-06T13:25:23.36",
      "description": "string",
      "expired_date": null,
      "ip_address": "192.168.1.1",
      "name": "kachyctt",
      "os": 1,
      "server_code": "kachyctt",
      "server_master": null,
      "server_url": "google.com.vn",
      "type": 1,
      "update_time": "2020-03-06T00:00:00",
      "server_detail": {
        "id": 1,
        "active": true,
        "disk1": "A",
        "disk2": "B",
        "disk3": "C",
        "server_id": 1,
        "update_time": "2020-03-06T15:31:05.923",
        "volume_disk1": "100",
        "volume_disk2": "100",
        "volume_disk3": "100"
      },
      "server_master_navigation": null,
      "inverse_server_master_navigation": [],
      "repo": [],
      "server_account": [
        {
          "id": 1,
          "active": true,
          "password": "kachyctt",
          "server_id": 1,
          "username": "kachyctt"
        }
      ]
    },
    {
      "id": 2,
      "active": true,
      "create_time": "2020-03-06T14:00:42.38",
      "description": "string",
      "expired_date": null,
      "ip_address": "192.168.1.1",
      "name": "kachyctt1",
      "os": 1,
      "server_code": "kachyctt1",
      "server_master": null,
      "server_url": "google.com.vn",
      "type": 1,
      "update_time": "2020-03-06T00:00:00",
      "server_detail": {
        "id": 2,
        "active": true,
        "disk1": "D",
        "disk2": "E",
        "disk3": "F",
        "server_id": 2,
        "update_time": "2020-03-06T15:31:59.837",
        "volume_disk1": "100",
        "volume_disk2": "100",
        "volume_disk3": "100"
      },
      "server_master_navigation": null,
      "inverse_server_master_navigation": [],
      "repo": [],
      "server_account": [
        {
          "id": 2,
          "active": true,
          "password": "kachyctt1",
          "server_id": 2,
          "username": "kachyctt1"
        }
      ]
    }
  ],


  toggleCreateModal: false,
  toggleInformationModal: false,
  selectedID: 1,

  currentServerMasterList: [],
};

//    Use dictionary instead of switch statement in reducer
const dictionary = {
  [COUNT]: state => {
    return {
      ...state,
      count: state.count + 1
    };
  },

  [REQUEST_FETCH_API]: (state, payload) => {
    //console.log("RequestFetchingAPI " + status);

    return payload ? {
        ...state,
        fetchStatus: payload
      } :
      state;
  },

  [STORE_SERVER_LIST]: (state, {
    payload = []
  }) => {
    return payload.length > 0 ? {
        ...state,
        currentDataList: payload
      } :
      state;
  },

  [STORE_SERVER_MASTER_LIST]: (state, {
    payload = []
  }) => {
    //console.log("StoreServerMasterList " + JSON.stringify(list));
    return payload.length > 0 ? {
        ...state,
        currentServerMasterList: payload
      } :
      state;
  },

  [TOGGLE_CREATE_SERVER_MODAL]: state => {
    //console.log("ToggleCreateServer " + state);

    return {
      ...state,
      toggleCreateModal: !state.toggleCreateModal
    };
  },

  [TOGGLE_INFORMATION_MODAL]: state => {
    //console.log("ToggleInformation " + state);

    return {
      ...state,
      toggleInformationModal: !state.toggleInformationModal
    };
  },

  [STORE_CURRENT_SELECTED_SERVER]: (state, {
    payload = 0
  }) => {
    console.log("StoreCurrentSelectedServer ", payload);
    return {
      ...state,
      currentSelectedServer: payload
    };
  },

  [CREATE_NEW_SERVER]: (state, {
    payload
  }) => {
    console.log("CreateNewServer ", payload);
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

  [APPLICATION_TEST]: (state) => {
    return state;
  }
};

export const serverReducer = baseReducer(initialState, dictionary);