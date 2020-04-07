import React, {
    Component
} from "react";
//  set up proptype
import PropTypes from "prop-types";
//  redux component
//  set up redux
import {
    connect
} from "react-redux";
import {
    withRouter
} from "react-router-dom";
import Action from "./../../../redux/Action/index.js";

//  presentation component
import ProjectAssignment from "./ProjectAssignment.jsx";
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
    index: PropTypes.number,
    data: PropTypes.array
};

const propsDefault = {
    index: 1,
    data: []
};

class ProjectAssignmentContainer extends Component {
    static propTypes = propsProTypes;
    static defaultProps = propsDefault;
    componentDidMount = () => {
        this.props.getData();
    }
    render() {
        let header = ["Project Name", "Type", "Description", "Action"];
        return ( <
            ProjectAssignment header = {
                header
            }
            fromProps = {
                this.props
            }
            / >
        );
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        data: state.Employee.currentDataList.find(
                Employee => Employee.id === state.Employee.currentSelectedEmployee
            ).role === 2 ?
            state.Application.currentDataList : state.ApplicationInstance.currentDataList,
        own: ownProps,
        userId: state.Employee.currentSelectedEmployee,
        userRole: state.Employee.currentDataList.find(
            Employee => Employee.id === state.Employee.currentSelectedEmployee
        ).role,
        userProject: state.Employee.currentDataList.find(
            Employee => Employee.id === state.Employee.currentSelectedEmployee
        ).manage_project,
        type: state.Employee.currentDataList.find(
            Employee => Employee.id === state.Employee.currentSelectedEmployee
        ).role === 2 ? "Application" : "Application Instance"
    };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    assign: async manageProject => {
        if (manageProject.id) {
            await dispatch(Action.Employee.addEmployeeIntoProject(
                manageProject
            ));
            await dispatch(Action.Employee.getData());
            await dispatch(Action.Application.getData());
            await dispatch(Action.ApplicationInstance.getData());
        }
    },

    getData: async () => {
        await dispatch(Action.Application.getData());
        await dispatch(Action.ApplicationInstance.getData());
    },

    dispatch
});

//  compose all redux HOC
const enhance = compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps, null)
);

export default enhance(ProjectAssignmentContainer);