import React, {
    Component
} from "react";
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
import {
    connect
} from "react-redux";
import {
    withRouter
} from "react-router-dom";
import Action from "../../../redux/Action/index.js";

//  presentation component
import Register from "./Register.jsx";

//const uuidv1 = require("uuid/v1");

//  compose function:
//  - (...fns): array all function need to compose
//  - x: collection / input value
//  - reduceRight: array loop function, from right to left (last -> last - 1 -> last - 2 -> ...)
//  =>  (y, f) => f(y), x === (previousValue, currentFunction) => currentFunction(previousValue), x
//  =>  take last function in collectionFunction fns, use innitial value x, return value (y)
//  =>  [a, b, c] => reduceRight((y, f) => f(y), x) === a(b(c))
const compose = (...fns) => x => fns.reduceRight((y, f) => f(y), x);

//  Validation secction
//  Employee Name validation
const validatePassword = ({
    password
}) => {
    console.log("Validate password " + password)
    return password ? password.length <= 300 && password.length > 5 : false;
};
//  Email validation
const validateEmail = ({
    email = "https://www.google.com"
}) => {
    console.log("Validate email " + email)
    let regex = new RegExp(
        "^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|(www\\.)?){1}([0-9A-Za-z-\\.@:%_+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?"
    );
    return regex.test(email) || email.length === 0;
};


//  propType
const propsProTypes = {
    //  create new guest func
    createNewApplication: PropTypes.func,

    //  validation func
    validation: PropTypes.bool,
    validatePassword: PropTypes.func,
    validateEmail: PropTypes.func,
};

const propsDefault = {
    createNewApplication: () => {},

    validatePassword: validatePassword,
    validateEmail: validateEmail,
};

class RegisterContainer extends Component {
    static propTypes = propsProTypes;
    static defaultProps = propsDefault;
   
    render() {
        return ( <
            Register fromProps = {
                this.props
            }
            />
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        own: ownProps
    };
};

const mapDispatchToProps = (dispatch, ownProps) => ({

    createNewEmployee: async Employee => {
        if (Employee) {
            //     console.log(ownProps);
            await dispatch(Action.Employee.createNewEmployee(Employee));
        }
    },

    dispatch
});

//  compose all redux HOC
const enhance = compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps, null)
);

export default enhance(RegisterContainer);