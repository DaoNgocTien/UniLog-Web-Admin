import React, { Component } from "react";
//  set up proptype
import PropTypes from "prop-types";
//  redux component
//  set up redux
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Action from "./../../../redux/Action/index.js";

//  presentation component
import ServerPresentation from "./ServerPresentation.jsx";
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

class ServerContainer extends Component {
  static propTypes = propsProTypes;
  static defaultProps = propsDefault;
  state = {
    tableData: []
  };

  componentDidMount() {
    //console.log("ServerContainer componentDidMount: ", this.props);
    this.props.applicationTest();
    this.setState({
      tableData: this.props.data
    })
  }

  // componentDidUpdate(prevProps, prevState) {
  //   console.log("ServerContainer componentDidUpdate ");
  // }

  // shouldComponentUpdate(nextProps) {
  //   console.log("Server Container: " + JSON.stringify(this.props))
  //   if (this.props.data === null) {
  //     return true;
  //   }
  //   if (this.props.data === nextProps.data) {
  //     return false;
  //   }
  //   return true;
  // }

  render() {
    //console.log("Server Container: " + JSON.stringify(this.props));
    let { data = [], disabled, toggleInformationModal } = this.props;
    return (
      <>
        {data.map((value, key) => {
          return (
            <ServerPresentation
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
    data: state.Server.currentDataList,
    own: ownProps
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  toggleInformationModal: (event, id) => {
    event.preventDefault();
    if (id) {
      //console.log(id);
      dispatch(Action.Server.storeCurrentSelectedServer(id));
      dispatch(Action.Server.toggleInformationModal);
    } else {
      alert("Invalid ID ", id);
    }
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
  applicationTest: () => {
    dispatch(Action.Application.applicationTest());
  },

  dispatch
});

//  compose all redux HOC
const enhance = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps, null)
);

export default enhance(ServerContainer);
