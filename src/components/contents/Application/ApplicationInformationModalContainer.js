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
import ApplicationInformationModal from "./ApplicationInformationModal.jsx";
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
//  Application Name validation
const validateName = ({
  applicationName = ""
}) => {
  return applicationName ? applicationName.length <= 200 && applicationName.length > 4 : false;
};
//  Server start Date validation
const validateStartDate = ({
  startDate = new Date(Date.now()).toISOString().slice(0, 23)
}) => {
  const currentDate = new Date(Date.now());
  currentDate.setMinutes(currentDate.getMinutes() - 10);
  return startDate >= currentDate.toISOString().slice(0, 23);
};
//  Server Expired Date 
const validateExpiredDate = ({
  endDate = new Date(Date.now()).toISOString().slice(0, 23),
  startDate = new Date(Date.now()).toISOString().slice(0, 23)
}) => {
  return (
    endDate.getYear() >= startDate.getYear() &&
    endDate.getMonth() >= startDate.getMonth() &&
    (endDate.getDate() - startDate.getDate()) >= 1
  );
};
//  Application Source Code Url 
const validateSourceCodeUrl = ({
  sourceCodeUrl = "https://www.google.com"
}) => {
  let regex = new RegExp(
    "^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|(www\\.)?){1}([0-9A-Za-z-\\.@:%_+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?"
  );
  return regex.test(sourceCodeUrl) || sourceCodeUrl.length === 0;
};
//  Repo Name
const validateRepoName = ({
  repoName = ""
}) => {
  return repoName ? repoName.length > 5 && repoName.length <= 100 : false;
}
//  Repo Url
const validateRepoUrl = ({
  repoUrl = "https://www.google.com"
}) => {
  let regex = new RegExp(
    "^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|(www\\.)?){1}([0-9A-Za-z-\\.@:%_+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?"
  );
  return regex.test(repoUrl) || repoUrl.length === 0;
};

//  propType
const propsProTypes = {
  //  modal toggle
  modal: PropTypes.bool,
  toggleCreateModal: PropTypes.func,

  //  default value
  application: PropTypes.object,

  //  create new server func
  createNewApplication: PropTypes.func,

  //  validation func
  validation: PropTypes.bool,
  validateName: PropTypes.func,
  validateStartDate: PropTypes.func,
  validateExpiredDate: PropTypes.func,
  validateSourceCodeUrl: PropTypes.func,
  validateRepoName: PropTypes.func,
  validateRepoUrl: PropTypes.func,

};

const propsDefault = {
  modal: false,
  toggleCreateModal: () => {},
  systemList: [],
  createNewApplication: () => {},

  application: {
    "id": 1,
    "active": true,
    "category": 1,
    "create_time": "2020-03-11T00:00:00",
    "description": null,
    "efford": null,
    "end_date": null,
    "is_done": true,
    "name": "Log API",
    "note": null,
    "origin": "I",
    "priority": 1,
    "source_code_url": null,
    "stage": null,
    "start_date": "2020-03-11T00:00:00",
    "status": 1,
    "systems_id": 1,
    "team": null,
    "technologies": null,
    "type": "N",
    "update_time": "2020-03-12T00:00:00",
    "systems": null,
    "application_instance": [],
    "manage_project": [],
    "repo": []
  },

  validateName: validateName,
  validateStartDate: validateStartDate,
  validateExpiredDate: validateExpiredDate,
  validateSourceCodeUrl: validateSourceCodeUrl,
  validateRepoName: validateRepoName,
  validateRepoUrl: validateRepoUrl,

};


class ApplicationInformationModalContainer extends Component {
  static propTypes = propsProTypes;
  static defaultProps = propsDefault;

  render() {
    return ( <
      ApplicationInformationModal fromProps = {
        this.props
      }
      />

    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    modal: state.Server.toggleInformationModal,
    serverList: state.Server.currentDataList,
    systemList: state.System.currentDataList,
    own: ownProps,
    application: state.Application.currentDataList.find(
      application => application.id === state.Application.currentSelectedApplication
    )
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({

  toggleInformationModal: () => {
    dispatch(Action.Application.toggleInformationModal);
  },

  updateApplicationGeneralInformation: async application => {
    if (application.id) {
      await dispatch(Action.Application.updateApplicationGeneralInformation(application));
      await dispatch(Action.Application.getData())
    }
  },

  createNewRepo: async repo => {
    if(repo && repo.server_id && repo.application_id && repo.name) {
      await dispatch(Action.Repo.createNewRepo(repo));
      await dispatch(Action.Repo.getData());
    };
  },

  dispatch
});

//  compose all redux HOC
const enhance = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps, null)
);

export default enhance(ApplicationInformationModalContainer);