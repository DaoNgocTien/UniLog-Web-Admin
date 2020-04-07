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

  //  React tab
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
} from "reactstrap";
import classnames from "classnames";
//  pure component: memo
import React, { memo, useState } from "react";

//  import table for repo
import RepoContainer from "./../Repo/RepoContainer.js";

const uuidv1 = require("uuid/v1");

const ApplicationInformationModal = ({ fromProps }) => {
  let {
    modal,
    toggleInformationModal,
    systemList = [],
    serverList,

    validateName,
    validateStartDate,
    validateExpiredDate,
    validateSourceCodeUrl,
    validateRepoName,
    validateRepoUrl,


    // role,

    application: {
      id,
      category,
      create_time,
      description,
      efford,
      end_date,
      name,
      origin,
      priority,
      source_code_url,
      stage,
      start_date,
      status,
      systems_id,
      team,
      technologies,
      type,
    }
  } = fromProps;

  console.log(" Detail Application Modal Presentation", fromProps);
  //  close button
  const closeBtn = (
    <button className="close" onClick={toggleInformationModal}>
      &times;
    </button>
  );

  //  ref to general information
  const expiredDateRef = React.createRef();
  const createDateRef = React.createRef();
  const sourceCodeUrlRef = React.createRef();
  const descriptionRef = React.createRef();

  const categorySelectRef = React.createRef();
  const applicationNameRef = React.createRef();
  const technologyRef = React.createRef();
  const teamRef = React.createRef();
  const effordRef = React.createRef();
  const prioritySelectRef = React.createRef();
  const startDateRef = React.createRef();
  const originSelectRef = React.createRef();
  const typeSelectRef = React.createRef();
  const statusSelectRef = React.createRef();
  const stageSelectRef = React.createRef();
  const systemSelectRef = React.createRef();


  //  ref to repo
  const repoNameRef = React.createRef();
  const repoUrlRef = React.createRef();
  const serverSelectRef = React.createRef();

  //  Validation state
  //  General information
  const [applicationNameValidation, setApplicationNameValidation] = useState(true);
  const [
    expiredDateValidation,
    setExpiredDateValidation
  ] = useState(true);
  const [sourceCodeUrlValidation, setSourceCodeUrlValidation] = useState(true);
  const [
    startDateValidation,
    setStartDateValidation
  ] = useState(null);
  //  Repo 
  const [repoNameValidation, setRepoNameValidation] = useState(null);
  const [repoUrlValidation, setRepoUrlValidation] = useState(null);
  const [serverSelectValidation, setServerSelectValidation] = useState(null);


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

      case "expiredDate":
        setExpiredDateValidation(validateExpiredDate({ [name]: value, "startDate": startDateRef.current.value }));
        break;

      case "sourceCodeUrl":
        setSourceCodeUrlValidation(validateSourceCodeUrl({ [name]: value }));
        break;

      case "repoName":
        setRepoNameValidation(validateRepoName({ [name]: value }));
        break;
        
      case "repoUrl":
        setRepoUrlValidation(validateRepoUrl({ [name]: value }));
        break;

      case "serverSelect":
        setServerSelectValidation(validateRepoUrl(serverSelectRef > 0));
        break;

      default:
        break;
    }
  };

  //  check validation
  const generalInformationValidation = () => {
    return (
      (applicationNameValidation == null ? true : applicationNameValidation) &&
      (startDateValidation == null
        ? true
        : startDateValidation) &&
      (expiredDateValidation == null
        ? true
        : expiredDateValidation)
    );
  };

  const repoValidation = () => {
    return (
      repoNameValidation == null ? false : repoNameValidation &&
      repoUrlValidation == null ? false: repoUrlValidation
    );
  }

  //  update application information
  const updateApplicationInformation = event => {
    event.preventDefault();
    const application = {
      id: id,
      active: true,
      category: categorySelectRef.current.value,
      description: descriptionRef.current.value,
      efford: effordRef.current.value,
      end_date: expiredDateRef.current.value,
      is_done: true,
      name: applicationNameRef.current.value,
      note: "",
      origin: originSelectRef.current.value,
      priority: prioritySelectRef.current.value,
      source_code_url: sourceCodeUrlRef.current.value,
      stage: stageSelectRef.current.value,
      start_date: startDateRef.current.value,
      status: statusSelectRef.current.value,
      systems_id: systemSelectRef.current.value,
      team: teamRef.current.value,
      technologies: technologyRef.current.value,
      type: typeSelectRef.current.value,
      update_time: new Date(Date.now()),
      // systems,
      // application_instance,
      // manage_project,
      // repo
    };
    fromProps.updateApplicationGeneralInformation(application);
  };

  //  create new repository
  const createNewRepository = event => {
    event.preventDefault();
    const repo = {
      server_id: serverSelectRef.current.value > 0 ? serverSelectRef.current.value : 1,
      name: repoNameRef.current.value ? repoNameRef.current.value : "New Repository",
      application_id: id,
      repo_url: repoUrlRef.current.value ? repoUrlRef.current.value : "google.com.vn",
      note: "string"
    }
    fromProps.createNewRepo(repo);
  }


  //  modal tab section
  const [activeTab, setActiveTab] = useState("1");
  const toggleTab = tab => {
    if (activeTab !== tab) setActiveTab(tab);
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
          APPLICATION INFORMATION
        </ModalHeader>
        <ModalBody>
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === "1" })}
                onClick={() => {
                  toggleTab("1");
                }}
              >
                General information
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === "2" })}
                onClick={() => {
                  toggleTab("2");
                }}
              >
                Repository
              </NavLink>
            </NavItem>
            {/* <NavItem>
              <NavLink
                className={classnames({ active: activeTab === "3" })}
                onClick={() => {
                  toggleTab("3");
                }}
              >
                Account
              </NavLink>
            </NavItem> */}
          </Nav>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <Form>
                <Card body>
                  <Row form>
                    <Col md={6}>
                    </Col>
                    <Col md={6}>
                    </Col>
                  </Row>
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
                          defaultValue={name}
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
                        <FormText>Name is required, minimum length is 5</FormText>
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
                            defaultValue={start_date ? start_date : new Date(Date.now())
                              .toISOString()
                              .slice(0, 23)}
                          />
                          <FormFeedback>
                            Application Start Date must be after current day
                    </FormFeedback>
                          <FormText>Application Start Date</FormText>
                        </div>
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row form>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="sourceCodeUrl">Source Code Url</Label>
                        <Input
                          onChange={event => checkValidation(event)}
                          type="text"
                          name="sourceCodeUrl"
                          id="sourceCodeUrl"
                          placeholder="https://www.localhost:8084"
                          defaultValue={source_code_url}
                          innerRef={sourceCodeUrlRef}
                          valid={sourceCodeUrlValidation}
                          invalid={
                            sourceCodeUrlValidation == null ? false : !sourceCodeUrlValidation
                          }
                        />
                        <FormFeedback>Invalid source code url</FormFeedback>
                        <FormText>Eq: www.google.com</FormText>
                      </FormGroup>
                    </Col>

                    <Col md={6}>
                      <FormGroup>
                        <div className="position-relative form-group">
                          <Label for="expiredDate">Expired Date</Label>
                          <Input
                            onChange={event => checkValidation(event)}
                            type="datetime-local"
                            className="form-control fg-input"
                            id="expiredDate"
                            name="expiredDate"
                            innerRef={expiredDateRef}
                            valid={expiredDateValidation}
                            invalid={
                              expiredDateValidation == null
                                ? false
                                : !expiredDateValidation
                            }
                            defaultValue={end_date ? end_date : new Date(Date.now())
                              .toISOString()
                              .slice(0, 23)}
                          />
                          <FormFeedback>
                            Application Expired Date must be after current day
                    </FormFeedback>
                          <FormText>Application Expired Date</FormText>
                        </div>
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row form>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="technology">Technology</Label>
                        <Input
                          onChange={event => checkValidation(event)}
                          type="text"
                          name="technology"
                          id="technology"
                          defaultValue={technologies}
                          innerRef={technologyRef}

                        />
                        <FormText>Base technology of application</FormText>
                      </FormGroup>
                    </Col>

                    <Col md={6}>
                      <FormGroup>
                        <div className="position-relative form-group">
                          <Label for="createDate">Create Date</Label>
                          <Input
                            onChange={event => checkValidation(event)}
                            type="datetime-local"
                            className="form-control fg-input"
                            id="createDate"
                            disabled
                            name="createDate"
                            innerRef={createDateRef}
                            defaultValue={create_time ? create_time : new Date(Date.now())
                              .toISOString()
                              .slice(0, 23)}
                          />
                          <FormText>Application Create Date</FormText>
                        </div>
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row form>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="team">Team</Label>
                        <Input
                          onChange={event => checkValidation(event)}
                          type="number"
                          name="team"
                          id="team"
                          defaultValue={team}
                          innerRef={teamRef}
                        />
                        <FormText>Team in charge of applcation</FormText>
                      </FormGroup>
                    </Col>

                    <Col md={6}>
                      <FormGroup>
                        <Label for="efford">Efford</Label>
                        <Input
                          onChange={event => checkValidation(event)}
                          type="number"
                          name="efford"
                          id="efford"
                          defaultValue={efford}
                          innerRef={effordRef}
                        />
                        <FormText>Efford of applcation (manhour)</FormText>
                      </FormGroup>
                    </Col>
                  </Row>

                  <div style={{ border: '0.05px solid', padding: '10px', borderRadius: '15px' }}>
                    <Label for="informationSection"></Label>

                    <FormGroup id="systemSelect">
                      <div className="position-relative form-group">
                        <Label for="systemSelect">Choose System</Label>
                        <Input
                          type="select"
                          id="systemSelect"
                          name="systemSelect"
                          innerRef={systemSelectRef}
                          defaultValue={systems_id ? systems_id : systemList && systemList.length ? 1 : 0}
                        >
                          <option value={0}>Choose application Master</option>
                          {systemList && systemList.length
                            ? systemList.map(system => {
                              return (
                                <option key={uuidv1()} value={system.id}>
                                  {system.name}
                                </option>
                              );
                            })
                            : null}
                        </Input>
                        <FormText>The system this application belongs to</FormText>
                      </div>
                    </FormGroup>

                    <FormGroup id="categorySelect">
                      <Label for="categorySelect">Choose Category</Label>
                      <Input
                        type="select"
                        id="categorySelect"
                        name="categorySelect"
                        innerRef={categorySelectRef}
                        defaultValue={category ? category : 1}
                      >
                        <option value={1}>Web MVC Application</option>
                        {/* <option value={2}>Mobile Application</option> */}
                        <option value={2}>POS Application</option>
                        {/* <option value={4}>Database Application</option> */}
                        <option value={3}>Web API Application</option>

                      </Input>
                      {/* <FormText>Choose an exist application as application master</FormText> */}
                    </FormGroup>

                    <FormGroup id="typeSelect">
                      <Label for="typeSelect">Choose Type</Label>
                      <Input
                        type="select"
                        id="typeSelect"
                        name="typeSelect"
                        defaultValue={type ? type : "N"}
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
                        defaultValue={origin ? origin : "I"}
                        onChange={event => checkValidation(event)}
                        innerRef={originSelectRef}
                      >
                        <option value="I">Project developed by a software development company</option>
                        <option value="U">Projects developed by university staff and students for the internal usage at the university</option>
                        <option value="S2B">Project developed by students for external organizations</option>
                      </Input>
                    </FormGroup>

                    <FormGroup id="stageSelect">
                      <Label for="stageSelect">Choose Stage</Label>
                      <Input
                        type="select"
                        id="stageSelect"
                        name="stageSelect"
                        innerRef={stageSelectRef}
                        defaultValue={stage ? stage : 1}
                      >
                        <option value={1}>Develop</option>
                        <option value={2}>Staging</option>
                        <option value={3}>Product</option>

                      </Input>
                      {/* <FormText>Choose an exist application as application master</FormText> */}
                    </FormGroup>

                    <FormGroup id="prioritySelect">
                      <Label for="prioritySelect">Choose Priority</Label>
                      <Input
                        type="select"
                        id="prioritySelect"
                        name="prioritySelect"
                        defaultValue={priority ? priority : 1}
                        innerRef={prioritySelectRef}
                      >
                        <option value={1}>No Priority</option>
                        <option value={2}>Low Priority</option>
                        <option value={3}>Medium Priority</option>
                        <option value={4}>High Priority</option>

                      </Input>
                      {/* <FormText>Choose an exist application as application master</FormText> */}
                    </FormGroup>

                    <FormGroup id="statusSelect">
                      <Label for="statusSelect">Choose Status</Label>
                      <Input
                        type="select"
                        id="statusSelect"
                        name="statusSelect"
                        defaultValue={status ? status : 1}
                        innerRef={statusSelectRef}
                      >
                        <option value={1}>To do</option>
                        <option value={2}>Doing</option>
                        <option value={3}>Done</option>
                        <option value={4}>Pending</option>
                        <option value={5}>Cancel</option>

                      </Input>
                    </FormGroup>
                  </div>

                  <FormGroup>
                    <Label for="description">Description</Label>
                    <Col sm={12}>
                      <Input
                        onChange={event => checkValidation(event)}
                        type="textarea"
                        name="description"
                        id="description"
                        defaultValue={description}
                        innerRef={descriptionRef}
                      />
                    </Col>
                  </FormGroup>

                  <hr />
                  <Button
                    disabled={!generalInformationValidation()}
                    color="primary"
                    onClick={e => updateApplicationInformation(e)}
                  >
                    Update application Information
                  </Button>
                </Card>
              </Form>
            </TabPane>
            <TabPane tabId="2">
              <Form>
                <Card body>
                  <Row form>
                    <Col md={6}>
                    </Col>
                    <Col md={6}>
                    </Col>
                  </Row>
                  <FormGroup>
                    <Label for="repoName">Repository Name</Label>
                    <Input
                      onChange={event => checkValidation(event)}
                      type="text"
                      name="repoName"
                      id="repoName"
                      placeholder="Repository Name"
                      innerRef={repoNameRef}
                      // defaultValue={repoName}
                      valid={repoNameValidation}
                      invalid={
                        repoNameValidation == null
                          ? false
                          : !repoNameValidation
                      }
                      required
                    />
                    <FormFeedback>
                      Repository Name: 5-100 characters
                  </FormFeedback>
                    <FormText>Name is required, minimum length is 5</FormText>
                  </FormGroup>

                  <FormGroup>
                    <Label for="repoUrl">Repository Url</Label>
                    <Input
                      onChange={event => checkValidation(event)}
                      type="text"
                      name="repoUrl"
                      id="repoUrl"
                      placeholder="https://www.localhost:8084"
                      // defaultValue="https://www.google.com"
                      innerRef={repoUrlRef}
                      valid={repoUrlValidation}
                      invalid={
                        repoUrlValidation == null ? false : !repoUrlValidation
                      }
                    />
                    <FormFeedback>Invalid source code url</FormFeedback>
                    <FormText>Eq: www.google.com</FormText>
                  </FormGroup>


                  <FormGroup id="serverSelect">
                    <div className="position-relative form-group">
                      <Label for="serverSelect">Choose Server</Label>
                      <Input
                        type="select"
                        id="serverSelect"
                        name="serverSelect"
                        onChange={event => checkValidation(event)}
                        innerRef={serverSelectRef}
                      valid={serverSelectValidation}
                      invalid={
                        serverSelectValidation == null
                          ? false
                          : !serverSelectValidation
                      }
                      >
                        <option value={0}>Choose Server</option>
                        {serverList && serverList.length
                          ? serverList.map(server => {
                            return (
                              <option key={uuidv1()} value={server.id}>
                                {server.name}
                              </option>
                            );
                          })
                          : null}
                      </Input>
                      <FormFeedback>
                        Please select a server
                    </FormFeedback>
                    </div>
                  </FormGroup>

                  {/* <FormGroup>
                    <Label for="note">Note</Label>
                    <Col sm={12}>
                      <Input
                        onChange={event => checkValidation(event)}
                        type="textarea"
                        name="note"
                        id="note"
                        defaultValue={note}
                        innerRef={noteRef}
                      />
                    </Col>
                  </FormGroup> */}

                  <hr />
                  <Button
                    disabled={!repoValidation()}
                    color="primary"
                    onClick={e => createNewRepository(e)}
                  >
                    Create new repository
                  </Button>

                  <hr />
                  <div style={{ marginTop: '60px' }}>
                    <RepoContainer />
                  </div>

                  <hr />
                </Card>
              </Form>
            </TabPane>
          </TabContent>
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
export default memo(ApplicationInformationModal, arePropsEqual);
