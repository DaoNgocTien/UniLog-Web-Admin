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
} = LogActionTypes;

//  initial state
const initialState = {
    fetchStatus: false,
    currentDataList: [],
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
    }

}

export const logReducer = baseReducer(initialState, dictionary);