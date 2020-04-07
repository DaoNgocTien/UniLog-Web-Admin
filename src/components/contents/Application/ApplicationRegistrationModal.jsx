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

// const uuidv1 = require("uuid/v1");

const ApplicationRegistrationModal = ({ fromProps }) => {
  let {
    modal,
    toggleCreateModal,
    // serverMasterList,
    createNewApplication,

    validateName,
    validateStartDate,
  } = fromProps;

  //  close button
  const closeBtn = (
    <button className="close" onClick={toggleCreateModal}>
      &times;
    </button>
  );

  //  ref to each input
  const categorySelectRef = React.createRef();
  const applicationNameRef = React.createRef();
  const prioritySelectRef = React.createRef();
  const startDateRef = React.createRef();
  const originSelectRef = React.createRef();
  const typeSelectRef = React.createRef();
  const statusSelectRef = React.createRef();

  //  validation state
  const [applicationNameValidation, setApplicationNameValidation] = useState(
    null
  );
  const [
    startDateValidation,
    setStartDateValidation
  ] = useState(null);

  //  validate value from each input and store value into state
  const checkValidation = async event => {
    const name = event.target.name;
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;

    switch (name) {
      case "applicationName":
        setApplicationNameValidation(validateName({ [name]: value }));
        break;

      case "startDate":
        setStartDateValidation(validateStartDate({ [name]: value }));
        break;

      default:
        break;
    }


  };

  //  check validation
  const validation = () => {
    return (
      (applicationNameValidation == null ? true : applicationNameValidation) &&
      (startDateValidation == null
        ? true
        : startDateValidation)
    );
  };

  //  create new server
  const createAplication = event => {
    event.preventDefault();
    const application = {
      name: applicationNameRef.current.value,
      start_date: startDateRef.current.value,
      category: categorySelectRef.current.value,
      origin: originSelectRef.current.value,
      type: typeSelectRef.current.value,
      priority: prioritySelectRef.current.value,
      status: statusSelectRef.current.value,
    };
    createNewApplication(application);
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
          APPLICATION REGISTRATION
        </ModalHeader>
        <ModalBody>
          <Form>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="applicationName">Application Name</Label>
                  <Input
                    onChange={event => checkValidation(event)}
                    type="text"
                    name="applicationName"
                    id="applicationName"
                    placeholder="Application Name"
                    innerRef={applicationNameRef}
                    valid={applicationNameValidation}
                    invalid={
                      applicationNameValidation == null
                        ? false
                        : !applicationNameValidation
                    }
                    required
                  />
                  <FormFeedback
                  // valid={
                  //   this.validateIPaddress(this.state)
                  // }
                  // tooltip
                  >
                    Invalid Application Name
                  </FormFeedback>
                  <FormText>Name is required</FormText>
                </FormGroup>
              </Col>

              <Col md={6}>
                <FormGroup>
                  <div className="position-relative form-group">
                    <Label for="startDate">Start Date</Label>
                    <Input
                      onChange={event => checkValidation(event)}
                      type="datetime-local"
                      className="form-control fg-input"
                      id="startDate"
                      name="startDate"
                      innerRef={startDateRef}
                      valid={startDateValidation}
                      invalid={
                        startDateValidation == null
                          ? false
                          : !startDateValidation
                      }
                      defaultValue={new Date(Date.now())
                        .toISOString()
                        .slice(0, 23)}
                    />
                    <FormFeedback>
                      Server Expired Date must be after current day
                    </FormFeedback>
                    <FormText>Application Start Date</FormText>
                  </div>
                </FormGroup>
              </Col>
            </Row>

            <div style={{ border: '0.05px solid', padding: '10px', borderRadius: '15px' }}>
              <div style={{ textAlign: 'center' }}><Label></Label>      </div>

              <FormGroup id="categorySelect">
                <Label for="categorySelect">Choose Category</Label>
                <Input
                  type="select"
                  id="categorySelect"
                  name="categorySelect"
                  innerRef={categorySelectRef}
                >
                  <option value={1}>Web MVC Application</option>
                  {/* <option value={2}>Mobile Application</option> */}
                  <option value={3}>POS Application</option>
                  {/* <option value={4}>Database Application</option> */}
                  <option value={5}>Web API Application</option>

                </Input>
                {/* <FormText>Choose an exist server as server master</FormText> */}
              </FormGroup>

              <FormGroup id="typeSelect">
                <Label for="typeSelect">Choose Type</Label>
                <Input
                  type="select"
                  id="typeSelect"
                  name="typeSelect"
                  defaultValue={1}
                  onChange={event => checkValidation(event)}
                  innerRef={typeSelectRef}
                >
                  <option value="N">Application was developed from scratch</option>
                  <option value="C">Application was based on existing solution and was tailored for the customer</option>
                  <option value="E">Major enhancement, i.e., strongly simplified version was available (e.g. a prototype)</option>
                </Input>
              </FormGroup>

              <FormGroup id="originSelect">
                <Label for="originSelect">Choose Origin</Label>
                <Input
                  type="select"
                  id="originSelect"
                  name="originSelect"
                  defaultValue={2}
                  onChange={event => checkValidation(event)}
                  innerRef={originSelectRef}
                >
                  <option value="I">Project developed by a software development company</option>
                  <option value="U">Projects developed by university staff and students for the internal usage at the university</option>
                  <option value="S2B">Project developed by students for external organizations</option>
                </Input>
              </FormGroup>
              {/* </div>

            <div style={{border: '0.05px solid', padding: '10px', borderRadius: '15px'}}>
              <Label for="informationSection">Information</Label> */}

              <FormGroup id="prioritySelect">
                <Label for="prioritySelect">Choose Priority</Label>
                <Input
                  type="select"
                  id="prioritySelect"
                  name="prioritySelect"
                  innerRef={prioritySelectRef}
                >
                  <option value={1}>No Priority</option>
                  <option value={2}>Low Priority</option>
                  <option value={3}>Medium Priority</option>
                  <option value={4}>High Priority</option>

                </Input>
                {/* <FormText>Choose an exist server as server master</FormText> */}
              </FormGroup>

              <FormGroup id="statusSelect">
                <Label for="statusSelect">Choose Status</Label>
                <Input
                  type="select"
                  id="statusSelect"
                  name="statusSelect"
                  innerRef={statusSelectRef}
                >
                  <option value={1}>To do</option>
                  <option value={2}>Doing</option>
                  <option value={3}>Done</option>
                  <option value={4}>Pending</option>
                  <option value={5}>Cancel</option>

                </Input>
                <FormText>Choose an exist server as server master</FormText>
              </FormGroup>
            </div>

          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            disabled={!validation()}
            color="primary"
            onClick={e => createAplication(e)}
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
export default memo(ApplicationRegistrationModal, arePropsEqual);
