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
  // FormGroup,
  // Label,
  // Input,
  // FormFeedback,
  // FormText,

  // //  React tab
  // TabContent,
  // TabPane,
  // Nav,
  // NavItem,
  // NavLink,
  // Card,
  // CardTitle,
  // CardText
  //Button
} from "reactstrap";
// import classnames from "classnames";
//  pure component: memo
import React, { memo, useState } from "react";

//  import table for repo
import ProjectAssignmentContainer from "./ProjectAssignmentContainer.js";
// import { employeeReducer } from "../../../redux/Reducer/employeeReducer.js";

// const uuidv1 = require("uuid/v1");

const EmployeeInformationModal = ({ fromProps }) => {
  let {
    modal,
    toggleInformationModal,
    // applicationInstanceList = [],
    // applicationList = [],

    // validateName,
    // validateStartDate,
    // validateExpiredDate,
    // validateSourceCodeUrl,
    // validateRepoName,
    // validateRepoUrl,


    // role,
    // employee,
  } = fromProps;

  // console.log(" Detail Employee Modal Presentation", fromProps);
  //  close button
  const closeBtn = (
    <button className="close" onClick={toggleInformationModal}>
      &times;
    </button>
  );

  // //  ref to general information
  // const applicationSelectRef = React.createRef();
  // const applicationInstanceSelectRef = React.createRef();

  // //  Validation state
  // const [applicationInstanceSelectValidation, setApplicationInstanceSelectValidation] = useState(null);
  // const [applicationSelectValidation, setApplicationSelectValidation] = useState(null);


  // //  validate value from each input and store value into state
  // const checkValidation = async event => {
  //   const name = event.target.name;
  //   const value =
  //     event.target.type === "checkbox"
  //       ? event.target.checked
  //       : event.target.value;

  //   switch (name) {
  //     case "applicationName":
  //       setApplicationNameValidation(validateName({ [name]: value }));
  //       break;

  //     case "startDate":
  //       setStartDateValidation(validateStartDate({ [name]: value }));
  //       break;

  //     case "expiredDate":
  //       setExpiredDateValidation(validateExpiredDate({ [name]: value, "startDate": startDateRef.current.value }));
  //       break;

  //     case "sourceCodeUrl":
  //       setSourceCodeUrlValidation(validateSourceCodeUrl({ [name]: value }));
  //       break;

  //     case "repoName":
  //       setRepoNameValidation(validateRepoName({ [name]: value }));
  //       break;

  //     case "repoUrl":
  //       setRepoUrlValidation(validateRepoUrl({ [name]: value }));
  //       break;

  //     case "applicationInstanceSelect":
  //       setApplicationInstanceSelectValidation(validateRepoUrl(applicationInstanceSelectRef > 0));
  //       break;

  //     default:
  //       break;
  //   }
  // };
  //  check validationconst 
  // const repoValidation = () => {
  //   return (
  //     applicationInstanceSelectValidation == null ? false : applicationInstanceSelectValidation &&
  //       applicationSelectValidation == null ? false : applicationSelectValidation
  //   );
  // }

  // //  create assign employee into project
  // // const addEmployeeIntoProject = event => {
  // //   event.preventDefault();
  // //   const project = {
  // //     "id": employee.id,
  // //     "application_id": applicationSelectRef.current.value,
  // //     "Application_instance_id": 0
  // //   }
  // //   fromProps.assignEmployee(project);
  // // }

  // // const projectList = (list, role) => {
  // //   return employee.manage_project.length > 0 ?
  // //     list.map(eachApp => {
  // //       employee.manage_project.map(manage_project => {
  // //         return role === 2 ?
  // //           eachApp.id !== 5 || eachApp.id !== manage_project.application_id
  // //           : eachApp.id !== 6 || eachApp.id !== manage_project.application_instance_id
  // //           ;

  // //       })
  // //     }) : null;
  // // }



  //  load application (for manager) / application instance (for developer / guest)
  // const loadProject = (identifier, project, ref, list, validation) => {
  //   return (
  //     <FormGroup id={identifier}>
  //       <div className="position-relative form-group">
  //         <Label for={identifier}>Choose {project}</Label>
  //         <Input
  //           type="select"
  //           id={identifier}
  //           name={identifier}
  //           onChange={event => checkValidation(event)}
  //           innerRef={ref}
  //           valid={validation}
  //           invalid={
  //             validation == null
  //               ? false
  //               : !validation
  //           }

  //         >
  //           <option value={0}>Choose {project}</option>
  //           {list && list.length
  //             ? list.map(pj => {
  //               return (
  //                 <option key={uuidv1()} value={pj.id}>
  //                   {pj.name}
  //                 </option>
  //               );
  //             })
  //             : null}

  //         </Input>
  //         <FormFeedback>
  //           Please select an {project}
  //         </FormFeedback>
  //       </div>
  //     </FormGroup>
  //   );
  // }

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
          ASSIGN EMPLOYEE INTO PROJECT
        </ModalHeader>
        <ModalBody>

          <Form>
            <Row form>
              <Col md={6}>
              </Col>
              <Col md={6}>
              </Col>
            </Row>
            {/* {
              role === 1 && employee.role === 2 ?
                loadProject(
                  "applicationSelect",
                  "Application",
                  applicationSelectRef,
                  applicationList,
                  applicationSelectValidation
                )
                : loadProject(
                  "applicationInstanceSelect",
                  "ApplicationInstance",
                  applicationInstanceSelectRef,
                  applicationInstanceList,
                  applicationInstanceSelectValidation
                )
            } */}

            {/* <FormGroup id="applicationSelect">
              <div className="position-relative form-group">
                <Label for="applicationSelect">Choose Application</Label>
                <Input
                  type="select"
                  id="applicationSelect"
                  name="applicationSelect"
                  onChange={event => checkValidation(event)}
                  innerRef={applicationSelectRef}
                  valid={applicationSelectValidation}
                  invalid={
                    applicationSelectValidation == null
                      ? false
                      : !applicationSelectValidation
                  }
                  disabled={role !== "1" || employee.role !== "2"}

                >
                  <option value={0}>Choose Application</option>
                  {applicationList && applicationList.length
                    ? applicationList.map(app => {
                      return (
                        <option key={uuidv1()} value={app.id}>
                          {app.name}
                        </option>
                      );
                    })
                    : null}

                </Input>
                <FormFeedback>
                  Please select an application
                    </FormFeedback>
              </div>
            </FormGroup>
            <FormGroup id="applicationInstanceSelect">
              <div className="position-relative form-group">
                <Label for="applicationInstanceSelect">Choose Application Instance</Label>
                <Input
                  type="select"
                  id="applicationInstanceSelect"
                  name="applicationInstanceSelect"
                  onChange={event => checkValidation(event)}
                  innerRef={applicationInstanceSelectRef}
                  valid={applicationInstanceSelectValidation}
                  invalid={
                    applicationInstanceSelectValidation == null
                      ? false
                      : !applicationInstanceSelectValidation
                  }
                  disabled={role !== "2" || employee.role !== "3"}
                >
                  <option value={0}>Choose Application Instance</option>
                  {applicationInstanceList && applicationInstanceList.length
                    ? applicationInstanceList.map(appIns => {
                      return (
                        <option key={uuidv1()} value={appIns.id}>
                          {appIns.name}
                        </option>
                      );
                    })
                    : null}
                </Input>
                <FormFeedback>
                  Please select an application instance
                    </FormFeedback>
              </div>
            </FormGroup> */}

            {/* <hr />
            <Button
              disabled={!repoValidation()}
              color="primary"
              onClick={e => addEmployeeIntoProject(e)}
            >
              Assign Employee Into Project
                  </Button>

            <hr /> */}
            <div style={{ marginTop: '60px' }}>
            <ProjectAssignmentContainer />
            </div>

            <hr />
          </Form>
        </ModalBody>
        <ModalFooter>
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
export default memo(EmployeeInformationModal, arePropsEqual);
