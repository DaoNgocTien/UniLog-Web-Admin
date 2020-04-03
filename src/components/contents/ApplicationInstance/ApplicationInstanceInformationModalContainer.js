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
import ApplicationInstanceInformationModal from "./ApplicationInstanceInformationModal.jsx";
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
//  ApplicationInstance Name validation
const validateName = ({
  name = ""
}) => {
  return name ? name.length <= 200 && name.length > 4 : false;
};
const validateAppCode = ({
  appCode, app_code, appInsList
}) => {
  // console.log("validateAppCode " + appCode + " " + app_code + " " + appInsList );
  // console.log(appCode.length <= 200 && appCode.length > 4 && !appInsList.find(app => app.app_code === appCode && app.app_code !== app_code));
  return appCode? 
  appCode === app_code :
  appCode.length <= 200 && appCode.length > 4 && !appInsList.find(app => app.app_code === appCode && app.app_code !== app_code);
};
const validateVersion = ({
  version = ""
}) => {
  return version ? version.length <= 200 && version.length > 4 : false;
};
const validateDescription = ({
  description = ""
}) => {
  return description ? description.length <= 300 && description.length >= 0 : false;
};
const validateConfigUrl = ({
  configUrl = "https://www.google.com"
}) => {
  let regex = new RegExp(
    "^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|(www\\.)?){1}([0-9A-Za-z-\\.@:%_+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?"
  );
  return regex.test(configUrl) || configUrl.length === 0;
};
const validateReleaseUrl = ({
  releaseUrl = "https://www.google.com"
}) => {
  let regex = new RegExp(
    "^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|(www\\.)?){1}([0-9A-Za-z-\\.@:%_+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?"
  );
  return regex.test(releaseUrl) || releaseUrl.length === 0;
};

//  propType
const propsProTypes = {
  //  modal toggle
  modal: PropTypes.bool,
  toggleCreateModal: PropTypes.func,

  //  default value
  application: PropTypes.object,

  //  create new server func
  createNewApplicationInstance: PropTypes.func,

  //  validation func
  validation: PropTypes.bool,
  validateName: PropTypes.func,
  validateAppCode: PropTypes.func,
  validateVersion: PropTypes.func,
  validateDescription: PropTypes.func,
  validateConfigUrl: PropTypes.func,
  validateReleaseUrl: PropTypes.func,

};

const propsDefault = {
  modal: false,
  toggleCreateModal: () => {},
  createNewApplicationInstance: () => {},

  applicationInstance: {
    "id": 1,
    "active": true,
    "app_code": "number1",
    "app_id": 1,
    "application_version": null,
    "config_url": null,
    "create_time": "2020-03-12T00:00:00",
    "description": "string",
    "name": "Quan 1",
    "release_url": null,
    "update_time": "2020-03-12T00:00:00",
    "app": null,
    "log": [],
    "manage_project": []
  },

  validateName: validateName,
  validateVersion: validateVersion,
  validateAppCode: validateAppCode,
  validateDescription: validateDescription,
  validateConfigUrl: validateConfigUrl,
  validateReleaseUrl: validateReleaseUrl,

};


class ApplicationInstanceInformationModalContainer extends Component {
  static propTypes = propsProTypes;
  static defaultProps = propsDefault;

  render() {
    return ( <
      ApplicationInstanceInformationModal fromProps = {
        this.props
      }
      />

    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    modal: state.Server.toggleInformationModal,
    applicationList: state.Application.currentDataList,
    own: ownProps,
    applicationInstance: state.ApplicationInstance.currentDataList.find(
      applicationInstance => applicationInstance.id === state.ApplicationInstance.currentSelectedApplicationInstance
    ),
    appInsList: state.ApplicationInstance.currentDataList,

  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({

  toggleInformationModal: () => {
    dispatch(Action.ApplicationInstance.toggleInformationModal);
  },

  updateApplicationInstanceGeneralInformation: async applicationInstance => {
    if (applicationInstance.id) {
      await dispatch(Action.ApplicationInstance.updateApplicationInstanceGeneralInformation(applicationInstance));
      await dispatch(Action.ApplicationInstance.getData());
    }
  },

  dispatch
});

//  compose all redux HOC
const enhance = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps, null)
);

export default enhance(ApplicationInstanceInformationModalContainer);