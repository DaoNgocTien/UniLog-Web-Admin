import React, {
  Component
} from "react";
import "./App.css";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import NotFound from "./components/contents/404NotFound/NotFound";
import AdminLayout from "./components/layouts/Admin";
import AuthLayout from "./components/layouts/Auth";

//  set up proptype
import PropTypes from "prop-types";
//  redux component
//  set up redux
import {
  connect
} from "react-redux";
import {
  withRouter
} from "react-router-dom";
import Action from "./redux/Action/index.js";
import Logout from "./components/contents/views/Logout.jsx";

const uuidv1 = require("uuid/v1");
//  compose function:
//  - (...fns): array all function need to compose
//  - x: collection / input value
//  - reduceRight: array loop function, from right to left (last -> last - 1 -> last - 2 -> ...)
//  =>  (y, f) => f(y), x === (previousValue, currentFunction) => currentFunction(previousValue), x
//  =>  take last function in collectionFunction fns, use innitial value x, return value (y)
//  =>  [a, b, c] => reduceRight((y, f) => f(y), x) === a(b(c))
const compose = (...fns) => x => fns.reduceRight((y, f) => f(y), x);

//  propType
const propsProTypes = {};

const propsDefault = {};

class App extends Component {
  static propTypes = propsProTypes;
  static defaultProps = propsDefault;
  state = {
    tableData: []
  };
  render() {
    // alert( this.props.isLoggedIn);
    return (
      <div>        
        <BrowserRouter>
        
        <Switch>
          
           {/* <Redirect exact="/" from="/auth" to="/auth/login" />  */}
           {/* <Redirect exact="/" from="/" to="/auth/login" /> 
           <Redirect exact="/" from="/admin" to="/auth/login" />  */}
          {
            this.props.isLoggedIn === 1 ?
            <div>
              <Redirect exact="/" from="/admin" to="/admin/index" />  
              <Redirect exact="/" from="/" to="/admin/index" /> 
              <Redirect exact="/" from="/auth" to="/admin/index" /> 
              <Route path="/admin" render={props => <AdminLayout {...props} />} />
            </div>
            :
            this.props.isLoggedIn === 2 ?
            <div>
              {/* <Redirect exact="/" from="/auth" to="/auth/login" />   */}
              <Redirect exact="/" from="/" to="/auth/login" /> 
              <Redirect exact="/" from="/admin" to="/auth/login" />  
              <Redirect exact="/" from="/auth" to="/auth/login" /> 
              <Route path="/auth" render={props => <AuthLayout {...props} />} />
            </div>
            :
            <Route component={NotFound} />
          }
          
        </Switch>
      </BrowserRouter>
      
    </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isLoggedIn: state.Login.isLoggedIn,
    own: ownProps
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({

  dispatch
});

//  compose all redux HOC
const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps, null)
);

export default enhance(App);