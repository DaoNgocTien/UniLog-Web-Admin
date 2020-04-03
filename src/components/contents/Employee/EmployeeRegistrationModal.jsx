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

const EmployeeRegistrationModal = ({ fromProps }) => {
  let {
    modal,
    toggleCreateModal,

    validateName,
    validateEmail,
  } = fromProps;

  //  close button
  const closeBtn = (
    <button className="close" onClick={toggleCreateModal}>
      &times;
    </button>
  );

  //  ref to each input
  const nameRef = React.createRef();
  const emailRef = React.createRef();

  //  validation state
  const [nameValidation, setNameValidation] = useState(
    null
  );
  const [
    emailValidation,
    setEmailValidation
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

      case "email":
        setEmailValidation(validateEmail({ [name]: value }));
        break;

      default:
        break;
    }


  };

  //  check validation
  const validation = () => {
    return (
      (nameValidation == null ? true : nameValidation) &&
      (emailValidation == null
        ? true
        : emailValidation)
    );
  };

  //  create new employee
  const createNewEmployee = event => {
    event.preventDefault();
    const application = {
      password: emailRef.current.value ? emailRef.current.value : "google.com.vn",
      confirm_password: emailRef.current.value ? emailRef.current.value : "google.com.vn",
      is_admin: true,
      email: emailRef.current.value ? emailRef.current.value : "google.com.vn",
      address: "",
      name: nameRef.current.value ? nameRef.current.value : "google.com.vn",
      phone: "",
      manager_registration_token: "string",
      role: 2
    };
    fromProps.createNewEmployee(application);
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
        <ModalHeader toggle={toggleCreateModal} close={closeBtn}>
          EMPLOYEE REGISTRATION
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
                placeholder="Employee Name"
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
                Invalid Employee Name
                  </FormFeedback>
              <FormText>Name length: minimum 5 characters</FormText>
            </FormGroup>
            <FormGroup>
              <div className="position-relative form-group">
                <Label for="email">Email</Label>
                <Input
                  onChange={event => checkValidation(event)}
                  type="text"
                  className="form-control fg-input"
                  id="email"
                  name="email"
                  innerRef={emailRef}
                  valid={emailValidation}
                  invalid={
                    emailValidation == null
                      ? false
                      : !emailValidation
                  }
                  required

                />
                <FormFeedback>
                  Please check email again
                    </FormFeedback>
                <FormText>Email will be used to login, please provide correct email</FormText>
              </div>
            </FormGroup>


          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            disabled={!validation()}
            color="primary"
            onClick={e => createNewEmployee(e)}
          >
            Create New Manager
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
export default memo(EmployeeRegistrationModal, arePropsEqual);
