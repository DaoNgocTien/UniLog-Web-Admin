//  reactstrap component
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
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

const ApplicationInstanceRegistrationModal = ({ fromProps }) => {
  let {
    modal,
    toggleCreateModal,
    applicationList = [],
    createNewApplicationInstance,

    validateName,
    validateAppCode,
  } = fromProps;

  //  close button
  const closeBtn = (
    <button className="close" onClick={toggleCreateModal}>
      &times;
    </button>
  );

  //  ref to each input
  const appCodeRef = React.createRef();
  const nameRef = React.createRef();
  const applicationSelectRef = React.createRef();

  //  validation state
  const [nameValidation, setNameValidation] = useState(
    null
  );
  const [
    appCodeValidation,
    setAppCodeValidation
  ] = useState(null);

  //  validate value from each input and store value into state
  const checkValidation = async event => {
    const name = event.target.name;
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;

    switch (name) {
      case "name":
        setNameValidation(validateName({ [name]: value }));
        break;

      case "appCode":
        setAppCodeValidation(validateAppCode({ [name]: value }));
        break;

      default:
        break;
    }


  };

  //  check validation
  const validation = () => {
    return (
      (nameValidation == null ? true : nameValidation) &&
      (appCodeValidation == null
        ? true
        : appCodeValidation)
    );
  };

  //  create new application instance
  const create = event => {
    event.preventDefault();
    const application = {
      name: nameRef.current.value,
      app_code: appCodeRef.current.value,
      application_id: applicationSelectRef.current.value,
    };
    createNewApplicationInstance(application);
  };

  //alert("New Application ")
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
          APPLICATION INSTANCE REGISTRATION
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
                innerRef={nameRef}
                valid={nameValidation}
                invalid={
                  nameValidation == null
                    ? false
                    : !nameValidation
                }
                required
              />
              <FormFeedback
              >
                Invalid Application Instance Name
                  </FormFeedback>
              <FormText>Name is required, minimum length is 5</FormText>
            </FormGroup>
            <FormGroup>
              <Label for="appCode">App Code</Label>
              <Input
                onChange={event => checkValidation(event)}
                type="text"
                name="appCode"
                id="appCode"
                placeholder="Application code"
                innerRef={appCodeRef}
                valid={appCodeValidation}
                invalid={
                  appCodeValidation == null
                    ? false
                    : !appCodeValidation
                }
                required
              />
              <FormFeedback
              // valid={
              //   this.validateIPaddress(this.state)
              // }
              // tooltip
              >
                Invalid App Code
                  </FormFeedback>
              <FormText>App Code is required, minimum length is 5</FormText>
            </FormGroup>


            <FormGroup id="applicationSelect">
              <Label for="applicationSelect">Application</Label>
              <Input
                type="select"
                id="applicationSelect"
                name="applicationSelect"
                innerRef={applicationSelectRef}
              >
                {/* <option value={0}>Choose Application</option> */}
                {applicationList && applicationList.length ?
                  applicationList.map(application => {
                    return <option key={uuidv1()} value={application.id}>{application.name}</option>
                  }) : null
                }

              </Input>
              {/* <FormText>Choose an exist application as application master</FormText> */}
            </FormGroup>

          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            disabled={!validation()}
            color="primary"
            onClick={e => create(e)}
          >
            Create New ApplicationInstance
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
export default memo(ApplicationInstanceRegistrationModal, arePropsEqual);
