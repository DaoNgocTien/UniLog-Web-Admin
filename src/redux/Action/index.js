import LoginAction from "./LoginAction";
import ServerActions from "./ServerAction";
import ApplicationAction from "./ApplicationAction";
import RepoAction from "./RepoAction";
import SystemAction from "./SystemAction";
import LogAction from "./LogAction";
import ApplicationInstanceAction from "./ApplicationInstanceAction";
import EmployeeAction from "./EmployeeAction.js";
import ProfileAction from "./ProfileAction.js";

export default {
  Login: LoginAction,
  GetServerList: ServerActions.getDataDispatch,
  Server: ServerActions,
  Application: ApplicationAction,
  Repo: RepoAction,
  System: SystemAction,
  Log: LogAction,
  ApplicationInstance: ApplicationInstanceAction,
  Employee: EmployeeAction,
  Profile: ProfileAction,
};