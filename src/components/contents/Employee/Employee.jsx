import React, { memo } from "react";
import {
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
const Employee = props => {
  let {
    data: {
      id,
      active,
      email,
      name,
      phone,
      role,
    },
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
            <span className="mb-0 text-sm">
              {name}
            </span>
          </Media>
        </Media>
      </th>

      <td>

        <i className="bg-warning" />
        {email}

      </td>

      <td>

        <i className="bg-warning" />
        {phone}


      </td>

      <td>

        <i className="bg-warning" />
        {role == "1" ? "Adminstrator" : role == "2" ? "Manager" : role == "3" ? "Developer" : role == "4" ? "Tester" : "Guest"}

      </td>

      <td>
        <div className="d-flex align-items-center">
          <span className="mr-2">{active ? `Active` : `Disabled`}</span>
          <div>
            <Progress max="100" value={active ? `100` : `0`} barClassName={active ? "bg-info" : "bg-danger"} />
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
            disabled={role == "1"}
          >
            <i className="fas fa-ellipsis-v" />
          </DropdownToggle>
          <DropdownMenu className="dropdown-menu-arrow" right>
            <DropdownItem
              href="#pablo"
              onClick={e => toggleInformationModal(e, id)}
            >
              Assign
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
export default memo(Employee, arePropsEqual);
