import React from "react";
import classnames from "classnames/bind";
import styles from "./SignUp.module.scss";
import { connect } from "react-redux";
import { TextInputComponent } from "../../TextInputs/TextInputs";
import { ButtonComponent } from "../../Buttons/Buttons";
import PropTypes from "prop-types";
import { clearAuthErrorMessages, signUp } from "../../../actions/authentication";

const cx = classnames.bind(styles);

const mapStateToProps = state => ({
    authErrors: state.authenticationReducer.signUpErrors
});

const USERNAME_MIN_LENGTH = 4;
const PASSWORD_MIN_LENGTH = 6;

class SignUp extends React.Component {
    state = {
        username: "",
        password: "",
        passwordConfirmation: "",
        errors: {}
    };

    handleSignUpButtonClick = () => {
        this.setState(oldState => {
            const state = {
                ...oldState
            };

            delete state.errors.username;
            delete state.errors.password;
            delete state.errors.passwordConfirmation;

            if (state.username.length < USERNAME_MIN_LENGTH)
                state.errors.username = `Username should be at least ${USERNAME_MIN_LENGTH} characters long`;

            if (state.password.length < PASSWORD_MIN_LENGTH)
                state.errors.password = `Password should be at least ${PASSWORD_MIN_LENGTH} characters long`;

            if (state.password !== state.passwordConfirmation)
                state.errors.passwordConfirmation = "Passwords don't match";

            if (Object.keys(state.errors).length > 0)
                return state;

            this.props.signUp(state.username, state.password);

            return state;
        });
    };

    handleInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value, errors: {} });
        if (this.props.authErrors !== {})
            this.props.clearErrors();
    };

    render() {
        return (
            <div className={cx("sign-up-form")}>

                <h2>Sign Up</h2>

                <TextInputComponent
                    name="username"
                    value={this.state.username}
                    onChange={this.handleInputChange}
                    placeholder={"Username"}
                    withError={this.state.errors.hasOwnProperty("username")
                        || this.props.authErrors.hasOwnProperty("username")}
                    errorMessage={this.state.errors.hasOwnProperty("username")
                        ? this.state.errors.username
                        : this.props.authErrors.username}/>
                <TextInputComponent
                    name="password"
                    type="password"
                    value={this.state.password}
                    onChange={this.handleInputChange}
                    placeholder={"Password"}
                    withError={this.state.errors.hasOwnProperty("password")}
                    errorMessage={this.state.errors.password}/>
                <TextInputComponent
                    name="passwordConfirmation"
                    type="password"
                    value={this.state.passwordConfirmation}
                    onChange={this.handleInputChange}
                    placeholder={"Confirm password"}
                    withError={this.state.errors.hasOwnProperty("passwordConfirmation")}
                    errorMessage={this.state.errors.passwordConfirmation}/>

                <ButtonComponent
                    text={"Sign Up"}
                    onClick={this.handleSignUpButtonClick}/>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    signUp: (username, password) => dispatch(signUp(username, password)),
    clearErrors: () => dispatch(clearAuthErrorMessages())
});

SignUp.propTypes = {
    signUp: PropTypes.func,
    authErrors: PropTypes.objectOf(PropTypes.string)
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);