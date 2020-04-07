import React from "react";
// import { Redirect } from "react-router-dom";

import { connect } from "react-redux";
import Action from "./../../../redux/Action/index";

class Logout extends React.Component {
    componentDidMount = () => {
        this.props.logout();
    }
    render() {
        return (
            <>

            </>
        );
    }
}
const mapStateToProps = state => {
    return {
    };
};

// const mapDispatchToProps = (dispatch, ownProps) => ({
const mapDispatchToProps = dispatch => ({
    logout: () => {
        dispatch(Action.Login.logout());
    },

    dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
