import loginAction from "./loginAction";
import ServerActions from "./ServerAction";
import ApplicationAction from "./ApplicationAction";

export default {
  checkLogin: loginAction.checkLogin,
  GetServerList: ServerActions.getDataDispatch,
  Server: ServerActions,
  Application: ApplicationAction,
  
};
