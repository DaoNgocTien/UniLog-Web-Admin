import React, { Component } from "react";
//  set up proptype
import PropTypes from "prop-types";
//  reacttrap component
// import {
//   Button,
//   Modal,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
//   Col,
//   Row,
//   Form,
//   FormGroup,
//   Label,
//   Input,
//   FormFeedback,
//   FormText
// } from "reactstrap";

//  redux component
//  set up redux
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Action from "./../../../redux/Action/index.js";
//  presentation component
import ServerDetailModalPresentation from "./ServerDetailModalPresentation.jsx";
// const uuidv1 = require("uuid/v1");
//  compose function:
//  - (...fns): array all function need to compose
//  - x: collection / input value
//  - reduceRight: array loop function, from right to left (last -> last - 1 -> last - 2 -> ...)
//  =>  (y, f) => f(y), x === (previousValue, currentFunction) => currentFunction(previousValue), x
//  =>  take last function in collectionFunction fns, use innitial value x, return value (y)
//  =>  [a, b, c] => reduceRight((y, f) => f(y), x) === a(b(c))
const compose = (...fns) => x => fns.reduceRight((y, f) => f(y), x);

//  propType
const propsProTypes = {
  modal: PropTypes.bool,
  serverMasterList: PropTypes.array,
  server : PropTypes.object
  // toggleInformationModal: PropTypes.func
};

const propsDefault = {
  modal: false,
  serverMasterList: [],
  server: {
    id: 1,
    active: true,
    company_id: 1,
    create_time: "2017-12-09",
    description: "description",
    expired_date: "2017-12-09",
    ip_address: "192.168.1.1",
    name: "name",
    os: 1,
    server_code: "code",
    server_master: 1,
    server_url: "www.google.com",
    type: 1,
    update_time: "2017-12-09"
  }
  //toggleInformationModal: () => {}
};

class ServerDetailModal extends Component {
  static propTypes = propsProTypes;
  static defaultProps = propsDefault;
  state = {
    modal: false,
    data: {}
  };

  componentDidMount() {
    //console.log("ServerDetailModal componentDidMount: ", this.props);
    this.props.count();
  }

  toggle() {
    this.setState({ modal: !this.state.modal });
    this.props.toggleInformationModal();
  }

  isChange(event) {
    const name = event.target.name;
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    this.setState({
      [name]: value
    });
  }

  getValue() {
    alert(this.state);
  }
  render() {
    // const closeBtn = (
    //   <button className="close" onClick={() => this.toggle()}>
    //     &times;
    //   </button>
    // );
    // let {
    //    //id,
    //   name,
    //   ip_address: ipAddress,
    //   create_time: createTime,
    //   active,
    //  // company_id: companyId,
    //   description,
    //   expired_date: expiredDate,
    //   os,
    //   server_code: serverCode,
    //   server_master: serverMasterId,
    //   server_url: serverUrl,
    //   type,
    //   update_time: updateTime
    // } = this.props.data;
    //
    // console.log(this.state);
    // console.log(this.props.serverMasterList);
    console.log("DetailModal ", this.props);
    return (
      <ServerDetailModalPresentation fromProps={this.props}/>
      // <div>
      //   <Modal
      //     isOpen={this.state.modal}
      //     toggle={() => this.toggle()}
      //     // modalTransition={{ timeout: 1000 }}
      //     // backdropTransition={{ timeout: 1500 }}
      //     className={`modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable`}
      //   >
      //     <ModalHeader toggle={() => this.toggle()} close={closeBtn}>
      //       SERVER INFORMATION
      //     </ModalHeader>
      //     <ModalBody>
      //       <Form>
      //         <Row form>
      //           <Col md={6}>
      //             <FormGroup>
      //               <Label for="serverCode">Server Code</Label>
      //               <Input
      //                 onChange={event => this.isChange(event)}
      //                 type="text"
      //                 name="serverCode"
      //                 id="serverCode"
      //                 placeholder="Server Code"
      //                 disabled
      //                 defaultValue={serverCode}
      //               />
      //               <FormFeedback>
      //                 You will not be able to see this
      //               </FormFeedback>
      //               <FormText>
      //                 Example help text that remains unchanged.
      //               </FormText>
      //             </FormGroup>
      //           </Col>
      //           <Col md={6}>
      //             <FormGroup>
      //               <div className="position-relative form-group">
      //                 <Label for="expiredDate">Expired Date</Label>
      //                 <input
      //                   onChange={event => this.isChange(event)}
      //                   type="datetime-local"
      //                   className="form-control fg-input"
      //                   id="expiredDate"
      //                   name="expiredDate"
      //                   disabled
      //                   value={expiredDate}
      //                 />
      //                 <FormFeedback>
      //                   You will not be able to see this
      //                 </FormFeedback>
      //                 <FormText>
      //                   Example help text that remains unchanged.
      //                 </FormText>
      //               </div>
      //             </FormGroup>
      //           </Col>
      //         </Row>
      //         <Row form>
      //           <Col md={6}>
      //             <FormGroup>
      //               <Label for="ipAddress">IP Address</Label>
      //               <Input
      //                 onChange={event => this.isChange(event)}
      //                 type="text"
      //                 name="ipAddress"
      //                 id="ipAddress"
      //                 placeholder="IP Address"
      //                 defaultValue={ipAddress}
      //               />
      //               <FormFeedback>
      //                 You will not be able to see this
      //               </FormFeedback>
      //               <FormText>
      //                 Example help text that remains unchanged.
      //               </FormText>
      //             </FormGroup>
      //           </Col>

      //           <Col md={6}>
      //             <FormGroup>
      //               <div className="position-relative form-group">
      //                 <Label for="createDate">Create Date</Label>

      //                 <input
      //                   onChange={event => this.isChange(event)}
      //                   type="datetime-local"
      //                   className="form-control fg-input"
      //                   id="createDate"
      //                   name="createDate"
      //                   disabled
      //                   value={createTime}
      //                 />
      //                 <FormFeedback>
      //                   You will not be able to see this
      //                 </FormFeedback>
      //                 <FormText>
      //                   Example help text that remains unchanged.
      //                 </FormText>
      //               </div>
      //             </FormGroup>
      //           </Col>
      //         </Row>
      //         <Row form>
      //           <Col md={6}>
      //             <FormGroup>
      //               <Label for="serverName">Server Name</Label>
      //               <Input
      //                 onChange={event => this.isChange(event)}
      //                 type="text"
      //                 name="serverName"
      //                 id="serverName"
      //                 placeholder="Server Name"
      //                 defaultValue={name}
      //               />
      //               <FormFeedback>
      //                 You will not be able to see this
      //               </FormFeedback>
      //               <FormText>
      //                 Example help text that remains unchanged.
      //               </FormText>
      //             </FormGroup>
      //           </Col>

      //           <Col md={6}>
      //             <FormGroup>
      //               <div className="position-relative form-group">
      //                 <Label for="updateDate">Update Date</Label>

      //                 <input
      //                   onChange={event => this.isChange(event)}
      //                   type="datetime-local"
      //                   className="form-control fg-input"
      //                   id="updateDate"
      //                   name="updateDate"
      //                   disabled
      //                   value={updateTime}
      //                 />
      //                 <FormFeedback>
      //                   You will not be able to see this
      //                 </FormFeedback>
      //                 <FormText>
      //                   Example help text that remains unchanged.
      //                 </FormText>
      //               </div>
      //             </FormGroup>
      //           </Col>
      //         </Row>
      //         <FormGroup>
      //           <div className="fg-line">
      //             <p className="f-500 c-black m-b-15">Choose Server Master</p>
      //             <div className="select">
      //               <select
      //                 id="serverMasterSelect"
      //                 className="form-control"
      //                 onChange={event => this.isChange(event)}
      //                 defaultValue={serverMasterId}
      //               >
      //                 {this.props.serverMasterList
      //                   ? this.props.serverMasterList.map(server => {
      //                       return (
      //                         <option
      //                           key={uuidv1()}
      //                           defaultValue={server.id}
      //                           id="serverMasterHidden"
      //                         >
      //                           {server.name}
      //                         </option>
      //                       );
      //                     })
      //                   : null}
      //               </select>
      //             </div>
      //           </div>
      //         </FormGroup>
      //         <FormGroup>
      //           <div className="fg-line">
      //             <p className="f-500 c-black m-b-15">Choose Type</p>
      //             <div className="select">
      //               <select
      //                 id="typeSelect"
      //                 className="form-control"
      //                 onChange={event => this.isChange(event)}
      //                 defaultValue={type}
      //               >
      //                 <option value="1" id="typeHidden">
      //                   Physical Web Server
      //                 </option>
      //                 <option value="2" id="typeHidden">
      //                   Cloud Web Server
      //                 </option>
      //                 <option value="3" id="typeHidden">
      //                   Repo Server
      //                 </option>
      //                 <option value="4" id="typeHidden">
      //                   Database Server
      //                 </option>
      //               </select>
      //             </div>
      //           </div>
      //         </FormGroup>
      //         <FormGroup>
      //           <div className="fg-line">
      //             <p className="f-500 c-black m-b-15">
      //               Choose Operation System
      //             </p>
      //             <div className="select">
      //               <select
      //                 id="osSelect"
      //                 className="form-control"
      //                 onChange={event => this.isChange(event)}
      //                 defaultValue={os}
      //               >
      //                 <option value="1" id="osHidden">
      //                   Windows Os
      //                 </option>
      //                 <option value="2" id="osHidden">
      //                   Linux Os
      //                 </option>
      //                 <option value="3" id="osHidden">
      //                   Azure Git
      //                 </option>
      //                 <option value="4" id="osHidden">
      //                   GitHub
      //                 </option>
      //                 <option value="5" id="osHidden">
      //                   GitLab
      //                 </option>
      //                 <option value="6" id="osHidden">
      //                   Other Git
      //                 </option>
      //                 <option value="7" id="osHidden">
      //                   Microsoft SQL
      //                 </option>
      //                 <option value="8" id="osHidden">
      //                   MongoDB
      //                 </option>
      //                 <option value="9" id="osHidden">
      //                   FirebaseDB
      //                 </option>
      //                 <option value="10" id="osHidden">
      //                   Other DB
      //                 </option>
      //               </select>
      //             </div>
      //           </div>
      //         </FormGroup>

      //         <FormGroup>
      //           <Label for="serverUrl">Server Url</Label>
      //           <Input
      //             onChange={event => this.isChange(event)}
      //             type="text"
      //             name="serverUrl"
      //             id="exampleAddress"
      //             placeholder="1234 Main St"
      //             defaultValue={serverUrl}
      //           />
      //           <FormFeedback>You will not be able to see this</FormFeedback>
      //           <FormText>Example help text that remains unchanged.</FormText>
      //         </FormGroup>
      //         <FormGroup>
      //           <Label for="description">Description</Label>
      //           <Col sm={10}>
      //             <Input
      //               onChange={event => this.isChange(event)}
      //               type="textarea"
      //               name="description"
      //               id="description"
      //               defaultValue={description}
      //             />
      //           </Col>
      //           <FormFeedback>You will not be able to see this</FormFeedback>
      //           <FormText>Example help text that remains unchanged.</FormText>
      //         </FormGroup>
      //         <FormGroup check>
      //           <Input
      //             onChange={event => this.isChange(event)}
      //             type="checkbox"
      //             name="isActiveCheck"
      //             id="isActiveCheck"
      //             checked={active}
      //           />
      //           <Label for="isActiveCheck" check>
      //             Active
      //           </Label>
      //         </FormGroup>
      //       </Form>
      //     </ModalBody>
      //     <ModalFooter>
      //       <Button color="primary" onClick={() => this.toggle()}>
      //         Update Server Information
      //       </Button>{" "}
      //       <Button color="secondary" onClick={() => this.toggle()}>
      //         Cancel
      //       </Button>
      //     </ModalFooter>
      //   </Modal>
      // </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    modal: state.Server.toggleInformationModal,
    serverMasterList: state.Server.currentServerMasterList,
    own: ownProps,
    server: state.Server.currentDataList.find(
      server => server.id === state.Server.currentSelectedServer
    )
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  count : () => {
    dispatch({type: "COUNT"});
  },
  toggleInformationModal: () => {
    dispatch(Action.Server.toggleInformationModal);
  },
  update: (event, id) => {
    event.preventDefault();
    if (id) {
      //     console.log(ownProps);
      //   let serverDetail = this.props.serverList.find(server => server.id == id);
      //   if (serverDetail) {
      // dispatch(Action.checkLogin(email, password));
      alert("Update \n" + id);
      //   }
    }
  },
  disabled: (event, id) => {
    event.preventDefault();
    if (id) {
      // console.log(ownProps);
      //   let serverDetail = this.props.serverList.find(server => server.id == id);
      //   if (serverDetail) {
      // dispatch(Action.checkLogin(email, password));
      alert("Disabled \n" + id);
      //   }
    }
  },
  dispatch
});

//  compose all redux HOC
const enhance = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps, null)
);

export default enhance(ServerDetailModal);
