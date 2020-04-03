
/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container, Row, Col, Nav, NavItem, NavLink } from "reactstrap";

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <Row className="align-items-center justify-content-xl-between">
          <Col xl="6">
            <div className="copyright text-cente4r text-xl-left text-muted">
    <h4 color={'#800000'}>© 2018{" "}</h4>
              <a
                className="font-weight-bold ml-1"
                href="https://www.creative-tim.com?ref=adr-admin-footer"
                rel="noopener noreferrer"
                target="_blank"
              >
                 <h4 color={'#800000'}>Creative Tim</h4>
              </a>
            </div>
          </Col>

          <Col xl="6">
            <Nav className="nav-footer justify-content-center justify-content-xl-end">
              <NavItem>
                <NavLink
                  href="https://www.creative-tim.com?ref=adr-admin-footer"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <h4 color={'#800000'}>Creative Tim</h4> 
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  href="https://www.creative-tim.com/presentation?ref=adr-admin-footer"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                   <h4 color={'#800000'}>About Us</h4> 
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  href="http://blog.creative-tim.com?ref=adr-admin-footer"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                   <h4 color={'#800000'}>Blog</h4> 
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  href="https://github.com/creativetimofficial/argon-dashboard/blob/master/LICENSE.md?ref=adr-admin-footer"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                 <h4 color={'#800000'}>MIT License</h4> 
                </NavLink>
              </NavItem>
            </Nav>
          </Col>
        </Row>
      </footer>
    );
  }
}

export default Footer;
