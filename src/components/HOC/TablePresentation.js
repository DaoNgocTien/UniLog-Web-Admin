import React, { memo } from "react";
//reactstrap components
import {
  Card,
  CardHeader,
  // DropdownMenu,
  // DropdownItem,
  // UncontrolledDropdown,
  // DropdownToggle,
  // Media,
  Nav,
  NavLink,
  NavItem,
  // Progress,
  Table,
  Container,
  Row,
  // UncontrolledTooltip
  // Button,
  // Modal,
  // ModalHeader,
  // ModalBody,
  // ModalFooter
} from "reactstrap";
// import ServerDetailModal from "./../contents/Server/ServerDetailModal.js";
// import NewServerModal from "./../contents/Server/NewServerModal.js";
// core components
import Header from "./../layouts/Headers/Header.jsx";
import LogSelection from "./../contents/Log/LogSelection";
const uuidv1 = require("uuid/v1");

const TablePresentation = props => {
  // return class extends Component {
  //   render() {

  let {
    WrappedComponent,
    RegistrationModal,
    DetailModal,
    header,
    toggleCreateModal,
    name
  } = props;
  // console.log("TablePresentation ", JSON.stringify(props));
  // const closeBtn = (
  //   <button className="close" onClick={() => toggleCreateModal()}>
  //     &times;
  //   </button>
  // );

  return (
    <>
      <Header />
      {/* Page Content */}
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h4 className="text-uppercase text-light ls-1 mb-1">
                      OVERVIEW
                    </h4>
                    <h2 className="text-dark mb-0">
                      <span className="d-none d-md-block">{name}</span>
                      <span className="d-md-none">S</span>
                    </h2>
                  </div>
                  <div className="col">
                  {name === "Log Reports" ? <LogSelection /> : null}
                    <Nav className="justify-content-end" pills>
                      {/* <NavItem>
                        <NavLink
                          className={`classnames("py-2 px-3", {
                                active: this.state.activeNav === 1
                              })`}
                          href="#pablo"
                          //  onClick={e => this.toggleNavs(e, 1)}
                        >
                          <span className="d-none d-md-block">By Date</span>
                          <span className="d-md-none">D</span>
                        </NavLink>
                      </NavItem> */}
                     
                      <NavItem>
                        <NavLink
                          className={`classnames("py-2 px-3", {
                            active: this.state.activeNav === 2
                          })`}
                          data-toggle="tab"
                          href="#pablo"
                          onClick={toggleCreateModal}
                        >
                          <span className="d-none d-md-block">Create New</span>
                          <span className="d-md-none">C</span>
                        </NavLink>
                        <div>
                          {/* <NewServerModal /> */}
                          <RegistrationModal />
                          <DetailModal />
                        </div>
                      </NavItem>
                    </Nav>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    {header.map((header, key) => (
                      <th scope="col" key={uuidv1()}>
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* <tr>
                    <th scope="row">
                      <Media className="align-items-center">
                        <a
                          className="avatar rounded-circle mr-3"
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            src={require("assets/img/theme/bootstrap.jpg")}
                          />
                        </a>
                        <Media>
                          <span className="mb-0 text-sm">
                            Argon Design System
                          </span>
                        </Media>
                      </Media>
                    </th>
                    <td>$2,500 USD</td>
                    {/* <td>
                      <Badge color="" className="badge-dot mr-4">
                        <i className="bg-warning" />
                        pending
                      </Badge>
                    </td> */}
                    {/*<td>
                      <div className="avatar-group">
                        <a
                          className="avatar avatar-sm"
                          href="#pablo"
                          id="tooltip742438047"
                          onClick={e => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={require("assets/img/theme/team-1-800x800.jpg")}
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip742438047"
                        >
                          Ryan Tompson
                        </UncontrolledTooltip>
                        <a
                          className="avatar avatar-sm"
                          href="#pablo"
                          id="tooltip941738690"
                          onClick={e => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={require("assets/img/theme/team-2-800x800.jpg")}
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip941738690"
                        >
                          Romina Hadid
                        </UncontrolledTooltip>
                        <a
                          className="avatar avatar-sm"
                          href="#pablo"
                          id="tooltip804044742"
                          onClick={e => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={require("assets/img/theme/team-3-800x800.jpg")}
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip804044742"
                        >
                          Alexander Smith
                        </UncontrolledTooltip>
                        <a
                          className="avatar avatar-sm"
                          href="#pablo"
                          id="tooltip996637554"
                          onClick={e => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={require("assets/img/theme/team-4-800x800.jpg")}
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip996637554"
                        >
                          Jessica Doe
                        </UncontrolledTooltip>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">60%</span>
                        <div>
                          <Progress
                            max="100"
                            value="60"
                            barClassName="bg-danger"
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
                            onClick={e => e.preventDefault()}
                          >
                            Action
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                          >
                            Another action
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                          >
                            Something else here
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
                  </tr> */}
                  {/* data is an array */}
                  {/* forEach will be slower then for ... of (item) or for .... in (index) */}
                  {/* {data.forEach((value, key) => {
                    alert(JSON.stringify(data));
                    return <WrappedComponent key={uuidv1()} data={value} index={key} />;
                  })} */}
                  {/* {data.map((value, key) => {
                    return (
                      <WrappedComponent
                        index={key}
                        key={uuidv1()}
                        data={value}
                        Action={Action}
                      />
                    );
                  })} */}
                  <WrappedComponent />
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

const arePropsEqual = (prevProps, nextProps) => {
  return prevProps === nextProps;
};
// Wrap component using `React.memo()` and pass `arePropsEqual`
export default memo(TablePresentation, arePropsEqual);
