import {
    RepoActionTypes
} from "../constants";
import {
    baseReducer
} from "./baseReducer";

//    Action type destructor
let {
    REQUEST_FETCH_API,
    STORE_REPO_LIST,
} = RepoActionTypes;

//  initial state
const initialState = {
    fetchStatus: true,
    currentDataList: [],
};

const dictionary = {
    [REQUEST_FETCH_API]: (state, payload) => {
        return payload ? {
            ...state,
            fetchStatus: payload
        } : state;
    },

    [STORE_REPO_LIST]: (state, {
        payload = []
    }) => {
        return payload.length ? {
            ...state,
            currentDataList: payload
        } : state;
    }

}

export const repoReducer = baseReducer(initialState, dictionary);