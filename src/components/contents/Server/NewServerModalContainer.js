import React, { Component } from "react";
//  set up proptype
import PropTypes from "prop-types";
//  reacttrap component
// import {
//   Button,
//   Modal,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
//   Col,
//   Row,
//   Form,
//   FormGroup,
//   Label,
//   Input,
//   FormFeedback,
//   FormText
// } from "reactstrap";

//  redux component
//  set up redux
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Action from "../../../redux/Action/index.js";

//  presentation component
import NewServerModalPresentation from "./NewServerModalPresentation.jsx";

//const uuidv1 = require("uuid/v1");

//  compose function:
//  - (...fns): array all function need to compose
//  - x: collection / input value
//  - reduceRight: array loop function, from right to left (last -> last - 1 -> last - 2 -> ...)
//  =>  (y, f) => f(y), x === (previousValue, currentFunction) => currentFunction(previousValue), x
//  =>  take last function in collectionFunction fns, use innitial value x, return value (y)
//  =>  [a, b, c] => reduceRight((y, f) => f(y), x) === a(b(c))
const compose = (...fns) => x => fns.reduceRight((y, f) => f(y), x);

//  Validation secction
//  IP validation
const validateIPaddress = ({ serverIpAddress = "192.168.1.1" }) => {
  if (
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
      serverIpAddress
    ) ||
    serverIpAddress.length === 0
  ) {
    return true;
  }
  return false;
};
//  Server Code validation
const validateServerCode = ({ serverCode }) => {
  return serverCode ? serverCode.length <= 10 && serverCode.length >= 0 : false;
};
//  Server Name validation
const validateServerName = ({ serverName }) => {
  return serverName ? serverName.length <= 10 && serverName.length >= 0 : false;
};
//  Server Url validation
const validateServerUrl = ({ serverUrl = "https://www.localhost:8084" }) => {
  let regex = new RegExp(
    "^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|(www\\.)?){1}([0-9A-Za-z-\\.@:%_+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?"
  );
  return regex.test(serverUrl) || serverUrl.length === 0;
};
//   Server Description validation
const validateServerDescription = ({ serverDescription = "" }) => {
  return serverDescription.length <= 256;
};
//  Server Expired Date validation
const validateExpiredDate = ({
  serverExpiredDate = new Date(Date.now()).toISOString().slice(0, 23)
}) => {
  const currentDate = new Date(Date.now());
  currentDate.setMinutes(currentDate.getMinutes() - 10);
  return serverExpiredDate >= currentDate.toISOString().slice(0, 23);
};
//  Server Type validation
const validateServerTypeAndOS = ({
  serverTypeSelect = 1,
  serverOsSelect = 1
}) => {
  console.log("serverTypeSelect ", serverTypeSelect);
  console.log("serverOsSelect ", serverOsSelect);
  if (
    (serverTypeSelect === 1 || serverTypeSelect === 2) &&
    serverOsSelect > 2
  ) {
    console.log("false 1");
    return false;
  }
  if (serverTypeSelect === 3 && (serverOsSelect < 3 || serverOsSelect > 6)) {
    console.log("false 2");
    return false;
  }
  if (serverTypeSelect === 4 && (serverOsSelect < 7 || serverOsSelect > 10)) {
    console.log("false 3");
    return false;
  }
  console.log("true");
  return true;
};
//  Server OS validation

//  propType
const propsProTypes = {
  //  modal toggle
  modal: PropTypes.bool,
  toggleCreateModal: PropTypes.func,

  //  list server master
  serverMasterList: PropTypes.array,

  //  create new server func
  createNewServer: PropTypes.func,

  //  validation func
  validation: PropTypes.bool,
  validateIPaddress: PropTypes.func,
  validateServerCode: PropTypes.func,
  validateServerName: PropTypes.func,
  validateServerUrl: PropTypes.func,
  validateServerDescription: PropTypes.func,
  validateExpiredDate: PropTypes.func,
  validateServerTypeAndOS: PropTypes.func
};

const propsDefault = {
  modal: false,
  toggleCreateModal: () => {},
  serverMasterList: [],
  createNewServer: () => {},

  validateIPaddress: validateIPaddress,
  validateServerCode: validateServerCode,
  validateServerName: validateServerName,
  validateServerUrl: validateServerUrl,
  validateServerDescription: validateServerDescription,
  validateExpiredDate: validateExpiredDate,
  validateServerTypeAndOS: validateServerTypeAndOS
};

class NewServerModalContainer extends Component {
  static propTypes = propsProTypes;
  static defaultProps = propsDefault;

  render() {
    return (
      <NewServerModalPresentation
        fromProps={
          this.props
        }
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    modal: state.Server.toggleCreateModal,
    serverMasterList: state.Server.currentServerMasterList,
    own: ownProps
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  toggleCreateModal: () => {
    dispatch(Action.Server.toggleCreateModal);
  },

  createNewServer: server => {
    if (server) {
      //     console.log(ownProps);
      dispatch(Action.Server.createNew(server));
      dispatch(Action.Server.toggleCreateModal);
    }
  },

  dispatch
});

//  compose all redux HOC
const enhance = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps, null)
);

export default enhance(NewServerModalContainer);
