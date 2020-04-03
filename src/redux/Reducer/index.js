import {combineReducers} from './../../../node_modules/redux';
import {loginReducer as Login} from './loginReducer.js';
import {serverReducer as Server} from './serverReducer.js';
import {applicationReducer as Application} from "./applicationReducer.js";
import {repoReducer as Repo} from "./repoReducer.js";
import {systemReducer as System} from "./systemReducer.js";
import {logReducer as Log} from "./logReducer.js";
import {applicationInstanceReducer as ApplicationInstance} from "./applicationInstanceReducer.js";
import {employeeReducer as Employee} from "./employeeReducer.js";
import {profileReducer as Profile} from "./profileReducer.js";

export default combineReducers({
    Login,
    Server,
    Application,
    Repo,
    System,
    Log,
    ApplicationInstance,
    Employee,
    Profile,
    
    
});