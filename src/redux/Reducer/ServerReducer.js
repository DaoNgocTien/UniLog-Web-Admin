import { ServerActionTypes } from "../constants";

const today = new Date(Date.now());
const FetchingInitialState = {
  count : 0,
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
      server_url: "www.google.com",
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
      server_url: "www.google.com",
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
      server_url: "www.google.com",
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
      server_url: "www.google.com",
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
      server_url: "www.google.com",
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
      server_url: "www.google.com",
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
      server_url: "www.google.com",
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
      server_url: "www.google.com",
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
      server_url: "www.google.com",
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
      server_url: "www.google.com",
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
      server_url: "www.google.com",
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
      server_url: "www.google.com",
      type: 3,
      update_date: today.toISOString().slice(0, 23)
    },
  ],
  currentServerMasterList: [],

  toggleCreateModal: false,
  toggleInformationModal: false,
  currentSelectedServer: 0
};
export const ServerReducer = (state = FetchingInitialState, action) => {
  console.log("ServerReducer",action.type);
  switch (action.type) {
    case ServerActionTypes.REQUEST_FETCH_API:
      return RequestFetchingAPI(state, action.payload);
    case ServerActionTypes.STORE_SERVER_LIST:
      return StoreServerList(state, action.payload);
    case ServerActionTypes.STORE_SERVER_MASTER_LIST:
      return StoreServerMasterList(state, action.payload);
    case ServerActionTypes.TOGGLE_CREATE_SERVER_MODAL:
      return ToggleCreateServer(state);
    case ServerActionTypes.TOGGLE_INFORMATION_MODAL:
      return ToggleInformation(state);
    case ServerActionTypes.STORE_CURRENT_SELECTED_SERVER:
      return StoreCurrentSelectedServer(state, action.payload);
    case ServerActionTypes.CREATE_NEW_SERVER:
      return CreateNewServer(state, action.payload);
    case ServerActionTypes.COUNT:
      return Count(state);
    default:
      return state;
  }
};

const Count = (state) => {
  alert(state.count);
  return  {
      ...state,
      count: state.count + 1
    };
}

const RequestFetchingAPI = (state, status) => {
  //console.log("RequestFetchingAPI " + status);

  return status
    ? {
        ...state,
        fetchStatus: status
      }
    : state;
};

const StoreServerList = (state, list = []) => {
  //console.log("StoreServerList " + JSON.stringify(list));
  return list.length > 0
    ? {
        ...state,
        currentDataList: list
      }
    : state;
};
const StoreServerMasterList = (state, list = []) => {
  //console.log("StoreServerMasterList " + JSON.stringify(list));
  return list.length > 0
    ? {
        ...state,
        currentServerMasterList: list
      }
    : state;
};

const ToggleCreateServer = state => {
  //console.log("ToggleCreateServer " + state);

  return {
    ...state,
    toggleCreateModal: !state.toggleCreateModal
  };
};

const ToggleInformation = state => {
  //console.log("ToggleInformation " + state);

  return {
    ...state,
    toggleInformationModal: !state.toggleInformationModal
  };
};

const StoreCurrentSelectedServer = (state, id = 0) => {
  console.log("StoreCurrentSelectedServer ", id);
  return {
    ...state,
    currentSelectedServer: id
  };
};

const CreateNewServer = (state, server) => {
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
};
