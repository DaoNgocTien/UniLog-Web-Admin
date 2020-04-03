import React, {
  Component
} from "react";
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
import Action from "../../../redux/Action/index.js";
//  presentation component
import ServerRegistrationModal from "./ServerRegistrationModal.jsx";
// const uuidv1 = require("uuid/v1");
//  compose function:
//  - (...fns): array all function need to compose
//  - x: collection / input value
//  - reduceRight: array loop function, from right to left (last -> last - 1 -> last - 2 -> ...)
//  =>  (y, f) => f(y), x === (previousValue, currentFunction) => currentFunction(previousValue), x
//  =>  take last function in collectionFunction fns, use innitial value x, return value (y)
//  =>  [a, b, c] => reduceRight((y, f) => f(y), x) === a(b(c))
const compose = (...fns) => x => fns.reduceRight((y, f) => f(y), x);

//  Validation secction
//  General information validation
//  Server Code 
const validateServerCode = ({
  serverCode
}) => {
  return serverCode ? serverCode.length <= 10 && serverCode.length >= 0 : false;
};
//  Server Name 
const validateServerName = ({
  serverName
}) => {
  return serverName ? serverName.length <= 10 && serverName.length >= 0 : false;
};
//  Server Type 
const validateServerTypeAndOS = ({
  serverTypeSelect = 1,
  serverOsSelect = 1
}) => {
  let type = typeof (serverTypeSelect) == "string" ? parseInt(serverTypeSelect) : serverTypeSelect;
  let os = typeof (serverOsSelect) == "string" ? parseInt(serverOsSelect) : serverOsSelect;
  console.log("type ", typeof (type) + type);
  console.log("os ", typeof (os) + os);
  if (
    (type === 1 || type === 2) &&
    os > 2
  ) {
    console.log("false 1");
    return false;
  }
  if (type === 3 && (os < 3 || os > 6)) {
    console.log("false 2");
    return false;
  }
  if (type === 4 && (os < 7 || os > 10)) {
    console.log("false 3");
    return false;
  }
  console.log("true");
  return true;
};
//  Server OS 



//  propType
const propsProTypes = {
  modal: PropTypes.bool,
  // toggleInformationModal: PropTypes.func

  //  validation func
  //validation: PropTypes.bool,
  validateServerCode: PropTypes.func,
  validateServerName: PropTypes.func,
  validateServerTypeAndOS: PropTypes.func,

};

const propsDefault = {
  modal: false,
  validateServerCode: validateServerCode,
  validateServerName: validateServerName,
  validateServerTypeAndOS: validateServerTypeAndOS,

};

class ServerRegistrationModalContainer extends Component {
  static propTypes = propsProTypes;
  static defaultProps = propsDefault;
  // state = {
  //   modal: false,
  //   data: {}
  // };

  render() {
    return ( <
      ServerRegistrationModal fromProps = {
        this.props
      }
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    modal: state.Server.toggleCreateModal,
    own: ownProps,
    role: state.Login.loginInfor.role
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  //  toogle information modal
  toggleCreateModal: () => {
    dispatch(Action.Server.toggleCreateModal);
  },

  //  update server general information
  createNewServer: async server => {
    await dispatch(Action.Server.createNewServer(server));
    await dispatch(Action.Server.getData());

  },

  dispatch
});

//  compose all redux HOC
const enhance = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps, null)
);

export default enhance(ServerRegistrationModalContainer);