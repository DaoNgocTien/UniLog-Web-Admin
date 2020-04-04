import React, {
  Component
} from "react";
//  set up proptype
import PropTypes from "prop-types";
//  redux component
//  set up redux
import {
  connect
} from "react-redux";
import {
  withRouter
} from "react-router-dom";
import Action from "../../../redux/Action/index.js";

// reactstrap components
import { Button, Container, Row, Col } from "reactstrap";
import PasswordChangingModalContainer from "./../../contents/Profile/PasswordChangingModalContainer.js";
// const uuidv1 = require("uuid/v1");
//  compose function:
//  - (...fns): array all function need to compose
//  - x: collection / input value
//  - reduceRight: array loop function, from right to left (last -> last - 1 -> last - 2 -> ...)
//  =>  (y, f) => f(y), x === (previousValue, currentFunction) => currentFunction(previousValue), x
//  =>  take last function in collectionFunction fns, use innitial value x, return value (y)
//  =>  [a, b, c] => reduceRight((y, f) => f(y), x) === a(b(c))
const compose = (...fns) => x => fns.reduceRight((y, f) => f(y), x);

// //  propType
// const propsProTypes = {
//   index: PropTypes.number,
//   data: PropTypes.array
// };

// const propsDefault = {
//   index: 1,
//   data: []
// };

class UserHeader extends Component {
  render() {
    return (
      <>
        <div
          className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
          style={{
            minHeight: "600px",
            backgroundImage:
              "url(" + require("assets/img/theme/profile-cover.jpg") + ")",
            backgroundSize: "cover",
            backgroundPosition: "center top"
          }}
        >
          {/* Mask */}
          <span className="mask bg-gradient-default opacity-8" />
          {/* Header container */}
          <Container className="d-flex align-items-center" fluid>
            <Row>
              <Col lg="7" md="10">
                <h1 className="display-2 text-white">Hello Jesse</h1>
                <p className="text-white mt-0 mb-5">
                  This is your profile page. You can see the progress you've
                  made with your work and manage your projects or assigned tasks
                </p>
                <Button
                  color="info"
                  href="#pablo"
                  onClick={e => this.props.getData()}
                >
                 <img
                        alt="..."
                        className="rounded-circle"
                        src={require("assets/img/theme/mobile_download-512.png")}
                        height={50}
                        width={50}
                      />
                 Try Mobile Version
                </Button>
                <Button
                  color="info"
                  href="#pablo"
                  onClick={e => (this.props.toggleInformationModal())}
                  
                >
                   <img
                        alt="..."
                        className="rounded-circle"
                        src={require("assets/img/theme/Password.png")}
                        height={50}
                        width={50}
                      />
                     {"     "}Change Password
                      </Button>
              </Col>
            </Row>
            
          </Container>
        </div>
      </>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    data: state.Employee.currentDataList,
    own: ownProps
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  getData: async () => {
    await dispatch(Action.Profile.toggleProfileComponent());
  },
  toggleInformationModal: () => {
    dispatch(Action.Profile.toggleInformationModal);
  },

  dispatch
});

//  compose all redux HOC
const enhance = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps, null)
);

export default enhance(UserHeader);
