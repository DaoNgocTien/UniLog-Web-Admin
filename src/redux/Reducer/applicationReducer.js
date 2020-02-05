import { ServerActionTypes } from "../constants";
import { baseReducer } from "./baseReducer";
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
const FetchingInitialState = {
  count: 0,
  fetchStatus: true,
  currentDataList: [
    {
      id: 1,
      active: true,
      server_master_registration: true,
      company_id: 1,
      create_date: today.toISOString().slice(0, 23),
      description: "first server",
      expred_date: today.toISOString().slice(0, 23),
      ip_address: "192.168.1.1",
      server_name: "1st server",
      os: 2,
      server_code: "code",
      server_master: 1,
      link: "www.google.com",
      type: 2,
      update_date: today.toISOString().slice(0, 23)
    },
    {
      id: 2,
      active: true,
      server_master_registration: true,
      company_id: 1,
      create_date: today.toISOString().slice(0, 23),
      description: "second server",
      expred_date: today.toISOString().slice(0, 23),
      ip_address: "192.168.1.2",
      server_name: "2nd server",
      os: 3,
      server_code: "code",
      server_master: 1,
      link: "www.google.com",
      type: 3,
      update_date: today.toISOString().slice(0, 23)
    },
    {
      id: 2,
      active: true,
      server_master_registration: true,
      company_id: 1,
      create_date: today.toISOString().slice(0, 23),
      description: "second server",
      expred_date: today.toISOString().slice(0, 23),
      ip_address: "192.168.1.2",
      server_name: "2nd server",
      os: 3,
      server_code: "code",
      server_master: 1,
      link: "www.google.com",
      type: 3,
      update_date: today.toISOString().slice(0, 23)
    },
    {
      id: 2,
      active: true,
      server_master_registration: true,
      company_id: 1,
      create_date: today.toISOString().slice(0, 23),
      description: "second server",
      expred_date: today.toISOString().slice(0, 23),
      ip_address: "192.168.1.2",
      server_name: "2nd server",
      os: 3,
      server_code: "code",
      server_master: 1,
      link: "www.google.com",
      type: 3,
      update_date: today.toISOString().slice(0, 23)
    },
    {
      id: 2,
      active: true,
      server_master_registration: true,
      company_id: 1,
      create_date: today.toISOString().slice(0, 23),
      description: "second server",
      expred_date: today.toISOString().slice(0, 23),
      ip_address: "192.168.1.2",
      server_name: "2nd server",
      os: 3,
      server_code: "code",
      server_master: 1,
      link: "www.google.com",
      type: 3,
      update_date: today.toISOString().slice(0, 23)
    },
    {
      id: 2,
      active: true,
      server_master_registration: true,
      company_id: 1,
      create_date: today.toISOString().slice(0, 23),
      description: "second server",
      expred_date: today.toISOString().slice(0, 23),
      ip_address: "192.168.1.2",
      server_name: "2nd server",
      os: 3,
      server_code: "code",
      server_master: 1,
      link: "www.google.com",
      type: 3,
      update_date: today.toISOString().slice(0, 23)
    },
    {
      id: 2,
      active: true,
      server_master_registration: true,
      company_id: 1,
      create_date: today.toISOString().slice(0, 23),
      description: "second server",
      expred_date: today.toISOString().slice(0, 23),
      ip_address: "192.168.1.2",
      server_name: "2nd server",
      os: 3,
      server_code: "code",
      server_master: 1,
      link: "www.google.com",
      type: 3,
      update_date: today.toISOString().slice(0, 23)
    },
    {
      id: 2,
      active: true,
      server_master_registration: true,
      company_id: 1,
      create_date: today.toISOString().slice(0, 23),
      description: "second server",
      expred_date: today.toISOString().slice(0, 23),
      ip_address: "192.168.1.2",
      server_name: "2nd server",
      os: 3,
      server_code: "code",
      server_master: 1,
      link: "www.google.com",
      type: 3,
      update_date: today.toISOString().slice(0, 23)
    },
    {
      id: 2,
      active: true,
      server_master_registration: true,
      company_id: 1,
      create_date: today.toISOString().slice(0, 23),
      description: "second server",
      expred_date: today.toISOString().slice(0, 23),
      ip_address: "192.168.1.2",
      server_name: "2nd server",
      os: 3,
      server_code: "code",
      server_master: 1,
      link: "www.google.com",
      type: 3,
      update_date: today.toISOString().slice(0, 23)
    },
    {
      id: 2,
      active: true,
      server_master_registration: true,
      company_id: 1,
      create_date: today.toISOString().slice(0, 23),
      description: "second server",
      expred_date: today.toISOString().slice(0, 23),
      ip_address: "192.168.1.2",
      server_name: "2nd server",
      os: 3,
      server_code: "code",
      server_master: 1,
      link: "www.google.com",
      type: 3,
      update_date: today.toISOString().slice(0, 23)
    },
    {
      id: 2,
      active: true,
      server_master_registration: true,
      company_id: 1,
      create_date: today.toISOString().slice(0, 23),
      description: "second server",
      expred_date: today.toISOString().slice(0, 23),
      ip_address: "192.168.1.2",
      server_name: "2nd server",
      os: 3,
      server_code: "code",
      server_master: 1,
      link: "www.google.com",
      type: 3,
      update_date: today.toISOString().slice(0, 23)
    },
    {
      id: 2,
      active: true,
      server_master_registration: true,
      company_id: 1,
      create_date: today.toISOString().slice(0, 23),
      description: "second server",
      expred_date: today.toISOString().slice(0, 23),
      ip_address: "192.168.1.2",
      server_name: "2nd server",
      os: 3,
      server_code: "code",
      server_master: 1,
      link: "www.google.com",
      type: 3,
      update_date: today.toISOString().slice(0, 23)
    }
  ],
  currentServerMasterList: [],

  toggleCreateModal: false,
  toggleInformationModal: false,
  currentSelectedServer: 0
};

//    Use dictionary instead of switch statement in reducer
const dictionary = {
  [COUNT]: state => {
    alert(state.count);
    return {
      ...state,
      count: state.count + 1
    };
  },

  [REQUEST_FETCH_API]: (state, status) => {
    //console.log("RequestFetchingAPI " + status);

    return status
      ? {
          ...state,
          fetchStatus: status
        }
      : state;
  },

  [STORE_SERVER_LIST]: (state, list = []) => {
    //console.log("StoreServerList " + JSON.stringify(list));
    return list.length > 0
      ? {
          ...state,
          currentDataList: list
        }
      : state;
  },

  [STORE_SERVER_MASTER_LIST]: (state, list = []) => {
    //console.log("StoreServerMasterList " + JSON.stringify(list));
    return list.length > 0
      ? {
          ...state,
          currentServerMasterList: list
        }
      : state;
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

  [STORE_CURRENT_SELECTED_SERVER]: (state, id = 0) => {
    console.log("StoreCurrentSelectedServer ", id);
    return {
      ...state,
      currentSelectedServer: id
    };
  },

  [CREATE_NEW_SERVER]: (state, server) => {
    console.log("CreateNewServer ", server);
    return {
      ...state,
      currentDataList: [
        ...state.currentDataList,
        {
          ...server,
          id: state.currentDataList.length + 1
        }
      ]
    };
  },

  [APPLICATION_TEST]: (state) => {
      alert("Application Test");
      return state;
  }
};

export const applicationReducer = baseReducer(FetchingInitialState, dictionary);
