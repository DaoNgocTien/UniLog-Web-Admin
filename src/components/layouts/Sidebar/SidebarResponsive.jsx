/*eslint-disable*/
import React from "react";
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
// nodejs library to set properties for components
import { PropTypes } from "prop-types";

// reactstrap components
import {
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col
} from "reactstrap";
import LayoutSearchForm from "./../Layout/LayoutSearchForm.jsx";
import LayoutAvatar from "./../Layout/LayoutAvatar.jsx";

//  redux component
//  set up redux
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Action from "../../../redux/Action/index.js";

//  compose function:
//  - (...fns): array all function need to compose
//  - x: collection / input value
//  - reduceRight: array loop function, from right to left (last -> last - 1 -> last - 2 -> ...)
//  =>  (y, f) => f(y), x === (previousValue, currentFunction) => currentFunction(previousValue), x
//  =>  take last function in collectionFunction fns, use innitial value x, return value (y)
//  =>  [a, b, c] => reduceRight((y, f) => f(y), x) === a(b(c))
const compose = (...fns) => x => fns.reduceRight((y, f) => f(y), x);

var ps;

class SidebarResponsive extends React.Component {
  state = {
    collapseOpen: false
  };
  constructor(props) {
    super(props);
    this.activeRoute.bind(this);
  }
  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }
  // toggles collapse between opened and closed (true/false)
  toggleCollapse = () => {
    this.setState({
      collapseOpen: !this.state.collapseOpen
    });
  };
  // closes the collapse
  closeCollapse = () => {
    this.setState({
      collapseOpen: false
    });
  };
  // creates the links that appear in the left menu / SidebarResponsive
  createLinks = routes => {
    return routes.map((prop, key) => {
      if(prop.path !== "/register" &&  prop.path !== "/password-token" &&  prop.path !== "/password-reset"  ){
        return (
          // role: "admin,manager,employee,guest",
          
          (this.props.role == 1 && (prop.role).includes("admin")) || this.props.role == 5 ?
  
            <NavItem key={key}>
              <NavLink
                to={prop.layout + prop.path}
                tag={NavLinkRRD}
                onClick={this.closeCollapse}
                activeClassName="active"
              >
                <i className={prop.icon} />
                {/* <h4 className=" text-white">{prop.name}</h4> */}
                <font color={'#FFA07A'}>{prop.name}</font>
              </NavLink>
            </NavItem>
            :
            this.props.role == 2 && (prop.role).includes("manager") ?
              <NavItem key={key}>
                <NavLink
                  to={prop.layout + prop.path}
                  tag={NavLinkRRD}
                  onClick={this.closeCollapse}
                  activeClassName="active"
                >
                  <i className={prop.icon} />
                  {/* <h4 className=" text-white">{prop.name}</h4> */}
                  <font color={'#FFA07A'}>{prop.name}</font>
                </NavLink>
              </NavItem>
              :
              (this.props.role == 3 || this.props.role == 4) && (prop.role).includes("employee") ?
                <NavItem key={key}>
                  <NavLink
                    to={prop.layout + prop.path}
                    tag={NavLinkRRD}
                    onClick={this.closeCollapse}
                    activeClassName="active"
                  >
                    <i className={prop.icon} />
                    {/* <h4 className=" text-white">{prop.name}</h4> */}
                    <font color={'#FFA07A'}>{prop.name}</font>
                  </NavLink>
                </NavItem> : null
        );
      }
      
    });
  };
  render() {
    const { bgColor, routes, logo } = this.props;
    let navbarBrandProps;
    if (logo && logo.innerLink) {
      navbarBrandProps = {
        to: logo.innerLink,
        tag: Link
      };
    } else if (logo && logo.outterLink) {
      navbarBrandProps = {
        href: logo.outterLink,
        target: "_blank"
      };
    }
    return (

      <Navbar
        style={{ backgroundColor: '#800000' }}
        className="navbar-vertical fixed-left navbar-light "
        expand="md"
        id="sidenav-main"
      >
        <Container fluid>
          {/* Toggler */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={this.toggleCollapse}
          >
            <span className="navbar-toggler-icon" />
          </button>
          {/* Brand */}
          {logo ? (
            <NavbarBrand className="pt-0" {...navbarBrandProps}>
              <img
                alt={logo.imgAlt}
                className="navbar-brand-img"
                src={logo.imgSrc}
              />
            </NavbarBrand>
          ) : null}
          {/* User */}
          {/* <Nav className="align-items-center d-md-none">
            <UncontrolledDropdown nav>
              <DropdownToggle nav className="nav-link-icon">
                <i className="ni ni-bell-55" />
              </DropdownToggle>
              <DropdownMenu
                aria-labelledby="navbar-default_dropdown_1"
                className="dropdown-menu-arrow"
                right
              >
                <DropdownItem>Action</DropdownItem>
                <DropdownItem>Another action</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Something else here</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown nav>
              <DropdownToggle nav>
                <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                    <img
                      alt="..."
                      src={require("assets/img/theme/team-1-800x800.jpg")}
                    />
                  </span>
                </Media>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
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
          <LayoutAvatar
            navProps="align-items-center d-md-none"
          />
          {/* <Nav className="align-items-center d-md-none">
            <UncontrolledDropdown nav>
              <DropdownToggle nav className="nav-link-icon">
                <i className="ni ni-bell-55" />
              </DropdownToggle>
              <DropdownMenu
                aria-labelledby="navbar-default_dropdown_1"
                className="dropdown-menu-arrow"
                right
              >
                <DropdownItem>Action</DropdownItem>
                <DropdownItem>Another action</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Something else here</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
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
            </Nav>  */}
          {/* Collapse */}
          <Collapse navbar isOpen={this.state.collapseOpen}>
            {/* Collapse header */}
            <div className="navbar-collapse-header d-md-none">
              <Row>
                {logo ? (
                  <Col className="collapse-brand" xs="6">
                    {logo.innerLink ? (
                      <Link to={logo.innerLink}>
                        <img alt={logo.imgAlt} src={logo.imgSrc} />
                      </Link>
                    ) : (
                        <a href={logo.outterLink}>
                          <img alt={logo.imgAlt} src={logo.imgSrc} />
                        </a>
                      )}
                  </Col>
                ) : null}
                <Col className="collapse-close" xs="6">
                  <button
                    className="navbar-toggler"
                    type="button"
                    onClick={this.toggleCollapse}
                  >
                    <span />
                    <span />
                  </button>
                </Col>
              </Row>
            </div>
            {/* Form */}
            {/* <LayoutSearchForm
              formProps="mt-4 mb-3 d-md-none"
              inputGroupProps="input-group-rounded input-group-merge"
              inputProps="form-control-rounded form-control-prepended text-dark"
            /> */}
            {/* <Form className="mt-4 mb-3 d-md-none">
              <InputGroup className="input-group-rounded input-group-merge">
                <Input
                  aria-label="Search"
                  className="form-control-rounded form-control-prepended input-group-alternative"
                  placeholder="Search"
                  type="search"
                />
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fa fa-search-plus" aria-hidden="true"></i>
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </Form>*/}

            <hr className="my-3" />
            {/* Navigation */}
            <hr style={{ width: '80%' }, { border: "1px solid white" }} />
            <Nav navbar>{this.createLinks(routes.filter(route => route.section === "dynamic"))}</Nav>
            <hr style={{ width: '80%' }, { border: "1px solid white" }} />
            <Nav navbar>{this.createLinks(routes.filter(route => route.section === "static"))}</Nav>
            <hr style={{ width: '80%' }, { border: "1px solid white" }} />
            <Nav navbar>{this.createLinks(routes.filter(route => route.section === "profile"))}</Nav>
            <hr style={{ width: '80%' }, { border: "1px solid white" }} />

            {/* <h6 className="navbar-heading text-muted">Documentation</h6>
            
            <Nav className="mb-md-3" navbar>
              <NavItem>
                <NavLink href="https://demos.creative-tim.com/argon-dashboard-react/documentation/overview?ref=adr-admin-SidebarResponsive">
                  <i className="ni ni-spaceship" />
                  Getting started
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://demos.creative-tim.com/argon-dashboard-react/documentation/colors?ref=adr-admin-SidebarResponsive">
                  <i className="ni ni-palette" />
                  Foundation
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://demos.creative-tim.com/argon-dashboard-react/documentation/alerts?ref=adr-admin-SidebarResponsive">
                  <i className="ni ni-ui-04" />
                  Components
                </NavLink>
              </NavItem>
            </Nav> */}
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}

SidebarResponsive.defaultProps = {
  routes: [{}]
};

SidebarResponsive.propTypes = {
  // links that will be displayed inside the component
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the image src of the logo
    imgSrc: PropTypes.string.isRequired,
    // the alt for the img
    imgAlt: PropTypes.string.isRequired
  })
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  dispatch
});

const mapStateToProps = (state, ownProps) => {
  return {
    role: state.Login.loginInfor.role,
    own: ownProps
  };
};

//  compose all redux HOC
const enhance = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps, null)
);

export default enhance(SidebarResponsive);
