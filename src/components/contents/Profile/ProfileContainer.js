// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    Container,
    Row,
    Col
} from "reactstrap";
// core components
import UserHeader from "./../../layouts/Headers/UserHeader.jsx";
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
import Action from "../../../redux/Action/index.js";
import Profile from "./Profile.jsx";
import PasswordChangingModalContainer from "./PasswordChangingModalContainer.js";

// const uuidv1 = require("uuid/v1");
//  compose function:
//  - (...fns): array all function need to compose
//  - x: collection / input value
//  - reduceRight: array loop function, from right to left (last -> last - 1 -> last - 2 -> ...)
//  =>  (y, f) => f(y), x === (previousValue, currentFunction) => currentFunction(previousValue), x
//  =>  take last function in collectionFunction fns, use innitial value x, return value (y)
//  =>  [a, b, c] => reduceRight((y, f) => f(y), x) === a(b(c))
const compose = (...fns) => x => fns.reduceRight((y, f) => f(y), x);

//  Employee Name validation
const validateName = ({
    name
}) => {
    return name ? name.length <= 300 && name.length > 5 : false;
};
//  Employee Name validation
const validateAddress = ({
    address
}) => {
    return address ? address.length <= 300 && address.length >= 0 : false;
};
//  Employee Name validation
const validatePhone = ({
    phone
}) => {
    return phone ? phone.length <= 300 && phone.length >= 0 : false;
};

//  propType
const propsProTypes = {

    //  validation func
    validateName: PropTypes.func,
    validateAddress: PropTypes.func,
    validatePhone: PropTypes.func,
};

const propsDefault = {

    validateName: validateName,
    validateAddress: validateAddress,
    validatePhone: validatePhone
};

class ProfileContainer extends Component {
    static propTypes = propsProTypes;
    static defaultProps = propsDefault;

    componentDidMount = async () => {
        await this.props.getData(this.props.id);

    }
    render() {

        let {
            toggle,
        } = this.props;

        return ( 
            <>
            <
            UserHeader / >
            <PasswordChangingModalContainer />
            <
            Profile fromProps = {
                this.props
            }
            />  
            </>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        id: state.Login.loginInfor.id,
        own: ownProps,
        // toggle: state.Profile.toggleProfileComponent,
        employee: state.Profile.currentDataList,
        listLog: state.Log.currentDataList,
        listApplication: state.Application.currentDataList,
        listApplicationInstance: state.ApplicationInstance.currentDataList,

    };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    getData: async (id) => {
        await dispatch(Action.Profile.getData(id));
        await dispatch(Action.Log.getData(id));
        await dispatch(Action.Application.getData(id));
        await dispatch(Action.ApplicationInstance.getData(id));
    },
    updateProfile: async profile => {
        await dispatch(Action.Profile.updateProfile(profile));
        await dispatch(Action.Employee.getData());
    },

    dispatch
});

//  compose all redux HOC
const enhance = compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps, null)
);

export default enhance(ProfileContainer);