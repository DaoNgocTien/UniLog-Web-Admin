import React, {
    Component
  } from "react";
  //  set up proptype
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
  
  //  redux component
  //  set up redux
  import {
    connect
  } from "react-redux";
  import {
    withRouter
  } from "react-router-dom";
  import Action from "../../../redux/Action/index.js";
  import APISettings from "./../../../redux/Url/APISettings";
  // const uuidv1 = require("uuid/v1");
  //  compose function:
  //  - (...fns): array all function need to compose
  //  - x: collection / input value
  //  - reduceRight: array loop function, from right to left (last -> last - 1 -> last - 2 -> ...)
  //  =>  (y, f) => f(y), x === (previousValue, currentFunction) => currentFunction(previousValue), x
  //  =>  take last function in collectionFunction fns, use innitial value x, return value (y)
  //  =>  [a, b, c] => reduceRight((y, f) => f(y), x) === a(b(c))
  const compose = (...fns) => x => fns.reduceRight((y, f) => f(y), x);
  
  class LogRegistrationModal extends Component {
  
    render() {
        let{modal, toggleCreateModal} = this.props;
        const closeBtn = (
            <button className="close" onClick={toggleCreateModal}>
              &times;
            </button>
          );
          let guide = 
          `Call API:
          ${APISettings.BASE_API_URL}/${APISettings.LOG_API_URL}/error
          Body:
          {
            "app_code": "string",
            "serverity": 3,
            "exception": {}
          }`
      return ( <div>
        <Modal
          isOpen={modal}
          toggle={toggleCreateModal}
          // modalTransition={{ timeout: 1000 }}
          // backdropTransition={{ timeout: 1500 }}
          className={`modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable`}
        >
          <ModalHeader toggle={() => this.toggleCreateModal()} close={closeBtn}>
            LOG REGISTRATION
          </ModalHeader>
          <ModalBody>
            <Form>
                    <Label for="guide">Guide</Label>
                      <Input
                        type="textarea"
                        name="guide"
                        id="guide"
                        value={guide}
                        disabled
                        style={{height: '200px'}}
                      />
            </Form>
          </ModalBody>
          <ModalFooter>
            {" "}            
            <Button color="primary" onClick={toggleCreateModal}>
              Ok
            </Button>
  
          </ModalFooter>
        </Modal>
      </div>
      );
    }
  }
  
  const mapStateToProps = (state, ownProps) => {
    return {
      modal: state.Log.toggleCreateModal,
    };
  };
  
  const mapDispatchToProps = (dispatch, ownProps) => ({
    //  toogle information modal
    toggleCreateModal: () => {
      dispatch(Action.Log.toggleCreateModal);
    },
  
    dispatch
  });
  
  //  compose all redux HOC
  const enhance = compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps, null)
  );
  
  export default enhance(LogRegistrationModal);