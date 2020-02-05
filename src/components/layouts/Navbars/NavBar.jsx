import React, { Component } from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Container,
  Form,
  InputGroupText,
  Navbar,
} from "reactstrap";
import LayoutSearchForm from "./../Layout/LayoutSearchForm.jsx";
import LayoutAvatar from "./../Layout/LayoutAvatar.jsx";
export default class NavBar extends Component {
  state = {};

  render() {
    return (
      <>
        <Navbar
          className="navbar-top navbar-dark bg-orange"
          expand="md"
          id="navbar-main"
        >
          <Container fluid>
            <Form className="navbar-search form-inline mr-3 d-none d-md-flex ">
              <InputGroupText>
                <i className="fa fa-bars" aria-hidden="true"></i>
              </InputGroupText>
            </Form>
            <Link
              className="h4 ml-3 mb-0 text-white text-uppercase d-none d-lg-inline-block"
              to="/"
            >
              Wisky
              {/* {this.props.brandText} */}
            </Link>
            <LayoutSearchForm
              formProps="navbar-search form-inline mr-3 d-none d-md-flex ml-lg-auto"
              inputGroupProps="input-group-alternative"
              inputProps="form-control-rounded form-control-prepended text-white"
            />
            {/* <Form className="">
              <FormGroup className="mb-0">
                <InputGroup className="">
                  <InputGroupAddon addonType="append">
                    <InputGroupText>
                      <i className="fa fa-search-plus" aria-hidden="true"></i>
                    </InputGroupText>
                    <Input type="text" name="" id="" placeholder="keyword" />
                  </InputGroupAddon>
                </InputGroup>
              </FormGroup>
            </Form> */}
            <LayoutAvatar 
            navProps="align-items-center d-none d-md-flex"
            nameProps="Jessica"
          />
            
            {/* <Nav className="align-items-center d-none d-md-flex" navbar>
              <UncontrolledDropdown nav>
                <DropdownToggle className="pr-0" nav>
                  <Media className="align-items-center">
                    <span className="avatar avatar-sm rounded-circle">
                      <img
                        alt="..."
                        src={require("assets/img/theme/team-4-800x800.jpg")}
                      />
                    </span>
                    <Media className="ml-2 d-none d-lg-block">
                      <span className="mb-0 text-sm font-weight-bold">
                        Jessica Jones
                      </span>
                    </Media>
                  </Media>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-arrow mt-5" right>
                  <DropdownItem className="noti-title" header tag="div">
                    <h6 className="text-overflow m-0">Welcome!</h6>
                  </DropdownItem>
                  <DropdownItem to="/admin/user-profile" tag={Link}>
                    <i className="ni ni-single-02" />
                    <span>My profile</span>
                  </DropdownItem>
                  <DropdownItem to="/admin/user-profile" tag={Link}>
                    <i className="ni ni-settings-gear-65" />
                    <span>Settings</span>
                  </DropdownItem>
                  <DropdownItem to="/admin/user-profile" tag={Link}>
                    <i className="ni ni-calendar-grid-58" />
                    <span>Activity</span>
                  </DropdownItem>
                  <DropdownItem to="/admin/user-profile" tag={Link}>
                    <i className="ni ni-support-16" />
                    <span>Support</span>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem href="#pablo" onClick={e => e.preventDefault()}>
                    <i className="ni ni-user-run" />
                    <span>Logout</span>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav> */}
          </Container>
        </Navbar>
      </>
    );
  }
}
