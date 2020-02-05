import React, { Component } from "react";
//  set up proptype
import PropTypes from "prop-types";
//  set up redux
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
//  table presentation HOC
import TablePresentation from "./TablePresentation.js";
//  compose function:
//  - (...fns): array all function need to compose
//  - x: collection / input value
//  - reduceRight: array loop function, from right to left (last -> last - 1 -> last - 2 -> ...)
//  =>  (y, f) => f(y), x === (previousValue, currentFunction) => currentFunction(previousValue), x
//  =>  take last function in collectionFunction fns, use innitial value x, return value (y)
//  =>  [a, b, c] => reduceRight((y, f) => f(y), x) === a(b(c))
const compose = (...fns) => x => fns.reduceRight((y, f) => f(y), x);

const propsProTypes = {
  //data: PropTypes.array,
  toggleCreateModal: PropTypes.func,
  getData: PropTypes.func
  // header: PropTypes.arrayOf(
  //   (propValue, key, componentName, location, propFullName) => {
  //     if (typeof propValue !== "string" || typeof propValue !== "number") {
  //       return new TypeError(
  //         `Invalid prop ${propFullName} supplied to ${componentName}.
  //     Validation failed at location: ${location}.
  //     Props at index ${key} in Array.`
  //       );
  //     }
  //     if (!propValue) {
  //       return new Error(
  //         `Invalid prop ${propFullName} supplied to ${componentName}.
  //     Validation failed at location: ${location}.
  //     Props at index ${key} in Array.`
  //       );
  //     }
  //   }
  // ).isRequired,
  // getData: PropTypes.any
};

const propsDefault = {
  //data: [],
  toggleCreateModal: () => {},
  getData: () => {}
  //header: []
};

const TableContainer = (WrappedComponent, RegistrationModal, DetailModal, Action, header) => {
  //console.log("TableContainer ", props);
  // console.log("TableContainer ", WrappedComponent);
  // console.log("TableContainer ", Action);
  // console.log("TableContainer ", header);

  const Wrapper = props => {
    //  props: current props in Wrapper (get from m)
    // console.log("Wrapper ", props);
    return class extends Component {
      static propTypes = propsProTypes;
      static defaultProps = propsDefault;
      // state = {
      //   tableData: []
      // };

      componentDidMount() {
        //console.log("TableContainer componentDidMount: ");
        this.props.getData();
        //this.props.toggleCreateModal();
      }

      shouldComponentUpdate(nextProps) {
        // console.log(`shouldComponentUpdate: 
        // this.props: ${this.props}
        // nextProps: ${nextProps}`);
        if (this.props.getData || this.props.toggleCreateModal) {
          alert("true 1");
          return true;
        }
        if (
          this.props.getData === nextProps.getData &&
          this.props.toggleCreateModal === nextProps.toggleCreateModal
        ) {
          alert("false");
          return false;
        }
        alert("true 2");
        return true;
      }

      render() {
        // console.log("TableContainer render", WrappedComponent);
        // console.log("TableContainer render", Action);
        // console.log("TableContainer render", header);
        let { toggleCreateModal } = this.props;
        //console.log("Wrapper ", this.props);
        // console.log("TableContainer render", update2);
        return (
          <TablePresentation
            WrappedComponent={WrappedComponent}
            RegistrationModal={RegistrationModal}
            DetailModal={DetailModal}
            header={header}
            toggleCreateModal={toggleCreateModal}
          />
        );
      }
    };
  };

  const mapDispatchToProps = (dispatch, ownProps) => {
    return {
      getData: () => dispatch(Action.getData()),
      toggleCreateModal: () => dispatch(Action.toggleCreateModal),

      dispatch
    };
  };

  // const mapStateToProps = (state, ownProps) => {
  //   return {
  //     toggle: state.Server.toggleCreateModal
  //   };
  // };

  //  compose all redux HOC
  const enhance = compose(withRouter, connect(null, mapDispatchToProps, null));

  //  return current HOC
  return enhance(Wrapper());
};

export default TableContainer;
