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
import ServerInformationModal from "./ServerInformationModal.jsx";
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
//  IP 
const validateIPaddress = ({
  serverIpAddress = "192.168.1.1"
}) => {
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
//  Server Url 
const validateServerUrl = ({
  serverUrl = "https://www.localhost:8084"
}) => {
  let regex = new RegExp(
    "^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|(www\\.)?){1}([0-9A-Za-z-\\.@:%_+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?"
  );
  return regex.test(serverUrl) || serverUrl.length === 0;
};
//   Server Description 
const validateServerDescription = ({
  serverDescription = ""
}) => {
  return serverDescription.length <= 256;
};
//  Server Expired Date 
const validateExpiredDate = ({
  serverExpiredDate = new Date(Date.now()).toISOString().slice(0, 23)
}) => {
  const currentDate = new Date(Date.now());
  currentDate.setMinutes(currentDate.getMinutes() - 10);
  return serverExpiredDate >= currentDate.toISOString().slice(0, 23);
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

//  Detail Validation
//  Disk
const validateDisk1 = ({
  firstDiskName = ""
}) => {
  console.log(firstDiskName.length);
  return firstDiskName.length >= 0 && firstDiskName.length < 51
}
const validateDisk2 = ({
  secondDiskName = ""
}) => {
  return secondDiskName.length >= 0 && secondDiskName.length < 51
}
const validateDisk3 = ({
  thirdDiskName = ""
}) => {
  return thirdDiskName.length >= 0 && thirdDiskName.length < 51
}
//  Volume
const validateDiskVolume1 = ({
  firstDiskVolume = 0
}) => {
  try {
    return parseInt(firstDiskVolume) >= 0;
  } catch (error) {
    return false
  }
}
const validateDiskVolume2 = ({
  secondDiskVolume = 0
}) => {
  try {
    return parseInt(secondDiskVolume) >= 0;
  } catch (error) {
    return false
  }
}
const validateDiskVolume3 = ({
  thirdDiskVolume = 0
}) => {
  try {
    return parseInt(thirdDiskVolume) >= 0;
  } catch (error) {
    return false
  }
}

//  Server account validation
const validateAccount = ({serverAccount = ""}) => {
  return serverAccount.length >= 0 && serverAccount.length <= 20
}
const validatePassword = ({serverPassword = ""}) => {
  return serverPassword.length >= 0 && serverPassword.length <= 20
}


//  propType
const propsProTypes = {
  modal: PropTypes.bool,
  serverMasterList: PropTypes.array,
  server: PropTypes.object,
  // toggleInformationModal: PropTypes.func

  //  validation func
  //validation: PropTypes.bool,
  validateIPaddress: PropTypes.func,
  validateServerCode: PropTypes.func,
  validateServerName: PropTypes.func,
  validateServerUrl: PropTypes.func,
  validateServerDescription: PropTypes.func,
  validateExpiredDate: PropTypes.func,
  validateServerTypeAndOS: PropTypes.func,

  validateDisk1: PropTypes.func,
  validateDisk2: PropTypes.func,
  validateDisk3: PropTypes.func,
  validateDiskVolume1: PropTypes.func,
  validateDiskVolume2: PropTypes.func,
  validateDiskVolume3: PropTypes.func,

  validateAccount: PropTypes.func,
  validatePassword: PropTypes.func,

};

const propsDefault = {
  modal: false,
  serverMasterList: [],
  server: {
    "id": 1,
    "active": true,
    "create_time": "2020-03-06T13:25:23.36",
    "description": "string",
    "expired_date": null,
    "ip_address": "192.168.1.1",
    "name": "kachyctt",
    "os": 1,
    "server_code": "kachyctt",
    "server_master": null,
    "server_url": "google.com.vn",
    "type": 1,
    "update_time": "2020-03-06T00:00:00",
    "server_detail": {
      "id": 1,
      "active": true,
      "disk1": "a",
      "disk2": "b",
      "disk3": "c",
      "server_id": 1,
      "update_time": "2020-03-07T00:26:00.913",
      "volume_disk1": "255",
      "volume_disk2": "225",
      "volume_disk3": "100"
    },
    "server_master_navigation": null,
    "inverse_server_master_navigation": [],
    "repo": [],
    "server_account": [{
      "id": 1,
      "active": true,
      "password": "kachyctt",
      "server_id": 1,
      "username": "kachyctt"
    }]
  },
  validateIPaddress: validateIPaddress,
  validateServerCode: validateServerCode,
  validateServerName: validateServerName,
  validateServerUrl: validateServerUrl,
  validateServerDescription: validateServerDescription,
  validateExpiredDate: validateExpiredDate,
  validateServerTypeAndOS: validateServerTypeAndOS,
  //toggleInformationModal: () => {}

  validateDisk1: validateDisk1,
  validateDisk2: validateDisk2,
  validateDisk3: validateDisk3,
  validateDiskVolume1: validateDiskVolume1,
  validateDiskVolume2: validateDiskVolume2,
  validateDiskVolume3: validateDiskVolume3,

  validateAccount: validateAccount,
  validatePassword: validatePassword,

};

class ServerInformationModalContainer extends Component {
  static propTypes = propsProTypes;
  static defaultProps = propsDefault;
  // state = {
  //   modal: false,
  //   data: {}
  // };

  render() {
    return ( <
      ServerInformationModal fromProps = {
        this.props
      }
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    modal: state.Server.toggleInformationModal,
    serverMasterList: state.Server.currentServerMasterList,
    own: ownProps,
    server: state.Server.currentDataList.find(
      server => server.id === state.Server.currentSelectedServer
    ),
    role: state.Login.loginInfor.role
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  //  toogle information modal
  toggleInformationModal: () => {
    dispatch(Action.Server.toggleInformationModal);
  },

  //  update server general information
  updateServerInformation:  async server => {
    // event.preventDefault();
    if (server.id) {
      console.log(server);
      await dispatch(Action.Server.updateServerGeneralInformation(server));
      await dispatch(Action.Server.getData());
    }
  },

  //  update server detail
  updateServerDetail: async ({
    // event,
    server_detail_id = 0,
    id = 0,
    disk1 = "",
    disk2 = "",
    disk3 = "",
    volume_disk1 = "",
    volume_disk2 = "",
    volume_disk3 = ""
  }) => {
    // event.preventDefault();
    if (id) {
      await dispatch(Action.Server.updateServerDetail(
        server_detail_id,
        id,
        disk1,
        disk2,
        disk3,
        volume_disk1,
        volume_disk2,
        volume_disk3
      ));
      await dispatch(Action.Server.getData());
    }
  },

  //  update server account
  updateServerAccount: async server_account=> {
    // event.preventDefault();
    if (server_account.server_id) {
      await dispatch(Action.Server.updateServerAccount(
        server_account
      ));
      await dispatch(Action.Server.getData());
    }
  },
  dispatch
});

//  compose all redux HOC
const enhance = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps, null)
);

export default enhance(ServerInformationModalContainer);