// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  FormFeedback,
  FormText
} from "reactstrap";
//  reactstrap component
import {

} from "reactstrap";

//  pure component: memo
import React, { memo, useState } from "react";

const uuidv1 = require("uuid/v1");
const Profile = ({ fromProps }) => {
  let {
    employee: {
      id,
      active,
      address,
      asp_net_user_id,
      email,
      name,
      phone,
      role,
      asp_net_user,
      manage_project = [] },

    validateName,
    validatePhone,
    validateAddress,

    listLog = [],
    listApplication = [],
    listApplicationInstance = []

  } = fromProps;
  console.log("listlist " + JSON.stringify(manage_project.filter(pj => pj.application_instance_id !== 22)));
  const achivement = {
    application: manage_project.filter(pj => pj.application_instance_id === 22),
    applicationInstance: manage_project.filter(pj => pj.application_id === 22),
    log: listLog.length

  }

  //  Ref section
  //  Information
  const nameRef = React.createRef();
  const addressRef = React.createRef();
  const phoneRef = React.createRef();

  //  State for validation
  const [nameValidation, setNameValidation] = useState(true);
  const [addressValidation, setAddressValidation] = useState(true);
  const [phoneValidation, setPhoneValidation] = useState(true);

  //  Update state for validation from each input
  const checkValidation = async event => {
    const name = event.target.name;
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;

    switch (name) {
      case "name":
        console.log(value);
        setNameValidation(validateName({ [name]: value }));
        break;

      case "address":
        console.log(value);
        setAddressValidation(validateAddress({ [name]: value }));
        break;

      case "phone":
        console.log(value);
        setPhoneValidation(validatePhone({ [name]: value }));
        break;

      default:
        break;
    }
  };

  //  validation 
  const validateUpdate = () => {
    return nameValidation &&
      addressValidation &&
      phoneValidation

      ;
  }

  //  update section
  const updateProfile = e => {
    e.preventDefault();
    let updateModel = {
      id: id,
      email: email,
      address: addressRef.current.value,
      name: nameRef.current.value,
      phone: phoneRef.current.value
    }
    fromProps.updateProfile(updateModel);
  }

  return (
    <>
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <a
                    // href="#pablo" onClick={e => e.preventDefault()}
                    >
                      <img
                        alt="..."
                        className="rounded-circle"
                        src={require("assets/img/theme/team-4-800x800.jpg")}
                      />
                    </a>
                  </div>
                </Col>
              </Row>
              <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                <div className="d-flex justify-content-between">
                  <Button
                    className="mr-4"
                    color="info"
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                    size="sm"
                    disabled
                  >
                    {/* Connect */}
                  </Button>
                  <Button
                    className="float-right"
                    color="default"
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                    size="sm"
                    disabled
                  >
                    {/* Message */}
                  </Button>
                </div>
              </CardHeader>
              <CardBody className="pt-0 pt-md-4">
                <Row>
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                      <div>
                        <span className="heading">{achivement.application.length}</span>
                        <span className="description">Application</span>
                      </div>
                      <div>
                        <span className="heading">{achivement.applicationInstance.length}</span>
                        <span className="description">Application Instance</span>
                      </div>
                      <div>
                        <span className="heading">{achivement.log}</span>
                        <span className="description">Error Solve</span>
                      </div>
                    </div>
                  </div>
                </Row>
                <div className="text-center">
                  <h3>
                    {name}
                    <span className="font-weight-light">, 27</span>
                  </h3>
                  <div className="h5 font-weight-300">
                    <i className="ni location_pin mr-2" />
                      Vietname
                      </div>
                  <hr />
                  <h3>APPLICATION</h3>
                  {listApplication.map(app => {
                    return achivement.application.map(achi => {
                      return achi.application_id === app.id ?
                        <div className="h5 mt-4">
                          <i className="ni business_briefcase-24 mr-2" />
                          <font color={"blue"}>{app.name}</font>
                        </div> : null;
                    })
                  })}
                  <hr />
                  <h3>APPLICATION INSTANCE</h3>
                  {listApplicationInstance.map(appIns => {
                    return achivement.applicationInstance.map(achi => {
                      return achi.application_instance_id === appIns.id ?
                        <div className="h5 mt-4">
                          <i className="ni business_briefcase-24 mr-2" />
                          <font color={"green"}>{appIns.name}</font>
                        </div> : null;
                    })
                  })}
                  {/* <hr className="my-4" />

                  <a href="#pablo" onClick={e => e.preventDefault()}>
                    Change Password
                    </a> */}
                </div>
              </CardBody>
            </Card>
          </Col>

          <Col className="order-xl-1" xl="8">
            <Form>
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">My account</h3>
                    </Col>
                    <Col className="text-right" xs="4">
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={e => updateProfile(e)}
                        size="sm"
                        disabled={!validateUpdate()}
                      >
                        Update
                      </Button>
                    </Col>                    
                  </Row>
                </CardHeader>
                <CardBody>

                  <h6 className="heading-small text-muted mb-4">
                    User information
                    </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Userame
                            </label>
                          <Input
                            onChange={event => checkValidation(event)}
                            className="form-control-alternative"
                            id="input-username"
                            placeholder="Username"
                            innerRef={nameRef}
                            defaultValue={name}
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Role
                            </label>
                          <Input
                            className="form-control-alternative"
                            onChange={event => checkValidation(event)}
                            id="input-email"
                            placeholder="jesse@example.com"
                            defaultValue={role === 1 ? "Adminstrator" : role === 2 ? "Manager" : role === 5 ? "Guest" : "Developer"}
                            type="text"
                            disabled
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    {/* <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                              First name
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue="Lucky"
                              id="input-first-name"
                              placeholder="First name"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              Last name
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue="Jesse"
                              id="input-last-name"
                              placeholder="Last name"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row> */}
                  </div>
                  <hr className="my-4" />
                  {/* Address */}
                  <h6 className="heading-small text-muted mb-4">
                    Contact information
                    </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-address"
                          >
                            Address
                            </label>
                          <Input
                            className="form-control-alternative"
                            onChange={event => checkValidation(event)}
                            id="input-address"
                            placeholder="Home Address"
                            innerRef={addressRef}
                            defaultValue={address}
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-address"
                          >
                            Email
                            </label>
                          <Input
                            className="form-control-alternative"
                            onChange={event => checkValidation(event)}
                            id="input-address"
                            placeholder="Home Address"
                            defaultValue={email}
                            type="email"
                            disabled
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-address"
                          >
                            Phone number
                            </label>
                          <Input
                            className="form-control-alternative"
                            onChange={event => checkValidation(event)}
                            innerRef={phoneRef}
                            id="input-address"
                            placeholder="Home Address"
                            defaultValue={phone}
                            type="number"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    {/* <Row>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-city"
                            >
                              City
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue="New York"
                              id="input-city"
                              placeholder="City"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-country"
                            >
                              Country
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue="United States"
                              id="input-country"
                              placeholder="Country"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-country"
                            >
                              Postal code
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-postal-code"
                              placeholder="Postal code"
                              type="number"
                            />
                          </FormGroup>
                        </Col>
                      </Row> */}
                  </div>
                  {/* <hr className="my-4" />
                  <h6 className="heading-small text-muted mb-4">About me</h6>
                  <div className="pl-lg-4">
                    <FormGroup>
                      <label>About Me</label>
                      <Input
                        className="form-control-alternative"
                        placeholder="A few words about you ..."
                        rows="4"
                        defaultValue="A beautiful Dashboard for Bootstrap 4. It is Free and Open Source."
                        type="textarea"
                      />
                    </FormGroup>
                  </div> */}

                </CardBody>
              </Card>
            </Form>
          </Col>
        </Row>
      </Container>

    </>
  );
}


const arePropsEqual = (prevProps, nextProps) => {
  return prevProps === nextProps;
};
// Wrap component using `React.memo()` and pass `arePropsEqual`
export default memo(Profile, arePropsEqual);

