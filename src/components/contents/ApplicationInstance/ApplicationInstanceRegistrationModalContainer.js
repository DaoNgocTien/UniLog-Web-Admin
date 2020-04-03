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
import ApplicationInstanceRegistrationModal from "./ApplicationInstanceRegistrationModal.jsx";

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
//  ApplicationInstance Name validation
const validateName = ({
  name
}) => {
  return name ? name.length <= 300 && name.length >= 5 : false;
};
//  Server start Date validation
const validateAppCode = ({
  appCode
}) => {
  return appCode ? appCode.length <= 300 && appCode.length >= 5 : false;
};


//  propType
const propsProTypes = {
  //  modal toggle
  modal: PropTypes.bool,
  toggleCreateModal: PropTypes.func,

  //  list server master
  serverMasterList: PropTypes.array,

  //  create new server func
  createNewApplicationInstance: PropTypes.func,

  //  validation func
  validation: PropTypes.bool,
  validateName: PropTypes.func,
  validateAppCode: PropTypes.func,
};

const propsDefault = {
  modal: false,
  toggleCreateModal: () => {},
  serverMasterList: [],
  createNewApplicationInstance: () => {},

  validateName: validateName,
  validateAppCode: validateAppCode,
};

class ApplicationInstanceRegistrationModalContainer extends Component {
  static propTypes = propsProTypes;
  static defaultProps = propsDefault;
  render() {
    return ( <
      ApplicationInstanceRegistrationModal fromProps = {
        this.props
      }
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    modal: state.ApplicationInstance.toggleCreateModal,
    serverMasterList: state.Server.currentServerMasterList,
    own: ownProps,
    applicationList: state.Application.currentDataList,

  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  toggleCreateModal: () => {
    dispatch(Action.ApplicationInstance.toggleCreateModal);
  },

  // getData: () => {
  //   dispatch(Action.Application.getData());
  // },

  createNewApplicationInstance: async ApplicationInstance => {
    if (ApplicationInstance) {
      //     console.log(ownProps);
      await dispatch(Action.ApplicationInstance.createNewApplicationInstance(ApplicationInstance));
      await dispatch(Action.ApplicationInstance.getData());
      dispatch(Action.ApplicationInstance.toggleCreateModal);
    }
  },

  dispatch
});

//  compose all redux HOC
const enhance = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps, null)
);

export default enhance(ApplicationInstanceRegistrationModalContainer);