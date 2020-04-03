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
import Repo from "./Repo";
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

class RepoContainer extends Component {
    static propTypes = propsProTypes;
    static defaultProps = propsDefault;
    componentDidMount = () => {
        this.props.getData();
    }
    render() {
        let header = ["Repo Name", "Server", "Url", "Action"];
      
        return ( <
            Repo header = {
                header
            }
            repoList = {
                this.props.data
            }
            / >
        );
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        data: state.Repo.currentDataList.map(repo => {
            return repo.application_id == state.Application.currentSelectedApplication ? repo: null;
        }),
        own: ownProps
    };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    delete: async (event, id) => {
        event.preventDefault();
        if (id) {
            await dispatch(Action.Repo.deleteRepo(
                id
            ));
            dispatch(Action.Repo.getData());
        }
    },

    getData: async () => {
        await dispatch(Action.Repo.getData());
    },

    dispatch
});

//  compose all redux HOC
const enhance = compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps, null)
);

export default enhance(RepoContainer);