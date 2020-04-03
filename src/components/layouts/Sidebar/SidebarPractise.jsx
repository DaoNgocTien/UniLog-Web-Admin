/*eslint-disable*/
import { NavLink as NavLinkRouter, Link } from "react-router-dom";
// nodejs library to set properties for components
import { PropTypes } from "prop-types";
//import PropTypes from "prop-types";
// reactstrap components
import routes from "./../routes";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col
} from "reactstrap";
import uuid from "uuidv4";
import SidebarResponsive from "./SidebarResponsive";
import React, { Component } from "react";
const propTypes = {
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

const defaultProps = {
  routes: [{}]
};

class Sidebar extends Component {
  state = {
    collapse: false
  };
  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName) {
    console.log(this.props);
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }

  // toggleCollapse : true / false
  toggleCollapse() {
    this.setState({
      collapse: !this.state.collapse
    });
  }

  // closeCollapse
  closeCollapse() {
    this.setState({
      collapse: false
    });
  }

  // creates the links that appear in the left menu / Sidebar

  createLinks = (routes) => {
    return routes.map((value, key) => {
       console.log(JSON.stringify(value));
      return (
        <NavItem key={uuid() + key}>
          <NavLink
          to={value.layout + value.path}
          tag={NavLinkRouter}
          onClick={() => this.closeCollapse()}
          activeClassName={() => this.activeRoute(routeName)}
          activeClassName="active"
        >
          
          {/* <a className="ml-3 mr-3" style={{align: 'center'}}> */}
            <i className={value.icon}/>    {value.name}
            {/* </a> */}
         
          </NavLink>
        </NavItem>
        
      );
    });
  }

  

  render() {
    const { bgColor, logo } = this.props;
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
        className="navbar-vertical fixed-left navbar-light bg-white"
        expand="md"        
        // style={{width : '100px'}}
        id="sidenav-main"
        responsive
      >
        <Container fluid >          
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
                    
            <SidebarResponsive/>
        </Container>
      </Navbar>
    );
  }
}

Sidebar.propTypes = propTypes;
Sidebar.defaultProps = defaultProps;

export default Sidebar;