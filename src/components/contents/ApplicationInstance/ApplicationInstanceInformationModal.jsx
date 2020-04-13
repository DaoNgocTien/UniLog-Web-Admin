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
  //Button
} from "reactstrap";
//  pure component: memo
import React, { memo, useState } from "react";


const uuidv1 = require("uuid/v1");

const ApplicationInstanceInformationModal = ({ fromProps }) => {
  let {
    modal,
    toggleInformationModal,
    applicationList = [],
    appInsList,
    validateName,
    validateAppCode,
    validateVersion,
    validateDescription,
    validateConfigUrl,
    validateReleaseUrl,

    applicationInstance: {
      id = 1,
      application_version = 0,
      config_url = "string",
      description = "string",
      name = "string",
      release_url = "string",
      app_code = "string",
      app_id
    }
  } = fromProps;

  //  close button
  const closeBtn = (
    <button className="close" onClick={toggleInformationModal}>
      &times;
    </button>
  );

  //  ref to general information
  const nameRef = React.createRef();
  const appCodeRef = React.createRef();
  const versionRef = React.createRef();
  const configUrlRef = React.createRef();
  const releaseUrlRef = React.createRef();
  const descriptionRef = React.createRef();

  //  Validation state
  const [nameValidation, setNameValidation] = useState(true);
  const [appCodeValidation, setAppCodeValidation] = useState(true);
  const [versionValidation, setVersionValidation] = useState(true);
  const [configUrlValidation, setConfigUrlValidation] = useState(true);
  const [releaseUrlValidation, setReleaseValidation] = useState(true);
  const [descriptionValidation, setDescriptionValidation] = useState(true);

  //  validate value from each input and store value into state
  const checkValidation = async event => {
    const name = event.target.name;
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;

    switch (name) {
      case "applicationName":
        setNameValidation(validateName({ [name]: value }));
        break;

      case "appCode":
        setAppCodeValidation(validateAppCode({ [name]: value, app_code: app_code, appInsList }));
        break;

      case "version":
        setVersionValidation(validateVersion({ [name]: value }));
        break;

      case "configUrl":
        setConfigUrlValidation(validateConfigUrl({ [name]: value }));
        break;

      case "releaseUrl":
        setReleaseValidation(validateReleaseUrl({ [name]: value }));
        break;

      case "description":
        setDescriptionValidation(validateDescription({ [name]: value }));
        break;

      default:
        break;
    }
  };

  //  check validation
  const generalInformationValidation = () => {
    return nameValidation &&
      appCodeValidation &&
      versionValidation &&
      configUrlValidation &&
      releaseUrlValidation &&
      descriptionValidation;
  };

  //  update application information
  const updateApplicationInstanceInformation = event => {
    event.preventDefault();
    const applicationInstance = {
      "id": id,
      "application_version": versionRef.current.value,
      "config_url": configUrlRef.current.value,
      "description":descriptionRef.current.value,
      "name":nameRef.current.value,
      "release_url": releaseUrlRef.current.value,
      "app_code": appCodeRef.current.value
    };
    fromProps.updateApplicationInstanceGeneralInformation(applicationInstance);
  };

  return (
    <div>
      <Modal
        isOpen={modal}
        toggle={toggleInformationModal}
        // modalTransition={{ timeout: 1000 }}
        // backdropTransition={{ timeout: 1500 }}
        className={`modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable`}
      >
        <ModalHeader toggle={() => this.toggle()} close={closeBtn}>
          ApplicationInstance INFORMATION
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                onChange={event => checkValidation(event)}
                type="text"
                name="name"
                id="name"
                placeholder="Application Instance Name"
                defaultValue={name}
                innerRef={nameRef}
                valid={nameValidation}
                invalid={
                  nameValidation == null
                    ? false
                    : !nameValidation
                }
                required
              />
              <FormFeedback >
                Invalid Application Instance Name
                  </FormFeedback>
              <FormText>Name is required, minimum length is 5</FormText>
            </FormGroup>

            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="appCode">App Code</Label>
                  <Input
                    onChange={event => checkValidation(event)}
                    type="text"
                    name="appCode"
                    id="appCode"
                    placeholder="Application Instance Code"
                    defaultValue={app_code}
                    innerRef={appCodeRef}
                    valid={appCodeValidation}
                    invalid={
                      appCodeValidation == null
                        ? false
                        : !appCodeValidation
                    }
                    required
                  />
                  <FormFeedback  >
                    Invalid App Code
                  </FormFeedback>
                  <FormText>App Code is required, minimum length is 5</FormText>
                </FormGroup>
              </Col>

              <Col md={6}>
                <FormGroup>
                  <Label for="version">Version</Label>
                  <Input
                    onChange={event => checkValidation(event)}
                    type="text"
                    name="version"
                    id="version"
                    placeholder="Version"
                    defaultValue={application_version}
                    innerRef={versionRef}
                    valid={versionValidation}
                    invalid={
                      versionValidation == null
                        ? false
                        : !versionValidation
                    }
                    required
                  />
                  <FormFeedback
                  >
                    Invalid App Code
                  </FormFeedback>
                  <FormText>App Code is required, minimum length is 5</FormText>
                </FormGroup>
              </Col>
            </Row>

            <FormGroup id="applicationSelect">
              <Label for="applicationSelect">Application</Label>
              <Input
                type="select"
                id="applicationSelect"
                name="applicationSelect"
                defaultValue={app_id}
                disabled
              >
                <option value={0}>Choose Application</option>
                {applicationList && applicationList.length ?
                  applicationList.map(application => {
                    return <option key={uuidv1()} value={application.id}>{application.name}</option>
                  }) : null
                }

              </Input>
              {/* <FormText>Choose an exist application as application master</FormText> */}
            </FormGroup>

            <FormGroup>
              <Label for="configUrl">Configuration Url</Label>
              <Input
                onChange={event => checkValidation(event)}
                type="text"
                name="configUrl"
                id="configUrl"
                placeholder="https://www.localhost:8084"
                innerRef={configUrlRef}
                defaultValue={config_url}
                valid={configUrlValidation}
                invalid={
                  configUrlValidation == null
                    ? false
                    : !configUrlValidation
                }
              />
              <FormFeedback>Invalid Configuration Url</FormFeedback>
              <FormText>Eq: www.google.com</FormText>
            </FormGroup>

            <FormGroup>
              <Label for="releaseUrl">Release Url</Label>
              <Input
                onChange={event => checkValidation(event)}
                type="text"
                name="releaseUrl"
                id="releaseUrl"
                defaultValue={release_url}
                placeholder="https://www.localhost:8084"
                innerRef={releaseUrlRef}
                valid={releaseUrlValidation}
                invalid={
                  releaseUrlValidation == null
                    ? false
                    : !releaseUrlValidation
                }
              />
              <FormFeedback>Invalid Release Url</FormFeedback>
              <FormText>Eq: www.google.com</FormText>
            </FormGroup>

            <FormGroup>
              <Label for="description">Description</Label>
              <Col sm={12}>
                <Input
                  onChange={event => checkValidation(event)}
                  type="textarea"
                  name="description"
                  id="description"
                  innerRef={descriptionRef}
                  valid={descriptionValidation}
                  invalid={
                    descriptionValidation == null
                      ? false
                      : !descriptionValidation
                  }
                  defaultValue={description}
                />
              </Col>
              <FormText>Max length is 256</FormText>
            </FormGroup>

          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            disabled={!generalInformationValidation()}
            color="primary"
            onClick={e => updateApplicationInstanceInformation(e)}
          >
            Update Application Instance
                  </Button>
          {" "}
          <Button color="secondary" onClick={toggleInformationModal}>
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
export default memo(ApplicationInstanceInformationModal, arePropsEqual);
