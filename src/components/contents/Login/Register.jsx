/*!

=========================================================
* Argon Dashboard React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
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
  FormText,
  FormFeedback,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col, 
  NavLink
} from "reactstrap";
//  set up proptype
import PropTypes from "prop-types";
//  propType
const propsProTypes = {
  //  create new guest func
  createNewApplication: PropTypes.func,

  //  validation func
  validatePassword: PropTypes.func,
  validateEmail: PropTypes.func,
};

const propsDefault = {
  createNewApplication: () => { },

  validatePassword: () => false,
  validateEmail: () => false,
};

class Register extends React.Component {
  static propTypes = propsProTypes;
  static defaultProps = propsDefault;
  state = {
    emailValidation: null,
    passwordValidation: null,
    password: "",
    email: ""
  };

  //  validate value from each input and store value into state
  isChange = async event => {
    const name = event.target.name;
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    switch (name) {
      case "password":
        this.setState({
          ...this.state,
          [name]: value,
          passwordValidation: this.props.fromProps.validatePassword({ [name]: value })
        });
        console.log(name + " " + value);
        break;

      case "email":
        this.setState({
          ...this.state,
          [name]: value,
          emailValidation: this.props.fromProps.validateEmail({ [name]: value })
        });
        console.log(name + " " + value);
        break;

      default:
        break;
    }


  };

  //  check validation
  validation = () => {
    console.log(this.state.passwordValidation);
    console.log(this.state.emailValidation);
    return (
      (this.state.passwordValidation == null ? false : this.state.passwordValidation) &&
      (this.state.emailValidation == null
        ? false
        : this.state.emailValidation)
    );
  };

  //  create new employee
  createNewGuest = event => {
    event.preventDefault();
    const application = {
      password: this.state.password,
      confirm_password: this.state.password,
      is_admin: false,
      email: this.state.email,
      address: "",
      name: this.state.email,
      phone: "",
      manager_registration_token: "string",
      role: 5
    };
    this.props.fromProps.createNewEmployee(application);
  };
  render() {
    return (
      <>
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-transparent pb-5">
              <div className="text-muted text-center mt-2 mb-4">
                <small>Sign up with</small>
              </div>
              <div className="text-center">
                {/* <Button
                  className="btn-neutral btn-icon mr-4"
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
                <small>Or sign up with credentials</small>
              </div>
              <Form role="form">
                {/* <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-hat-3" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Name" type="text" />
                  </InputGroup>
                </FormGroup> */}
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                    name="email"
                      onChange={(event) => this.isChange(event)}
                      placeholder="Email"
                      defaultValue=""
                      innerRef={e => (this.emailInput = e)}
                      type="email" valid={this.state.nameValidation}
                      invalid={
                        this.state.nameValidation == null
                          ? false
                          : !this.state.nameValidation
                      }
                      required
                    />
                  </InputGroup>
                  <FormFeedback
                  >
                    Invalid Employee Name
                        </FormFeedback>
                  <FormText>Email will be used to login, please provide correct email</FormText>
                </FormGroup>

                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                    name="password"
                      onChange={(event) => this.isChange(event)}
                      innerRef={e => (this.passwordInput = e)}
                      defaultValue=""
                      placeholder="Password"
                      type="password" valid={this.state.emailValidation}
                      invalid={
                        this.state.emailValidation == null
                          ? false
                          : !this.state.emailValidation
                      }
                      required

                    />
                  </InputGroup>
                  <FormFeedback>
                    Please check email again
                        </FormFeedback>
                  <FormText>Password length: minimum 5 characters</FormText>

                </FormGroup>
                {/*<div className="text-muted font-italic">
                  <small>
                    password strength:{" "}
                    <span className="text-success font-weight-700">strong</span>
                  </small>
                </div>
                <Row className="my-4">
                  <Col xs="12">
                    <div className="custom-control custom-control-alternative custom-checkbox">
                      <input
                        className="custom-control-input"
                        id="customCheckRegister"
                        type="checkbox"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="customCheckRegister"
                      >
                        <span className="text-muted">
                          I agree with the{" "}
                          <a href="#pablo" onClick={e => e.preventDefault()}>
                            Privacy Policy
                          </a> 
                          I want to take a tour
                        </span>
                      </label>
                    </div>
                  </Col>
                </Row>*/}
                <div className="text-center">
                  <Button
                    className="mt-4"
                    color="primary"
                    type="button"
                    disabled={!this.validation()}
                    onClick={(e) => this.createNewGuest(e)}
                  >
                    Create account
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
          <Row className="mt-3">
            <Col xs="6">
              <NavLink
                className="text-light"
                className="nav-link-icon"
                to="/auth/password-token"
                tag={Link}
              >
                <font className="text-light" ><small>Forgot password ?</small></font>

              </NavLink>
            </Col>
            <Col className="text-right" xs="6">
              <NavLink
                className="text-light"
                className="nav-link-icon"
                to="/auth/login"
                tag={Link}
              >
                <font className="text-light" ><small>Sign in !</small></font>

              </NavLink>

            </Col>
          </Row>
        </Col>
      </>
    );
  }
}

export default Register;
