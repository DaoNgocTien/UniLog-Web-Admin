import {combineReducers} from './../../../node_modules/redux';
// import  appReducer from './appReducer';
// import dataReducer from './dataReducer';
import {loginReducer as Login} from './loginReducer.js';
import {ServerReducer as Server} from './ServerReducer.js';
import {applicationReducer as Application} from "./applicationReducer.js";

export default combineReducers({
    // data: dataReducer,
    // app: appReducer,
    Login,
    Server,
    Application,

});