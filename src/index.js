import React from "react";
import ReactDOM from "react-dom";
//import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
// import { BrowserRouter, Switch} from "react-router-dom";

import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";
import "assets/css/style.css";
import App from "./App";
// import AdminLayout from "layouts/Admin.jsx";
// import AuthLayout from "layouts/Auth.jsx";
import { Provider } from "react-redux";
import { storeGlobal } from "./redux/Store/storeGlobal.js";

storeGlobal.subscribe(() => {
  console.log("State Change");
  console.log(storeGlobal.getState());
});

ReactDOM.render(
  <Provider store={storeGlobal}>
    <App />
  </Provider>,

  document.getElementById("root")
);

// ReactDOM.render(
//   <BrowserRouter>
//     <Switch>
//       <Route path="/admin" render={props => <AdminLayout {...props} />} />
//       <Route path="/auth" render={props => <AuthLayout {...props} />} />
//       <Redirect from="/" to="/admin/index" />
//     </Switch>
//   </BrowserRouter>,
//   document.getElementById("root")
// );
