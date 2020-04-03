import React, {
  Component
} from "react";
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
import {
  connect
} from "react-redux";
import {
  withRouter
} from "react-router-dom";
import Action from "../../../redux/Action/index.js";
//  presentation component
import PasswordChangingModal from "./PasswordChangingModal.jsx";
// const uuidv1 = require("uuid/v1");
//  compose function:
//  - (...fns): array all function need to compose
//  - x: collection / input value
//  - reduceRight: array loop function, from right to left (last -> last - 1 -> last - 2 -> ...)
//  =>  (y, f) => f(y), x === (previousValue, currentFunction) => currentFunction(previousValue), x
//  =>  take last function in collectionFunction fns, use innitial value x, return value (y)
//  =>  [a, b, c] => reduceRight((y, f) => f(y), x) === a(b(c))
const compose = (...fns) => x => fns.reduceRight((y, f) => f(y), x);

//  Validation section
//   Profile Description 
const validatePassword = ({
  currentPassword = "",
  confirmPassword = "",
  newPassword = ""
}) => {
  return currentPassword.length <= 256 &&
    newPassword.length >= 6 &&
    confirmPassword === newPassword &&
    currentPassword !== newPassword &&
    currentPassword !== confirmPassword
    ;
};

//  propType
const propsProTypes = {
  modal: PropTypes.bool,

  //  validation func
  validatePassword: PropTypes.func,

};

const propsDefault = {
  modal: false,
  validatePassword: validatePassword,

};

class PasswordChangingModalContainer extends Component {
  static propTypes = propsProTypes;
  static defaultProps = propsDefault;

  render() {
    return ( <
      PasswordChangingModal fromProps = {
        this.props
      }
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    modal: state.Profile.toggleInformationModal,
    own: ownProps,
    employee: state.Profile.currentDataList,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  //  toogle information modal
  toggleInformationModal: () => {
    dispatch(Action.Profile.toggleInformationModal);
  },

  //  update Profile general information
  changePassword: async password => {
    // event.preventDefault();
    if (password.email) {
      console.log("changePassword " + JSON.stringify(password));
      await dispatch(Action.Profile.changePassword(password));
      await dispatch(Action.Profile.getData(password.id));
    }
  },

  dispatch
});

//  compose all redux HOC
const enhance = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps, null)
);

export default enhance(PasswordChangingModalContainer);