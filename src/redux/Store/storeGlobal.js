//import {createStore, applyMiddleware} from "react-redux";
import { createStore, applyMiddleware } from './../../../node_modules/redux';
import {createLogger} from "./../../../node_modules/redux-logger";

import rootReducer from "./../Reducer/index";
import thunkMiddleware from 'redux-thunk';
const logger = createLogger();

export const storeGlobal = createStore(
    rootReducer,
    applyMiddleware(
        logger, 
        thunkMiddleware
    )
);

