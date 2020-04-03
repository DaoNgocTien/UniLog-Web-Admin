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
import ApplicationRegistrationModal from "./ApplicationRegistrationModal.jsx";

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
//  Application Name validation
const validateName = ({ applicationName }) => {
  console.log(applicationName);
  console.log(applicationName.length);
  return applicationName ? applicationName.length <= 300 && applicationName.length > 0 : false;
};
//  Server start Date validation
const validateStartDate = ({
  startDate = new Date(Date.now()).toISOString().slice(0, 23)
}) => {
  const currentDate = new Date(Date.now());
  currentDate.setMinutes(currentDate.getMinutes() - 10);
  return startDate >= currentDate.toISOString().slice(0, 23);
};


//  propType
const propsProTypes = {
  //  modal toggle
  modal: PropTypes.bool,
  toggleCreateModal: PropTypes.func,

  //  list server master
  serverMasterList: PropTypes.array,

  //  create new server func
  createNewApplication: PropTypes.func,

  //  validation func
  validation: PropTypes.bool,
  validateName: PropTypes.func,
  validateStartDate: PropTypes.func,
};

const propsDefault = {
  modal: false,
  toggleCreateModal: () => {},
  serverMasterList: [],
  createNewApplication: () => {},

  validateName: validateName,
  validateStartDate: validateStartDate,
};

class ApplicationRegistrationModalContainer extends Component {
  static propTypes = propsProTypes;
  static defaultProps = propsDefault;

  render() {
    return (
      <ApplicationRegistrationModal
        fromProps={
          this.props
        }
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    modal: state.Application.toggleCreateModal,
    serverMasterList: state.Server.currentServerMasterList,
    own: ownProps
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  toggleCreateModal: () => {
    dispatch(Action.Application.toggleCreateModal);
  },

  createNewApplication:async application => {
    if (application) {
      //     console.log(ownProps);
      await dispatch(Action.Application.createNewApplication(application));
      await dispatch(Action.Application.getData());
      dispatch(Action.Application.toggleCreateModal);
    }
  },

  dispatch
});

//  compose all redux HOC
const enhance = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps, null)
);

export default enhance(ApplicationRegistrationModalContainer);
