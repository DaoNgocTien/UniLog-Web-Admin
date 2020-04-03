import React from "react";
//  react router
import { Link } from "react-router-dom";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  NavLink
} from "reactstrap";
import { Redirect } from "react-router-dom";

import { connect } from "react-redux";
import Action from "../../../redux/Action/index";

class PasswordReset extends React.Component {
 
  render() {
    return (
      <>
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-transparent pb-5">
              <div className="text-muted text-center mt-2 mb-3">
                <small>Sign in with</small>
              </div>
              <div className="btn-wrapper text-center">
                {/* <Button
                  className="btn-neutral btn-icon"
                  color="default"
                  href="#pablo"
                  onClick={e => e.preventDefault()}
                >
                  <span className="btn-inner--icon">
                    <img
                      alt="..."
                      src={require("assets/img/icons/common/github.svg")}
                    />
                  </span>
                  <span className="btn-inner--text">Github</span>
                </Button> */}
                <Button
                  className="btn-neutral btn-icon"
                  color="default"
                  href="#pablo"
                  onClick={e => e.preventDefault()}
                >
                  <span className="btn-inner--icon">
                    <img
                      alt="..."
                      src={require("assets/img/icons/common/google.svg")}
                    />
                  </span>
                  <span className="btn-inner--text">Google</span>
                </Button>
              </div>
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <small>Enter your token and password</small>
              </div>
              <Form role="form">
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      innerRef={e => (this.emailInput = e)}
                      defaultValue="kachyct@gmail.com"
                      placeholder="Email"
                      type="email"
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      innerRef={e => (this.passwordInput = e)}
                      defaultValue="kachyct"
                      placeholder="New Password"
                      type="password"
                    />
                  </InputGroup>
                </FormGroup>
                {/* <div className="custom-control custom-control-alternative custom-checkbox">
                  <input
                    className="custom-control-input"
                    id=" customCheckLogin"
                    type="checkbox"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor=" customCheckLogin"
                  >
                    <span className="text-muted">Remember me</span>
                  </label>
                </div> */}
                <div className="text-center">
                  <Button
                    // onClick={() => this.setState({ isLogIn: true })}
                    onClick={event => {
                      this.props.login(
                        event,
                        this.emailInput.value,
                        this.passwordInput.value
                      );
                    }}
                    className="my-4"
                    color="primary"
                    type="button"
                  >
                    Change your password
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </>
    );
  }
}
const mapStateToProps = state => {
  return {
    loginStatus: state.Login.isLogin
  };
};

// const mapDispatchToProps = (dispatch, ownProps) => ({
const mapDispatchToProps = dispatch => ({
  login: (event, email, password) => {
    event.preventDefault();
    if (email && password && email.length > 0 && password.length > 0) {
      dispatch(Action.Login.login({ email, password }));
    }
  },
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(PasswordReset);
