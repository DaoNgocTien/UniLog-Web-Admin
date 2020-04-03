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
  FormText,
} from "reactstrap";
//  pure component: memo
import React, { memo, useState } from "react";

//const uuidv1 = require("uuid/v1");

const ServerRegistrationModal = ({ fromProps }) => {
  let {
    modal,
    toggleCreateModal,
    validateServerCode,
    validateServerName,
    validateServerTypeAndOS,

    role,


  } = fromProps;

  console.log("Create Modal Presentation ", fromProps);
  //  close button
  const closeBtn = (
    <button className="close" onClick={toggleCreateModal}>
      &times;
    </button>
  );

  //  ref to general information
  const serverCodeRef = React.createRef();
  const serverNameRef = React.createRef();
  const serverOsSelectRef = React.createRef();
  const serverTypeSelectRef = React.createRef();

  //  Validation state
  //  General information
  const [serverCodeValidation, setServerCodeValidation] = useState(true);
  const [serverNameValidation, setServerNameValidation] = useState(true);
  const [serverOsSelectValidation, setServerOsSelectValidation] = useState(
    true
  );

  //  validate value from each input and store value into state
  const checkValidation = async event => {
    const name = event.target.name;
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;

    switch (name) {
      case "serverCode":
        setServerCodeValidation(validateServerCode({ [name]: value }));
        break;

      case "serverName":
        setServerNameValidation(validateServerName({ [name]: value }));
        break;

      case "serverOsSelect":
        let condition = {
          serverTypeSelect: serverTypeSelectRef.current.value
            ? serverTypeSelectRef.current.value
            : 1,
          [name]: parseInt(value)
        };
        setServerOsSelectValidation(validateServerTypeAndOS(condition));
        break;

      case "serverTypeSelect":
        condition = {
          [name]: parseInt(value),
          serverOsSelect: serverOsSelectRef.current.value
            ? serverOsSelectRef.current.value
            : 1
        };
        setServerOsSelectValidation(validateServerTypeAndOS(condition));
        break;

      default:
        break;
    }
  };

  //  check validation
  const validation = () => {
    return (
      serverCodeValidation &&
      serverNameValidation &&
      serverOsSelectValidation
    );
  };


  //  update server information
  const createNewServer = event => {
    event.preventDefault();
    alert("2")
    const server = {
      name: serverNameRef.current.value,
      os: serverOsSelectRef.current.value,
      server_code: serverCodeRef.current.value,
      type: serverTypeSelectRef.current.value,
    };
    fromProps.createNewServer(server);
  };

  return (
    <div>
      <Modal
        isOpen={modal}
        toggle={toggleCreateModal}
        // modalTransition={{ timeout: 1000 }}
        // backdropTransition={{ timeout: 1500 }}
        className={`modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable`}
      >
        <ModalHeader toggle={() => this.toggle()} close={closeBtn}>
          SERVER REGISTRATION
        </ModalHeader>
        <ModalBody>
          <Form>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="serverName">Server Name</Label>
                  <Input
                    onChange={event => checkValidation(event)}
                    type="text"
                    name="serverName"
                    id="serverName"
                    placeholder="Server Name is required"
                    //defaultValue={name}
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
                  <Label for="serverCode">Server Code</Label>
                  <Input
                    onChange={event => checkValidation(event)}
                    type="text"
                    name="serverCode"
                    //id="serverCode"
                    placeholder="Server Code is required"
                    //defaultValue={server_code}
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

            <FormGroup>
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

            <FormGroup>
              <Label for="serverOsSelect">Choose Operation System</Label>
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
              <FormFeedback>
                Invalid Server Type, check guidance
                    </FormFeedback>
              <FormText>
                Physical / Cloud Web Server can only be Windows or Linux
                    </FormText>
              <FormText>
                Repository Server can only be Azure Git / GitHub / GitLab
                / Other Git
                    </FormText>
              <FormText>
                Database Serverr can only be Microsoft SQL / MongoDB /
                FirebaseDB / Other DB
                    </FormText>
            </FormGroup>

          </Form>
        </ModalBody>
        <ModalFooter>
          {" "}
          <Button
            disabled={!validation()}
            color="primary"
            onClick={e => createNewServer(e)}
          >
            Create New Server
                  </Button>
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
export default memo(ServerRegistrationModal, arePropsEqual);
