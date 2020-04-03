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
  //Button
} from "reactstrap";
import classnames from "classnames";
//  pure component: memo
import React, { memo, useState } from "react";

const uuidv1 = require("uuid/v1");

const ServerInformationModal = ({ fromProps }) => {
  let {
    modal,
    toggleInformationModal,
    serverMasterList,
    // createNewServer,
    // updateServerDetail,
    // updateServerAccount,
    // disabled,

    validateIPaddress,
    validateServerCode,
    validateServerName,
    validateServerUrl,
    validateServerDescription,
    validateExpiredDate,
    validateServerTypeAndOS,

    validateDisk1,
    validateDisk2,
    validateDisk3,
    validateDiskVolume1,
    validateDiskVolume2,
    validateDiskVolume3,

    validateAccount,
    validatePassword,

    role,

    server: {
      id,
      // server_master_registration,
      // company_id,
      create_time,
      description,
      expired_date,
      ip_address,
      name,
      os,
      server_code,
      server_master,
      server_url,
      type,
      update_time,
      server_account,
      server_detail
    }
  } = fromProps;

  console.log("Detail Modal Presentation ", fromProps);
  //  close button
  const closeBtn = (
    <button className="close" onClick={toggleInformationModal}>
      &times;
    </button>
  );

  //  ref to general information
  const serverMasterSellectRef = React.createRef();
  const serverIpAddressRef = React.createRef();
  const serverCodeRef = React.createRef();
  const serverNameRef = React.createRef();
  const serverExpiredDateRef = React.createRef();
  const serverCreateDateRef = React.createRef();
  const serverUpdateDateRef = React.createRef();
  const serverUrlRef = React.createRef();
  const serverDescriptionRef = React.createRef();
  const serverOsSelectRef = React.createRef();
  const serverTypeSelectRef = React.createRef();

  //  ref to server detail
  const disk1Ref = React.createRef();
  const volume_disk1Ref = React.createRef();
  const disk2Ref = React.createRef();
  const volume_disk2Ref = React.createRef();
  const disk3Ref = React.createRef();
  const volume_disk3Ref = React.createRef();

  //  ref to server account
  const accountRef = React.createRef();
  const passwordRef = React.createRef();
  const confirmPasswordRef = React.createRef();

  //  Validation state
  //  General information
  const [serverIpAddressValidation, setServerIpAddressValidation] = useState(
    true
  );
  const [serverCodeValidation, setServerCodeValidation] = useState(true);
  const [serverNameValidation, setServerNameValidation] = useState(true);
  const [
    serverExpiredDateValidation,
    setServerExpiredDateValidation
  ] = useState(true);
  // const [serverCreateDateValidation, setServerCreateDateValidation] = useState(
  //   true
  // );
  // const [serverUpdateDateValidation, setServerUpdateDateValidation] = useState(
  //   true
  // );
  const [serverUrlValidation, setServerUrlValidation] = useState(true);
  const [
    serverDescriptionValidation,
    setServerDescriptionValidation
  ] = useState(true);
  const [serverOsSelectValidation, setServerOsSelectValidation] = useState(
    true
  );
  const [
    serverAccountPasswordShowUp,
    setServerAccountPasswordShowUp
  ] = useState(true);
  const [
    serverAccountConfirmPasswordShowUp,
    setServerAccountConfirmPasswordShowUp
  ] = useState(true);
  //  Detail
  const [
    firstDiskName,
    setFirstDiskName
  ] = useState(true);
  const [
    secondDiskName,
    setSecondDiskName
  ] = useState(true);
  const [
    thirdDiskName,
    setThirdDiskName
  ] = useState(true);
  const [
    firstDiskVolume,
    setFirstDiskVolume
  ] = useState(true);
  const [
    secondDiskVolume,
    setSecondDiskVolume
  ] = useState(true);
  const [
    thirdDiskVolume,
    setThirdDiskVolume
  ] = useState(true);
  //  Account
  const [
    serverAccount,
    setServerAccount
  ] = useState(true);
  const [
    serverPassword,
    setServerPassword
  ] = useState(true);
  const [
    serverConfirmPassword,
    setServerConfirmPassword
  ] = useState(true);

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
          serverTypeSelect: serverTypeSelectRef.current.value
            ? serverTypeSelectRef.current.value
            : type,
          [name]: parseInt(value)
        };
        setServerOsSelectValidation(validateServerTypeAndOS(condition));
        break;

      case "serverTypeSelect":
        condition = {
          [name]: parseInt(value),
          serverOsSelect: serverOsSelectRef.current.value
            ? serverOsSelectRef.current.value
            : os
        };
        setServerOsSelectValidation(validateServerTypeAndOS(condition));
        break;

      case "firstDiskName":
        console.log(value);
        setFirstDiskName(validateDisk1({ [name]: value }));
        break;

      case "secondDiskName":
        console.log(value);
        setSecondDiskName(validateDisk2({ [name]: value }));
        break;

      case "thirdDiskName":
        console.log(value);
        setThirdDiskName(validateDisk3({ [name]: value }));
        break;

      case "firstDiskVolume":
        console.log(value);
        setFirstDiskVolume(validateDiskVolume1({ [name]: value }));
        break;

      case "secondDiskVolume":
        console.log(value);
        setSecondDiskVolume(validateDiskVolume2({ [name]: value }));
        break;

      case "thirdDiskVolume":
        console.log(value);
        setThirdDiskVolume(validateDiskVolume3({ [name]: value }));
        break;

      case "serverAccount":
        console.log(value);
        setServerAccount(validateAccount({ [name]: value }));
        break;

      case "serverPassword":
        console.log(value);
        console.log(passwordRef.current.value + confirmPasswordRef.current.value);
        console.log(passwordRef.current.value === confirmPasswordRef.current.value);
        setServerPassword(validatePassword({ [name]: value }) && passwordRef.current.value === confirmPasswordRef.current.value);
        setServerConfirmPassword(passwordRef.current.value === confirmPasswordRef.current.value);
        break;

      case "serverConfirmPassword":
        console.log(value);
        console.log(passwordRef.current.value + confirmPasswordRef.current.value);
        console.log(passwordRef.current.value === confirmPasswordRef.current.value);
        setServerPassword(validatePassword({ [name]: value }) && passwordRef.current.value === confirmPasswordRef.current.value);
        setServerConfirmPassword(passwordRef.current.value === confirmPasswordRef.current.value);
        break;

      default:
        break;
    }
  };

  //  check validation
  const generalInformationValidation = () => {
    return (
      serverIpAddressValidation &&
      serverCodeValidation &&
      serverNameValidation &&
      serverExpiredDateValidation &&
      serverUrlValidation &&
      serverDescriptionValidation &&
      serverOsSelectValidation
    );
  };

  const detailValidation = () => {
    return (
      firstDiskName &&
      secondDiskName &&
      thirdDiskName &&
      firstDiskVolume &&
      secondDiskVolume &&
      thirdDiskVolume
    )
  }

  //  update server information
  const updateServerInformation = event => {
    event.preventDefault();
    const server = {
      id : id,
      description: serverDescriptionRef.current.value,
      expire_date: serverExpiredDateRef.current.value,
      // create_time: serverCreateDateRef.current.value,
      // update_time: serverUpdateDateRef.current.value,
      ip_address: serverIpAddressRef.current.value,
      name: serverNameRef.current.value,
      os: serverOsSelectRef.current.value,
      server_code: serverCodeRef.current.value,
      server_master: serverMasterSellectRef.current.value ,
      server_url: serverUrlRef.current.value,
      type: serverTypeSelectRef.current.value,
      // active: isActiveCheckRef.current.checked
    };
    fromProps.updateServerInformation(server);
  };

  //  update server detail
  const updateServerDetail = event => {
    event.preventDefault();
    fromProps.updateServerDetail({
      server_detail_id: server_detail ? server_detail.id : 0,
      id: id,
      disk1: disk1Ref.current.value ? disk1Ref.current.value : volume_disk1Ref.current.value ? "A" : "",
      volume_disk1: volume_disk1Ref.current.value ? volume_disk1Ref.current.value : disk1Ref.current.value ? "0" : "",
      disk2: disk2Ref.current.value ? disk2Ref.current.value : volume_disk2Ref.current.value ? "B" : "",
      volume_disk2: volume_disk2Ref.current.value ? volume_disk2Ref.current.value : disk2Ref.current.value ? "0" : "",
      disk3: disk3Ref.current.value ? disk3Ref.current.value : volume_disk3Ref.current.value ? "C" : "",
      volume_disk3: volume_disk3Ref.current.value ? volume_disk3Ref.current.value : disk3Ref.current.value ? "0" : "",
    });
  }

  //  Update server account
  const updateServerAccount = event => {
    event.preventDefault();
    const server_account = {
      server_id: id,
      username: accountRef.current.value ? accountRef.current.value : "sa",
      password: passwordRef.current.value ? passwordRef.current.value : "12345678"
    };
    fromProps.updateServerAccount(server_account);
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
          SERVER INFORMATION
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
                General
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === "2" })}
                onClick={() => {
                  toggleTab("2");
                }}
              >
                Detail
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === "3" })}
                onClick={() => {
                  toggleTab("3");
                }}
              >
                Account
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <Form>
                <Card body>
                  <Row form>
                    <Col md={6}>
                      <FormGroup>
                        {/* <Label for="serverID"  visible={0}>Server ID</Label> */}
                        <Input
                          //onChange={event => checkValidation(event)}
                          type="hidden"
                          name="serverID"
                          //id="serverCode"
                          placeholder="Server ID is required"
                          defaultValue={id}

                        // valid={serverCodeValidation}
                        // invalid={
                        //   serverCodeValidation == null
                        //     ? false
                        //     : !serverCodeValidation
                        // }
                        />
                        {/* <FormFeedback>Invalid Server Code</FormFeedback>
                      <FormText>Max length is 10</FormText> */}
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        {/* <Label for="serverID" visible={false}>Server ID</Label> */}
                        <Input
                          //onChange={event => checkValidation(event)}
                          type="hidden"
                          name="serverID"
                          //id="serverCode"
                          placeholder="Server ID is required"
                          defaultValue={id}

                        // valid={serverCodeValidation}
                        // invalid={
                        //   serverCodeValidation == null
                        //     ? false
                        //     : !serverCodeValidation
                        // }
                        />
                        {/* <FormFeedback>Invalid Server Code</FormFeedback>
                      <FormText>Max length is 10</FormText> */}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row form>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="serverCode">Server Code</Label>
                        <Input
                          onChange={event => checkValidation(event)}
                          type="text"
                          name="serverCode"
                          //id="serverCode"
                          placeholder="Server Code is required"
                          defaultValue={server_code}
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
                            defaultValue={expired_date}
                          // disabled
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
                        <Label for="serverIpAddress">IP Address</Label>
                        <Input
                          onChange={event => checkValidation(event)}
                          type="text"
                          name="serverIpAddress"
                          id="serverIpAddress"
                          placeholder="IP Address"
                          defaultValue={ip_address ? ip_address : "192.168.1.1"}
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
                          <Label for="serverCreateDate">Create Date</Label>
                          <Input
                            onChange={event => checkValidation(event)}
                            type="datetime-local"
                            className="form-control fg-input"
                            id="serverCreateDate"
                            name="serverCreateDate"
                            innerRef={serverCreateDateRef}
                            // valid={serverCreateDateValidation}
                            // invalid={
                            //   serverCreateDateValidation == null
                            //     ? false
                            //     : !serverCreateDateValidation
                            // }
                            defaultValue={create_time}
                            disabled
                          />
                          <FormFeedback>
                            Server Create Date must be after current day
                          </FormFeedback>
                          <FormText>Server Create Date</FormText>
                        </div>
                      </FormGroup>
                    </Col>
                  </Row>
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
                          defaultValue={name}
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
                          <Label for="serverUpdateDate">Update Date</Label>
                          <Input
                            onChange={event => checkValidation(event)}
                            type="datetime-local"
                            className="form-control fg-input"
                            id="serverUpdateDate"
                            name="serverUpdateDate"
                            innerRef={serverUpdateDateRef}
                            // valid={serverUpdateDateValidation}
                            // invalid={
                            //   serverUpdateDateValidation == null
                            //     ? false
                            //     : !serverUpdateDateValidation
                            // }
                            defaultValue={update_time}
                            disabled
                          />
                          <FormFeedback>
                            Server Update Date must be after current day
                          </FormFeedback>
                          <FormText>Server Update Date</FormText>
                        </div>
                      </FormGroup>
                    </Col>
                  </Row>

                  <FormGroup>
                    <Label for="serverMasterSelect">Choose Server Master</Label>
                    <Input
                      type="select"
                      id="serverMasterSelect"
                      name="serverMasterSelect"
                      innerRef={serverMasterSellectRef}
                      defaultValue={server_master}
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

                  <FormGroup>
                    <Label for="serverTypeSelect">Choose Type</Label>
                    <Input
                      type="select"
                      id="serverTypeSelect"
                      name="serverTypeSelect"
                      defaultValue={type}
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
                      defaultValue={os}
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

                  <FormGroup>
                    <Label for="serverUrl">Server Url</Label>
                    <Input
                      onChange={event => checkValidation(event)}
                      type="text"
                      name="serverUrl"
                      id="serverUrl"
                      placeholder="https://www.localhost:8084"
                      innerRef={serverUrlRef}
                      valid={serverUrlValidation}
                      invalid={
                        serverUrlValidation == null
                          ? false
                          : !serverUrlValidation
                      }
                      defaultValue={server_url}
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
                        defaultValue={description}
                      />
                    </Col>
                    <FormText>Max length is 256</FormText>
                  </FormGroup>
                  {/* <FormGroup check>
                    <Input
                      onChange={event => this.isChange(event)}
                      type="checkbox"
                      name="isActiveCheck"
                      id="isActiveCheck"
                      innerRef={isActiveCheckRef}
                      checked={active}
                    />
                    <Label for="isActiveCheck" check>
                      Active
                    </Label>
                  </FormGroup> */}

                  <hr />
                  <Button
                    disabled={!generalInformationValidation()}
                    color="primary"
                    onClick={e => updateServerInformation(e)}
                  >
                    Update Server Information
                  </Button>
                </Card>
              </Form>
            </TabPane>
            <TabPane tabId="2">
              <Form>
                <Card body>
                  <Row form>
                    <Col md={6}>
                      <FormGroup>
                        {/* <Label for="serverID"  visible={0}>Server ID</Label> */}
                        <Input
                          //onChange={event => checkValidation(event)}
                          type="hidden"
                          // name="serverID"
                          //id="serverCode"
                          // placeholder="Server ID is required"
                          defaultValue={id}

                        // valid={serverCodeValidation}
                        // invalid={
                        //   serverCodeValidation == null
                        //     ? false
                        //     : !serverCodeValidation
                        // }
                        />
                        {/* <FormFeedback>Invalid Server Code</FormFeedback>
                      <FormText>Max length is 10</FormText> */}
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        {/* <Label for="serverDetailID" visible={false}>Server Detail ID</Label> */}
                        <Input
                          //onChange={event => checkValidation(event)}
                          type="hidden"
                          // name="serverDetailID"
                          //id="serverCode"
                          // placeholder="Server Detail ID is required"
                          defaultValue={id}
                        // innerRef={serverDetailIDRef}
                        // valid={serverCodeValidation}
                        // invalid={
                        //   serverCodeValidation == null
                        //     ? false
                        //     : !serverCodeValidation
                        // }
                        />
                        {/* <FormFeedback>Invalid Server Code</FormFeedback>
                      <FormText>Max length is 10</FormText> */}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row form>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="firstDiskName">First Disk Name</Label>
                        <Input
                          onChange={event => checkValidation(event)}
                          type="text"
                          name="firstDiskName"
                          //id="serverCode"
                          placeholder="For instance: A, B, C"
                          defaultValue={server_detail ? server_detail.disk1 : null}
                          innerRef={disk1Ref}
                          valid={firstDiskName}
                          invalid={
                            firstDiskName == null
                              ? false
                              : !firstDiskName
                          }
                        />
                        <FormFeedback>Invalid Disk Name</FormFeedback>
                        <FormText>Max length is 10</FormText>
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                        <Label for="firstDiskVolume">First Disk Volume</Label>
                        <Input
                          onChange={event => checkValidation(event)}
                          type="number"
                          name="firstDiskVolume"
                          //id="serverCode"
                          placeholder="Number only"
                          defaultValue={server_detail ? server_detail.volume_disk1 : null}
                          innerRef={volume_disk1Ref}
                          valid={firstDiskVolume}
                          invalid={
                            firstDiskVolume == null
                              ? false
                              : !firstDiskVolume
                          }
                        />
                        <FormFeedback>Invalid Disk Volume</FormFeedback>
                        <FormText>Disk Volume, for instance: 10</FormText>
                      </FormGroup>
                    </Col>
                    <Col md={2}>
                      <FormGroup>
                        <Label for="firstDiskVolumeUnitSelect">Unit</Label>
                        <Input
                          type="select"
                          id="firstDiskVolumeUnitSelect"
                          name="firstDiskVolumeUnitSelect"
                          defaultValue={1}
                          disabled
                        //onChange={event => checkValidation(event)}
                        // innerRef={disk1UnitRef}
                        >
                          <option value="1">GB</option>
                          {/* <option value="2">TB</option> */}
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row form>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="secondDiskName">Second Disk Name</Label>
                        <Input
                          onChange={event => checkValidation(event)}
                          type="text"
                          name="secondDiskName"
                          //id="serverCode"
                          placeholder="For instance: A, B, C"
                          defaultValue={server_detail ? server_detail.disk2 : null}
                          innerRef={disk2Ref}
                          valid={secondDiskName}
                          invalid={
                            secondDiskName == null
                              ? false
                              : !secondDiskName
                          }
                        />
                        <FormFeedback>Invalid Disk Name</FormFeedback>
                        <FormText>Max length is 10</FormText>
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                        <Label for="secondDiskVolume">Second Disk Volume</Label>
                        <Input
                          onChange={event => checkValidation(event)}
                          type="number"
                          name="secondDiskVolume"
                          //id="serverCode"
                          placeholder="Number only"
                          defaultValue={server_detail ? server_detail.volume_disk2 : null}
                          innerRef={volume_disk2Ref}
                          valid={secondDiskVolume}
                          invalid={
                            secondDiskVolume == null
                              ? false
                              : !secondDiskVolume
                          }
                        />
                        <FormFeedback>Invalid Disk Volume</FormFeedback>
                        <FormText>Disk Volume, for instance: 10</FormText>
                      </FormGroup>
                    </Col>
                    <Col md={2}>
                      <FormGroup>
                        <Label for="secondDiskVolumeUnitSelect">Unit</Label>
                        <Input
                          type="select"
                          id="secondDiskVolumeUnitSelect"
                          name="secondDiskVolumeUnitSelect"
                          defaultValue={1}
                          disabled
                        //onChange={event => checkValidation(event)}
                        // innerRef={disk2UnitRef}
                        >
                          <option value="1">GB</option>
                          {/* <option value="2">TB</option> */}
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row form>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="thirdDiskName">Third Disk Name</Label>
                        <Input
                          onChange={event => checkValidation(event)}
                          type="text"
                          name="thirdDiskName"
                          //id="serverCode"
                          placeholder="For instance: A, B, C"
                          defaultValue={server_detail ? server_detail.disk3 : null}
                          innerRef={disk3Ref}
                          valid={thirdDiskName}
                          invalid={
                            thirdDiskName == null
                              ? false
                              : !thirdDiskName
                          }
                        />
                        <FormFeedback>Invalid Disk Name</FormFeedback>
                        <FormText>Max length is 10</FormText>
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                        <Label for="thirdDiskVolume">Third Disk Volume</Label>
                        <Input
                          onChange={event => checkValidation(event)}
                          type="number"
                          name="thirdDiskVolume"
                          //id="serverCode"
                          placeholder="Number only"
                          defaultValue={server_detail ? server_detail.volume_disk3 : null}
                          innerRef={volume_disk3Ref}
                          valid={thirdDiskVolume}
                          invalid={
                            thirdDiskVolume == null
                              ? false
                              : !thirdDiskVolume
                          }
                        />
                        <FormFeedback>Invalid Disk Volume</FormFeedback>
                        <FormText>Disk Volume, for instance: 10</FormText>
                      </FormGroup>
                    </Col>
                    <Col md={2}>
                      <FormGroup>
                        <Label for="thirdDiskVolumeUnitSelect">Unit</Label>
                        <Input
                          type="select"
                          id="thirdDiskVolumeUnitSelect"
                          name="thirdDiskVolumeUnitSelect"
                          defaultValue={1}
                          disabled
                        // onChange={event => checkValidation(event)}
                        // innerRef={disk3UnitRef}
                        >
                          <option value="1">GB</option>
                          {/* {/* <option value="2">TB</option> */} */}
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>

                  <hr />
                  <Button
                    disabled={!detailValidation()}
                    color="primary"
                    onClick={e => updateServerDetail(e)}
                  >
                    Update Server Detail
                  </Button>
                </Card>
              </Form>
            </TabPane>
            <TabPane tabId="3">
              <Form>
                <Card body>
                  <Row form>
                    <Col md={2}></Col>
                    <Col md={8}>
                      <Row form>
                        <Col md={6}>
                          <FormGroup>
                            {/* <Label for="serverID"  visible={0}>Server ID</Label> */}
                            <Input
                              //onChange={event => checkValidation(event)}
                              type="hidden"
                              // name="serverID"
                              //id="serverCode"
                              placeholder="Server ID is required"
                              defaultValue={id}

                            // valid={serverCodeValidation}
                            // invalid={
                            //   serverCodeValidation == null
                            //     ? false
                            //     : !serverCodeValidation
                            // }
                            />
                            {/* <FormFeedback>Invalid Server Code</FormFeedback>
                      <FormText>Max length is 10</FormText> */}
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            {/* <Label for="server_account_id" visible={false}>Server Account ID</Label> */}
                            <Input
                              //onChange={event => checkValidation(event)}
                              type="hidden"
                              name="server_account_id"
                              //id="serverCode"
                              placeholder="Server Account ID is required"
                              defaultValue={server_account.id ? server_account.id : 0}

                            // valid={serverCodeValidation}
                            // invalid={
                            //   serverCodeValidation == null
                            //     ? false
                            //     : !serverCodeValidation
                            // }
                            />
                            {/* <FormFeedback>Invalid Server Code</FormFeedback>
                      <FormText>Max length is 10</FormText> */}
                          </FormGroup>
                        </Col>
                      </Row>

                      <FormGroup>
                        <Label for="serverAccount">Account</Label>
                        <Input
                          onChange={event => checkValidation(event)}
                          type="text"
                          name="serverAccount"
                          //id="serverCode"
                          placeholder="Authenticate Account"
                          defaultValue={server_account.username ? server_account.username : "sa"}
                          innerRef={accountRef}
                          valid={serverAccount}
                          invalid={
                            serverAccount == null
                              ? false
                              : !serverAccount
                          }
                        />
                        <FormFeedback>Invalid Server Account</FormFeedback>
                        <FormText>Max length is 20</FormText>
                      </FormGroup>

                      <FormGroup>
                        <Label for="serverPassword">Password</Label>
                        <Row form>
                          <Col md={9}>
                            <Input
                              onChange={event => checkValidation(event)}
                              type={
                                serverAccountPasswordShowUp
                                  ? "password"
                                  : "text"
                              }
                              name="serverPassword"
                              //id="serverCode"
                              placeholder="For instance: A, B, C"
                              defaultValue={server_account.password ? server_account.password : "12345678"}
                              innerRef={passwordRef}
                              valid={serverPassword}
                              invalid={
                                serverPassword == null
                                  ? false
                                  : !serverPassword
                              }
                            />
                            <FormFeedback>Invalid Password</FormFeedback>
                            <FormText>Max length is 20</FormText>
                          </Col>
                          <Col md={3}>
                            <Button
                              color="primary"
                              onClick={e =>
                                setServerAccountPasswordShowUp(
                                  role < 2 ?
                                    !serverAccountPasswordShowUp : serverAccountPasswordShowUp
                                )
                              }
                            >
                              Show
                            </Button>{" "}
                          </Col>
                        </Row>
                      </FormGroup>
                      <FormGroup>
                        <Label for="serverConfirmPassword">
                          Confirm Password
                        </Label>
                        <Row form>
                          <Col md={9}>
                            <Input
                              onChange={event => checkValidation(event)}
                              type={
                                serverAccountConfirmPasswordShowUp
                                  ? "password"
                                  : "text"
                              }
                              name="serverConfirmPassword"
                              //id="serverCode"
                              placeholder="For instance: A, B, C"
                              defaultValue={server_account.password ? server_account.password : "12345678"}
                              innerRef={confirmPasswordRef}
                              valid={serverConfirmPassword}
                              invalid={
                                serverConfirmPassword == null
                                  ? false
                                  : !serverConfirmPassword
                              }
                            />
                            <FormFeedback>Password is not match</FormFeedback>
                            <FormText>Max length is 20</FormText>
                          </Col>
                          <Col md={3}>
                            <Button
                              color="primary"
                              onClick={e =>
                                setServerAccountConfirmPasswordShowUp(
                                  role < 2 ?
                                    !serverAccountConfirmPasswordShowUp :
                                    serverAccountConfirmPasswordShowUp
                                )
                              }
                            >
                              Show
                            </Button>
                          </Col>
                        </Row>
                      </FormGroup>
                      <hr />
                      <Row form>
                        <Button
                          disabled={!generalInformationValidation()}
                          color="primary"
                          className="btn-block"
                          onClick={e => updateServerAccount(e)}
                        >
                          Update Server Account
                      </Button>
                      </Row>
                    </Col>
                    <Col md={2}></Col>
                  </Row>
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
export default memo(ServerInformationModal, arePropsEqual);
