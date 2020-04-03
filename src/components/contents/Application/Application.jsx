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
const Application = props => {
  let {
    data: {
      id,
      active,
      category,
      // create_time,
      // description,
      // efford,
      // end_date,
      // is_done,
      name,
      // note,
      // origin,
      // priority,
      // source_code_url,
      // stage,
      // start_date,
      // status,
      // systems_id,
      // team,
      // technologies,
      // type,
      update_time,
      // systems,
      application_instance,
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
            <span className="mb-0 text-sm">
              {update_time}
            </span>
          </Media>
        </Media>
      </th>
      
      <td>
        <Badge color="" className="badge-dot mr-4">
          <i className="bg-warning" />
          {name}
        </Badge>
      </td>

      <td>
        <Badge color="" className="badge-dot mr-4">
          <i className="bg-warning" />
          {category}
        </Badge>

      </td>

      <td>
      <Badge color="" className="badge-dot mr-4">
        <i className="bg-warning" />
        {application_instance.length
          ? "0 Instances"
          : application_instance.length + " Instances"}
      </Badge>
      </td>
     
      <td>
        <div className="d-flex align-items-center">
          <span className="mr-2">{active ? `Active` : `Disabled`}</span>
          <div>
            <Progress max="100" value={active ? `100` : `0`}  barClassName={active ? "bg-info" : "bg-danger"} />
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
              onClick={e => toggleInformationModal(e, id)}
            >
              Update
            </DropdownItem>
            {/* <ServerDetailModal /> */}
            <DropdownItem href="#pablo" onClick={e => disabled(e, id)}>
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
export default memo(Application, arePropsEqual);
