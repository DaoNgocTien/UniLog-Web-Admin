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
    TOGGLE_CREATE_LOG_MODAL
} = LogActionTypes;

//  initial state
const initialState = {
    fetchStatus: false,
    currentDataList: [],
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
            currentDataList: payload
        } : state;
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