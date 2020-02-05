import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "./components/layouts/Admin";
import AuthLayout from "./components/layouts/Auth";
class App extends Component {
  // componentDidMount() {
  //   return (<div><Redirect exact="/" from="/" to="/auth/login" /></div>)
  // }

  render() {
    return (
      <div>
        
        <BrowserRouter>
          
          <Switch>
          {/* <AdminLayout /> */}
          {/* <Sidebar/> */}
             {/* <Redirect exact="/" from="/" to="/auth/login" />  */}
             <Redirect exact="/" from="/" to="/admin/index" /> 
            <Route path="/admin" render={props => <AdminLayout {...props} />} />
            <Route path="/auth" render={props => <AuthLayout {...props} />} />
          </Switch>
        </BrowserRouter>
        
      </div>
    );
  }
}

export default App;
