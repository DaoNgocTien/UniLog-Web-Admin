import React from "react";
import { Route, Switch } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import NavBar from "./Navbars/NavBar.jsx";
import AdminFooter from "./Footers/AdminFooter.jsx";
import SidebarResponsive from "./Sidebar/SidebarResponsive.jsx";
import routes from "./../../routes.js";
//  redux connect
import { withRouter } from "react-router-dom";
//  HOC
import TableContainer from "./../HOC/TableContainer.js";
//const Server =    withTableContainer(SidebarResponsive);
class Admin extends React.Component {
  componentDidUpdate(e) {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.mainContent.scrollTop = 0;
  }
  getRoutes = routes => {
    return routes.map((prop, key) => {
      //console.log("Admin.jsx: " + typeof prop.component);
      if (prop.layout === "/admin") {
        if (prop.type === "table") {
          //alert(JSON.stringify(prop));
          let WrappedComponent = withRouter(TableContainer(prop.component, prop.RegistrationModal, prop.DetailModal, prop.Action, prop.header));
          return (
            <Route
              path={prop.layout + prop.path}
              // component={withRouter(TableContainer(prop.component, prop.Action, prop.header))}
              render={props => <WrappedComponent {...props} />}              
              key={key}
            />
          );
        }
        return (
          <Route
            path={prop.layout + prop.path}
            component={withRouter(prop.component)}
            key={key}
          />
        );
      }
      return null;
    });
  };
  getBrandText = path => {
    for (let i = 0; i < routes.length; i++) {
      if (
        this.props.location.pathname.indexOf(
          routes[i].layout + routes[i].path
        ) !== -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

  render() {
    return (
      <>
        {/* <Server /> */}
        <SidebarResponsive
          {...this.props}
          routes={routes}
          logo={{
            innerLink: "/admin/index",
            imgSrc: require("assets/img/brand/argon-react.png"),
            imgAlt: "..."
          }}
        />

        <div className="main-content " ref="mainContent">
          <Container>
            <NavBar
              {...this.props}
              brandText={this.getBrandText(this.props.location.pathname)}
            />
            <Switch>{this.getRoutes(routes)}</Switch>
            {/* <Container fluid>**/}
            {/* <Header /> */}
            <AdminFooter />
          </Container>
        </div>
      </>
    );
  }
}

export default Admin;
