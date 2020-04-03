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
import EmployeeRegistrationModal from "./EmployeeRegistrationModal.jsx";

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
//  Employee Name validation
const validateName = ({ name }) => {
  return name ? name.length <= 300 && name.length > 5 : false;
};
//  Email validation
const validateEmail = ({
  email = "https://www.google.com"
}) => {
  let regex = new RegExp(
    "^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|(www\\.)?){1}([0-9A-Za-z-\\.@:%_+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?"
  );
  return regex.test(email) || email.length === 0;
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
  validateEmail: PropTypes.func,
};

const propsDefault = {
  modal: false,
  toggleCreateModal: () => {},
  serverMasterList: [],
  createNewApplication: () => {},

  validateName: validateName,
  validateEmail: validateEmail,
};

class EmployeeRegistrationModalContainer extends Component {
  static propTypes = propsProTypes;
  static defaultProps = propsDefault;

  render() {
    return (
      <EmployeeRegistrationModal
        fromProps={
          this.props
        }
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    modal: state.Employee.toggleCreateModal,
    serverMasterList: state.Server.currentServerMasterList,
    own: ownProps
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  toggleCreateModal: () => {
    dispatch(Action.Employee.toggleCreateModal);
  },

  createNewEmployee:async Employee => {
    if (Employee) {
      //     console.log(ownProps);
      await dispatch(Action.Employee.createNewEmployee(Employee));
      await dispatch(Action.Employee.getData());
      dispatch(Action.Employee.toggleCreateModal);
    }
  },

  dispatch
});

//  compose all redux HOC
const enhance = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps, null)
);

export default enhance(EmployeeRegistrationModalContainer);
