import React, { memo } from "react";
import {
  Badge,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Progress
} from "reactstrap";

const Log = props => {
  let {
    data: {
      id,
      active,
      file_name,
      line_code,
      log_date,
      message,
      project_name,
    },
    disabled,
  } = props;
  return (
    <tr>
      <th scope="row">
            <span className="mb-0 text-sm">{log_date}</span>
      </th>
      <td>{project_name}</td>
      <td>
        <Badge color="" className="badge-dot mr-4">
          <i className="bg-warning" />
          {file_name}
        </Badge>
      </td>
      <td>
        {line_code}
      </td>
      <td>
        {message}
      </td>
      <td>
        <div className="d-flex align-items-center">
          <span className="mr-2">{active ? "Active" : "Deactive"}</span>
          <div>
            <Progress
              max="100"
              value={active ? 100 : 0}
              barClassName={active ? "bg-info" : "bg-danger"}
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
            <DropdownItem href="#pablo" onClick={e => disabled(e, id, !active)}>
              {active ? "Disable" : "Active"}
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
