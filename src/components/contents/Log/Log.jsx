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

const Log = props => {
  let {
    data: {
      id: serverId,
      name: serverName,
      ip_address: serverIp,
      create_time: createDate,
      active: status
    },
    disabled,
    toggleInformationModal
  } = props;
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
            {/* <span className="mb-0 text-sm">{createDate.slice(0,10) + " " + createDate.slice(12,23)}</span> */}
            <span className="mb-0 text-sm">{createDate}</span>
          </Media>
        </Media>
      </th>
      <td>{serverName}</td>
      <td>
        <Badge color="" className="badge-dot mr-4">
          <i className="bg-warning" />
          {serverIp ? serverIp : "192.168.1.1"}
        </Badge>
      </td>
      {/* <td>
        {system_instance
          ? "0 Instances"
          : system_instance.length + "Instances"}
      </td> */}
      <td>
        <div className="d-flex align-items-center">
          <span className="mr-2">{status ? "Active" : "Deactive"}</span>
          <div>
            <Progress
              max="100"
              value={status ? 100 : 0}
              barClassName={status ? "bg-info" : "bg-danger"}
            />
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
            <DropdownItem href="#pablo" onClick={e => disabled(e, serverId, !status)}>
              {status ? "Disable" : "Active"}
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
export default memo(Log, arePropsEqual);
