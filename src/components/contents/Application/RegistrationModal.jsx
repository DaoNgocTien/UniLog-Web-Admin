//  reactstrap component
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Col,
  Row,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  FormText
} from "reactstrap";

//  pure component: memo
import React, { memo, useState } from "react";

const uuidv1 = require("uuid/v1");

const NewServerModalPresentation = ({ fromProps }) => {
  let {
    modal,
    toggleCreateModal,
    serverMasterList,
    createNewServer,

    validateIPaddress,
    validateServerCode,
    validateServerName,
    validateServerUrl,
    validateServerDescription,
    validateExpiredDate,
    validateServerTypeAndOS
  } = fromProps;

  //  close button
  const closeBtn = (
    <button className="close" onClick={toggleCreateModal}>
      &times;
    </button>
  );

  //  ref to each input
  const serverMasterSellectRef = React.createRef();
  const serverIpAddressRef = React.createRef();
  const serverCodeRef = React.createRef();
  const serverNameRef = React.createRef();
  const serverExpiredDateRef = React.createRef();
  const serverUrlRef = React.createRef();
  const serverDescriptionRef = React.createRef();
  const serverOsSelectRef = React.createRef();
  const serverTypeSelectRef = React.createRef();
  const serverMasterRegistrationRef = React.createRef();

  //  validation state
  const [serverIpAddressValidation, setServerIpAddressValidation] = useState(
    null
  );
  const [serverCodeValidation, setServerCodeValidation] = useState(null);
  const [serverNameValidation, setServerNameValidation] = useState(null);
  const [
    serverExpiredDateValidation,
    setServerExpiredDateValidation
  ] = useState(null);
  const [serverUrlValidation, setServerUrlValidation] = useState(null);
  const [
    serverDescriptionValidation,
    setServerDescriptionValidation
  ] = useState(null);
  const [serverOsSelectValidation, setServerOsSelectValidation] = useState(
    null
  );

  //  validate value from each input and store value into state
  const checkValidation = async event => {
    const name = event.target.name;
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;

    switch (name) {
      case "serverIpAddress":
        setServerIpAddressValidation(validateIPaddress({ [name]: value }));
        break;

      case "serverCode":
        setServerCodeValidation(validateServerCode({ [name]: value }));
        break;

      case "serverName":
        setServerNameValidation(validateServerName({ [name]: value }));
        break;

      case "serverUrl":
        setServerUrlValidation(validateServerUrl({ [name]: value }));
        break;

      case "serverDescription":
        setServerDescriptionValidation(
          validateServerDescription({
            [name]: value
          })
        );
        break;

      case "serverExpiredDate":
        setServerExpiredDateValidation(validateExpiredDate({ [name]: value }));
        break;

      case "serverOsSelect":
        let condition = {
          serverTypeSelect: serverTypeSelectRef.current.value,
          [name]: parseInt(value)
        };
        setServerOsSelectValidation(validateServerTypeAndOS(condition));
        break;

      case "serverTypeSelect":
        condition = {
          [name]: parseInt(value),
          serverOsSelect: serverOsSelectRef.current.value
        };
        setServerOsSelectValidation(validateServerTypeAndOS(condition));
        break;

      default:
        break;
    }

    // console.log(
    //   "serverIpAddressValidation ",
    //   serverIpAddressValidation == null ? true : serverIpAddressValidation
    // );
    // console.log("serverCodeValidation ", serverCodeValidation);
    // console.log("serverNameValidation ", serverNameValidation);
    // console.log(
    //   "serverExpiredDateValidation ",
    //   serverExpiredDateValidation == null ? true : serverExpiredDateValidation
    // );
    // console.log(
    //   "serverUrlValidation ",
    //   serverUrlValidation == null ? true : serverUrlValidation
    // );
    // console.log(
    //   "serverDescriptionValidation ",
    //   serverDescriptionValidation == null ? true : serverDescriptionValidation
    // );
    // console.log(
    //   "serverOsSelectValidation ",
    //   serverOsSelectValidation == null ? true : serverOsSelectValidation
    // );
    // let validationValue =
    //   (serverIpAddressValidation == null ? true : serverIpAddressValidation) &&
    //   serverCodeValidation &&
    //   serverNameValidation &&
    //   (serverExpiredDateValidation == null
    //     ? true
    //     : serverExpiredDateValidation) &&
    //   (serverUrlValidation == null ? true : serverUrlValidation) &&
    //   (serverDescriptionValidation == null
    //     ? true
    //     : serverDescriptionValidation) &&
    //   (serverOsSelectValidation == null ? true : serverOsSelectValidation);
  };

  //  check validation
  const validation = () => {
    return (
      (serverIpAddressValidation == null ? true : serverIpAddressValidation) &&
      (serverCodeValidation == null ? false : serverCodeValidation) &&
      (serverNameValidation == null ? false : serverNameValidation) &&
      (serverExpiredDateValidation == null
        ? true
        : serverExpiredDateValidation) &&
      (serverUrlValidation == null ? true : serverUrlValidation) &&
      (serverDescriptionValidation == null
        ? true
        : serverDescriptionValidation) &&
      (serverOsSelectValidation == null ? true : serverOsSelectValidation)
    );
  };

  //  create new server
  const createServer = event => {
    event.preventDefault();
    const server = {
      description: serverDescriptionRef.current.value,
      expired_date: serverExpiredDateRef.current.value,
      ip_address: serverIpAddressRef.current.value,
      server_name: serverNameRef.current.value,
      os: serverOsSelectRef.current.value,
      server_code: serverCodeRef.current.value,
      server_master: serverMasterSellectRef.current.value,
      server_url: serverUrlRef.current.value,
      type: serverTypeSelectRef.current.value,
      server_master_registration: serverMasterRegistrationRef.current.checked
    };
    createNewServer(server);
  };

  //alert("New server ")
  return (
    <div>
      <Modal
        isOpen={modal}
        toggle={toggleCreateModal}
        // modalTransition={{ timeout: 1000 }}
        // backdropTransition={{ timeout: 1500 }}
        className={`modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable`}
      >
        <ModalHeader toggle={toggleCreateModal} close={closeBtn}>
          APPLICATION REGISTRATION
        </ModalHeader>
        <ModalBody>
          <Form>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="serverIpAddress">Application Name</Label>
                  <Input
                    onChange={event => checkValidation(event)}
                    type="text"
                    name="serverIpAddress"
                    id="serverIpAddress"
                    placeholder="IP Address"
                    innerRef={serverIpAddressRef}
                    valid={serverIpAddressValidation}
                    invalid={
                      serverIpAddressValidation == null
                        ? false
                        : !serverIpAddressValidation
                    }
                    required
                  />
                  <FormFeedback
                  // valid={
                  //   this.validateIPaddress(this.state)
                  // }
                  // tooltip
                  >
                    Invalid IP Address
                  </FormFeedback>
                  <FormText>Eq: 192.168.1.1</FormText>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <div className="position-relative form-group">
                    <Label for="serverExpiredDate">Start Date</Label>
                    <Input
                      onChange={event => checkValidation(event)}
                      type="datetime-local"
                      className="form-control fg-input"
                      id="serverExpiredDate"
                      name="serverExpiredDate"
                      innerRef={serverExpiredDateRef}
                      valid={serverExpiredDateValidation}
                      invalid={
                        serverExpiredDateValidation == null
                          ? false
                          : !serverExpiredDateValidation
                      }
                      defaultValue={new Date(Date.now())
                        .toISOString()
                        .slice(0, 23)}
                    />
                    <FormFeedback>
                      Server Expired Date must be after current day
                    </FormFeedback>
                    <FormText>Server Expired Date</FormText>
                  </div>
                </FormGroup>
              </Col>
            </Row>

            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="serverName">Application Link</Label>
                  <Input
                    onChange={event => checkValidation(event)}
                    type="text"
                    name="serverName"
                    id="serverName"
                    placeholder="Server Name is required"
                    innerRef={serverNameRef}
                    valid={serverNameValidation}
                    invalid={
                      serverNameValidation == null
                        ? false
                        : !serverNameValidation
                    }
                  />
                  <FormFeedback>Invalid Server Name</FormFeedback>
                  <FormText>Max length is 10</FormText>
                </FormGroup>
              </Col>

              <Col md={6}>
                <FormGroup>
                  <div className="position-relative form-group">
                    <Label for="serverExpiredDate">Expired Date</Label>
                    <Input
                      onChange={event => checkValidation(event)}
                      type="datetime-local"
                      className="form-control fg-input"
                      id="serverExpiredDate"
                      name="serverExpiredDate"
                      innerRef={serverExpiredDateRef}
                      valid={serverExpiredDateValidation}
                      invalid={
                        serverExpiredDateValidation == null
                          ? false
                          : !serverExpiredDateValidation
                      }
                      defaultValue={new Date(Date.now())
                        .toISOString()
                        .slice(0, 23)}
                    />
                    <FormFeedback>
                      Server Expired Date must be after current day
                    </FormFeedback>
                    <FormText>Server Expired Date</FormText>
                  </div>
                </FormGroup>
              </Col>
            </Row>

            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="serverCode">Technology</Label>
                  <Input
                    onChange={event => checkValidation(event)}
                    type="text"
                    name="serverCode"
                    id="serverCode"
                    placeholder="Server Code is required"
                    innerRef={serverCodeRef}
                    valid={serverCodeValidation}
                    invalid={
                      serverCodeValidation == null
                        ? false
                        : !serverCodeValidation
                    }
                  />
                  <FormFeedback>Invalid Server Code</FormFeedback>
                  <FormText>Max length is 10</FormText>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="serverCode">Team</Label>
                  <Input
                    onChange={event => checkValidation(event)}
                    type="text"
                    name="serverCode"
                    id="serverCode"
                    placeholder="Server Code is required"
                    innerRef={serverCodeRef}
                    valid={serverCodeValidation}
                    invalid={
                      serverCodeValidation == null
                        ? false
                        : !serverCodeValidation
                    }
                  />
                  <FormFeedback>Invalid Server Code</FormFeedback>
                  <FormText>Max length is 10</FormText>
                </FormGroup>
              </Col>
            </Row>

            <div style={{border: '0.05px solid', padding: '10px', borderRadius: '15px'}}>
              <Label for="informationSection">Information</Label>
              <FormGroup id="informationSection">
                <div className="position-relative form-group">
                  <Label for="serverMasterSelect">Choose System</Label>
                  <Input
                    type="select"
                    id="serverMasterSelect"
                    name="serverMasterSelect"
                    innerRef={serverMasterSellectRef}
                  >
                    <option value={0}>Choose Server Master</option>
                    {serverMasterList
                      ? serverMasterList.map(server => {
                          return (
                            <option key={uuidv1()} value={server.id}>
                              {server.name}
                            </option>
                          );
                        })
                      : null}
                  </Input>
                  <FormText>Choose an exist server as server master</FormText>
                </div>
              </FormGroup>
              <FormGroup id="informationSection">
                <Label for="serverMasterSelect">Choose Category</Label>
                <Input
                  type="select"
                  id="serverMasterSelect"
                  name="serverMasterSelect"
                  innerRef={serverMasterSellectRef}
                >
                  <option value={0}>Choose Server Master</option>
                  {serverMasterList
                    ? serverMasterList.map(server => {
                        return (
                          <option key={uuidv1()} value={server.id}>
                            {server.name}
                          </option>
                        );
                      })
                    : null}
                </Input>
                <FormText>Choose an exist server as server master</FormText>
              </FormGroup>

              <FormGroup id="informationSection">
                <Label for="serverTypeSelect">Choose Type</Label>
                <Input
                  type="select"
                  id="serverTypeSelect"
                  name="serverTypeSelect"
                  defaultValue={1}
                  onChange={event => checkValidation(event)}
                  innerRef={serverTypeSelectRef}
                >
                  <option value="1">Physical Web Server</option>
                  <option value="2">Cloud Web Server</option>
                  <option value="3">Repository Server</option>
                  <option value="4">Database Server</option>
                </Input>
              </FormGroup>

              <FormGroup id="informationSection">
                <Label for="serverOsSelect">Choose Origin</Label>
                <Input
                  type="select"
                  id="serverOsSelect"
                  name="serverOsSelect"
                  defaultValue={1}
                  onChange={event => checkValidation(event)}
                  innerRef={serverOsSelectRef}
                  valid={serverOsSelectValidation}
                  invalid={
                    serverOsSelectValidation == null
                      ? false
                      : !serverOsSelectValidation
                  }
                >
                  <option value="1">Windows Os</option>
                  <option value="2">Linux Os</option>
                  <option value="3">Azure Git</option>
                  <option value="4">GitHub</option>
                  <option value="5">GitLab</option>
                  <option value="6">Other Git</option>
                  <option value="7">Microsoft SQL</option>
                  <option value="8">MongoDB</option>
                  <option value="9">FirebaseDB</option>
                  <option value="10">Other DB</option>
                </Input>
                <FormFeedback>Invalid Server Type, check guidance</FormFeedback>
                <FormText>
                  Physical / Cloud Web Server can only be Windows or Linux
                </FormText>
                <FormText>
                  Repository Server can only be Azure Git / GitHub / GitLab /
                  Other Git
                </FormText>
                <FormText>
                  Database Serverr can only be Microsoft SQL / MongoDB /
                  FirebaseDB / Other DB
                </FormText>
              </FormGroup>
            </div>

            <div style={{border: '0.05px solid', padding: '10px', borderRadius: '15px'}}>
              <Label for="statusSection">Information</Label>
              <FormGroup id="statusSection">
                <Label for="serverMasterSelect">Choose Stage</Label>
                <Input
                  type="select"
                  id="serverMasterSelect"
                  name="serverMasterSelect"
                  innerRef={serverMasterSellectRef}
                >
                  <option value={0}>Choose Server Master</option>
                  {serverMasterList
                    ? serverMasterList.map(server => {
                        return (
                          <option key={uuidv1()} value={server.id}>
                            {server.name}
                          </option>
                        );
                      })
                    : null}
                </Input>
                <FormText>Choose an exist server as server master</FormText>
              </FormGroup>

              <FormGroup id="statusSection">
                <Label for="serverMasterSelect">Choose Priority</Label>
                <Input
                  type="select"
                  id="serverMasterSelect"
                  name="serverMasterSelect"
                  innerRef={serverMasterSellectRef}
                >
                  <option value={0}>Choose Server Master</option>
                  {serverMasterList
                    ? serverMasterList.map(server => {
                        return (
                          <option key={uuidv1()} value={server.id}>
                            {server.name}
                          </option>
                        );
                      })
                    : null}
                </Input>
                <FormText>Choose an exist server as server master</FormText>
              </FormGroup>

              <FormGroup id="statusSection">
                <Label for="serverMasterSelect">Choose Status</Label>
                <Input
                  type="select"
                  id="serverMasterSelect"
                  name="serverMasterSelect"
                  innerRef={serverMasterSellectRef}
                >
                  <option value={0}>Choose Server Master</option>
                  {serverMasterList
                    ? serverMasterList.map(server => {
                        return (
                          <option key={uuidv1()} value={server.id}>
                            {server.name}
                          </option>
                        );
                      })
                    : null}
                </Input>
                <FormText>Choose an exist server as server master</FormText>
              </FormGroup>
            </div>

            <FormGroup>
              <Label for="serverUrl">Source Code Url</Label>
              <Input
                onChange={event => checkValidation(event)}
                type="text"
                name="serverUrl"
                id="serverUrl"
                placeholder="https://www.localhost:8084"
                innerRef={serverUrlRef}
                valid={serverUrlValidation}
                invalid={
                  serverUrlValidation == null ? false : !serverUrlValidation
                }
              />
              <FormFeedback>Invalid Server Url</FormFeedback>
              <FormText>Eq: www.google.com</FormText>
            </FormGroup>

            <FormGroup>
              <Label for="serverDescription">Description</Label>
              <Col sm={12}>
                <Input
                  onChange={event => checkValidation(event)}
                  type="textarea"
                  name="serverDescription"
                  id="serverDescription"
                  innerRef={serverDescriptionRef}
                  valid={serverDescriptionValidation}
                  invalid={
                    serverDescriptionValidation == null
                      ? false
                      : !serverDescriptionValidation
                  }
                />
              </Col>
              <FormText>Max length is 256</FormText>
            </FormGroup>

            <FormGroup check>
              <Input
                type="checkbox"
                name="serverMasterRegistration"
                id="serverMasterRegistration"
                innerRef={serverMasterRegistrationRef}
              />
              <Label for="serverMaster" check>
                Active
              </Label>
              <FormText>New Server can be server master</FormText>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            disabled={!validation()}
            color="primary"
            onClick={e => createServer(e)}
          >
            Create New Application
          </Button>{" "}
          <Button color="secondary" onClick={toggleCreateModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

const arePropsEqual = (prevProps, nextProps) => {
  return prevProps === nextProps;
};
// Wrap component using `React.memo()` and pass `arePropsEqual`
export default memo(NewServerModalPresentation, arePropsEqual);
