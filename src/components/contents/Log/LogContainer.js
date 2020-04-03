import React, { Component } from "react";
//  set up proptype
import PropTypes from "prop-types";
//  redux component
//  set up redux
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Action from "./../../../redux/Action/index.js";

//  presentation component
import Log from "./Log.jsx";
const uuidv1 = require("uuid/v1");
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
  index: PropTypes.number,
  data: PropTypes.array
};

const propsDefault = {
  index: 1,
  data: []
};

class LogContainer extends Component {
  static propTypes = propsProTypes;
  static defaultProps = propsDefault;
  state = {
    tableData: []
  };

  componentDidMount() {
    this.props.getData();
  }

  render() {
    let { data = [], disabled, toggleInformationModal } = this.props;
    return (
      <>
        {data.map((value, key) => {
          return (
            <Log
              index={key}
              key={uuidv1()}
              data={value}
              disabled={disabled}
              toggleInformationModal={toggleInformationModal}
            />
          );
        })}
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    data: state.Log.currentDataList,
    own: ownProps
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  toggleInformationModal: (event, id) => {
    event.preventDefault();
    if (id) {
      dispatch(Action.Log.storeCurrentSelectedLog(id));
      dispatch(Action.Log.toggleInformationModal);
    } 
  },
  disabled: async (
    event,
    id,
    active,
  ) => {
    event.preventDefault();
    if (id) {
      await dispatch(Action.Log.updateLogStatus(
        id,
        active
      ));
       dispatch(Action.Log.getData());
    }
  },
  getData: async () => {
    await dispatch(Action.Log.getData());
  },

  dispatch
});

//  compose all redux HOC
const enhance = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps, null)
);

export default enhance(LogContainer);
