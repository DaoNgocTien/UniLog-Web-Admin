import React, { memo } from "react";
import {
  Badge,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Progress
} from "reactstrap";

//  import Action from "./../../../redux/Action/index.js";
//  server information modal
// import ServerDetailModal from "./ServerDetailModal.js";
const ServerPresentation = props => {
  let {
    data: {
      id: serverId,
      server_name: serverName,
      ip_address: serverIp,
      create_date: createDate,
      status
    },
    disabled,
    toggleInformationModal
  } = props;

  //console.log(props);

  return (
    <tr>
      <th scope="row">
        <Media className="align-items-center">
          {/* <a
            className="avatar rounded-circle mr-3"
            href="#pablo"
            onClick={e => e.preventDefault()}
          >
            <img alt="..." src={require("assets/img/theme/bootstrap.jpg")} />
          </a> */}
          <Media>
            <span className="mb-0 text-sm">{createDate.slice(0,10) + " " + createDate.slice(12,23)}</span>
          </Media>
        </Media>
      </th>
      <td>{serverName}</td>
      <td>
        <Badge color="" className="badge-dot mr-4">
          <i className="bg-warning" />
          {serverIp}
        </Badge>
      </td>
      {/* <td>
        {system_instance
          ? "0 Instances"
          : system_instance.length + "Instances"}
      </td> */}
      <td>
        <div className="d-flex align-items-center">
          <span className="mr-2">{status ? status : `Active`}</span>
          <div>
            <Progress max="100" value="60" barClassName="bg-danger" />
          </div>
        </div>
      </td>
      <td className="text-right">
        <UncontrolledDropdown>
          <DropdownToggle
            className="btn-icon-only text-light"
            href="#pablo"
            role="button"
            size="sm"
            color=""
            onClick={e => e.preventDefault()}
          >
            <i className="fas fa-ellipsis-v" />
          </DropdownToggle>
          <DropdownMenu className="dropdown-menu-arrow" right>
            <DropdownItem
              href="#pablo"
              onClick={e => toggleInformationModal(e, serverId)}
            >
              Update
            </DropdownItem>
            {/* <ServerDetailModal /> */}
            <DropdownItem href="#pablo" onClick={e => disabled(e, serverId)}>
              Disable
            </DropdownItem>
            <DropdownItem href="#pablo" onClick={e => e.preventDefault()}>
              Something else here
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </td>
    </tr>
  );
};

const arePropsEqual = (prevProps, nextProps) => {
  return prevProps === nextProps;
};
// Wrap component using `React.memo()` and pass `arePropsEqual`
export default memo(ServerPresentation, arePropsEqual);
