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
  FormText,

  //Button
} from "reactstrap";
//  pure component: memo
import React, { memo, useState } from "react";


const PasswordChangingModal = ({ fromProps }) => {
  let {
    modal,
    toggleInformationModal,
    employee,
  } = fromProps;

  //  close button
  const closeBtn = (
    <button className="close" onClick={toggleInformationModal}>
      &times;
    </button>
  );

  //  ref to general information
  const newPasswordRef = React.createRef();
  const confirmedPasswordRef = React.createRef();

  //  Validation state
  const [newPasswordValidation, setNewPasswordValidation] = useState(null);
  const [confirmedPasswordValidation, setConfirmedPasswordValidation] = useState(null);

  //  validate value from each input and store value into state
  const checkValidation = async event => {
    const name = event.target.name;
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;

    switch (name) {
      // case "currentPassword":
      //   console.log(value + " " + newPasswordRef.current.value + " " + confirmedPasswordRef.current.value);
      //   setCurrentPasswordValidation(value.length >= 6 && value.length < 256 && value !== newPasswordRef.current.value);
      //   break;
      case "newPassword":
        console.log(value + " " + confirmedPasswordRef.current.value);
        setNewPasswordValidation(value.length >= 6 && value.length < 256 && value === confirmedPasswordRef.current.value);
        setConfirmedPasswordValidation(confirmedPasswordRef.current.value.length >= 6 && confirmedPasswordRef.current.value.length < 256 && value === confirmedPasswordRef.current.value);
        break;
      case "confirmedPassword":
        console.log(newPasswordRef.current.value + " " + value);
        setNewPasswordValidation(newPasswordRef.current.value.length >= 6 && newPasswordRef.current.value.length < 256 && value === newPasswordRef.current.value);
        setConfirmedPasswordValidation(value.length >= 6 && value.length < 256 && value === newPasswordRef.current.value);
        break;

      default:
        break;
    }
  };

  //  check validation
  const validation = () => {
    return (
      // currentPasswordValidation &&
      newPasswordValidation &&
      confirmedPasswordValidation
    );
  };

  //  update password
  const changePassword = event => {
    event.preventDefault();
    const password = {
      "id": employee.id,
      "email": employee.email,
      "current_password": "",
      "new_password": newPasswordRef.current.value,
      "confirm_password": confirmedPasswordRef.current.value,
      "token": ""
    }
    console.log(JSON.stringify(password));
    fromProps.changePassword(password);
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
          CHANGE PASSWORD
        </ModalHeader>
        <ModalBody>
          <Form>
            {/* <FormGroup>
              <Label for="currentPassword">Current Password</Label>
              <Input
                onChange={event => checkValidation(event)}
                type="password"
                name="currentPassword"
                id="currentPassword"
                placeholder="Please fill the password"
                innerRef={currentPasswordRef}
                valid={currentPasswordValidation}
                invalid={
                  currentPasswordValidation == null
                    ? false
                    : !currentPasswordValidation
                }
              />
              <FormFeedback>Please check again</FormFeedback>
              <FormText>Required, min 6 character</FormText>
            </FormGroup> */}

            <FormGroup>
              <Label for="newPassword">New Password</Label>
              <Input
                onChange={event => checkValidation(event)}
                type="password"
                name="newPassword"
                id="newPassword"
                placeholder="Please fill the password"
                innerRef={newPasswordRef}
                defaultValue={employee.email}
                valid={newPasswordValidation}
                invalid={
                  newPasswordValidation == null
                    ? false
                    : !newPasswordValidation
                }
              />
              <FormFeedback>Please check again</FormFeedback>
              <FormText>Required, min 6 character</FormText>
            </FormGroup>

            <FormGroup>
              <Label for="confirmedPassword">Confirmed Password</Label>
              <Input
                onChange={event => checkValidation(event)}
                type="password"
                name="confirmedPassword"
                id="confirmedPassword"
                placeholder="Please fill the password"
                innerRef={confirmedPasswordRef}
                defaultValue={employee.email}
                valid={confirmedPasswordValidation}
                invalid={
                  confirmedPasswordValidation == null
                    ? false
                    : !confirmedPasswordValidation
                }
              />
              <FormFeedback>Please check againh</FormFeedback>
              <FormText>Required, min 6 character</FormText>
            </FormGroup>

          </Form>

        </ModalBody>
        <ModalFooter>
          <Button
            disabled={!validation()}
            color="primary"
            onClick={e => changePassword(e)}
          >
            Change Password
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
export default memo(PasswordChangingModal, arePropsEqual);
