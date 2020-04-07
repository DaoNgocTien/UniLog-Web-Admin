import React from "react";
//  react router
import { Link } from "react-router-dom";

//  set up proptype
import PropTypes from "prop-types";
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
  NavLink,
  FormFeedback,
  FormText,
} from "reactstrap";
// import { Redirect } from "react-router-dom";

import { connect } from "react-redux";
import {
  withRouter
} from "react-router-dom";
import Action from "../../../redux/Action/index.js";

//  presentation component
// import Register from "./Register.jsx";

//const uuidv1 = require("uuid/v1");

//  compose function:
//  - (...fns): array all function need to compose
//  - x: collection / input value
//  - reduceRight: array loop function, from right to left (last -> last - 1 -> last - 2 -> ...)
//  =>  (y, f) => f(y), x === (previousValue, currentFunction) => currentFunction(previousValue), x
//  =>  take last function in collectionFunction fns, use innitial value x, return value (y)
//  =>  [a, b, c] => reduceRight((y, f) => f(y), x) === a(b(c))
const compose = (...fns) => x => fns.reduceRight((y, f) => f(y), x);

//  Validation secction
//  Email validation
const validateEmail = ({
  email = "https://www.google.com"
}) => {
  console.log("Validate email " + email)
  let regex = new RegExp(
    "^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|(www\\.)?){1}([0-9A-Za-z-\\.@:%_+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?"
  );
  return regex.test(email) || email.length === 0;
};


//  propType
const propsProTypes = {
  //  validation func
  validateEmail: PropTypes.func,
};

const propsDefault = {
  validateEmail: validateEmail,
};

class PasswordResetToken extends React.Component {
  static propTypes = propsProTypes;
  static defaultProps = propsDefault;
  state = {
    emailValidation: null,
    email: ""
  };

  //  validate value from each input and store value into state
  isChange = async event => {
    const name = event.target.name;
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    this.setState({
      ...this.state,
      [name]: value,
      emailValidation: this.props.validateEmail({ [name]: value })
    });
    console.log(name + " " + value);
  };

  //  check validation
  validation = () => {
    return (
      (this.state.emailValidation == null
        ? false
        : this.state.emailValidation)
    );
  };

  //  create new employee
  requestResetPassword = event => {
    event.preventDefault();
    this.props.requestResetPassword(this.state.email);
  };

  render() {
    return (
      <>
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-transparent pb-5">
              {/* <div className="text-muted text-center mt-2 mb-3">
                <small>Sign in with</small>
              </div>
              <div className="btn-wrapper text-center">
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
              </div>*/}
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <small>Enter your email please</small>
              </div>
              <Form role="form">
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

                <div className="text-center">
                  <Button
                    className="mt-4"
                    color="primary"
                    type="button"
                    disabled={!this.validation()}
                    onClick={(e) => this.requestResetPassword(e)}
                  >
                    Get authenticate token
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
          <Row className="mt-3">
            <Col xs="6">
              <NavLink
                className="nav-link-icon text-light"
                to="/auth/login"
                tag={Link}
              >
                <font className="text-light" ><small>Sign in !</small></font>

              </NavLink>
            </Col>
            <Col className="text-right" xs="6">
              <NavLink
                className="text-light"
                className="nav-link-icon"
                to="/auth/register"
                tag={Link}
              >
                <font className="text-light" ><small>Create new account</small></font>

              </NavLink>

            </Col>
          </Row>
        </Col>
      </>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    own: ownProps
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({

  requestResetPassword: async (email) => {
    if (email) {
      await dispatch(Action.Employee.requestResetPassword(email));
    }
  },

  dispatch
});

//  compose all redux HOC
const enhance = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps, null)
);

export default enhance(PasswordResetToken);
