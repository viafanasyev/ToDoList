import React from "react";
import classnames from "classnames/bind";
import styles from "./SignUp.module.scss";
import { connect } from "react-redux";
import { TextInputComponent } from "../../TextInputs/TextInputs";
import { ButtonComponent } from "../../Buttons/Buttons";

const cx = classnames.bind(styles);

const mapStateToProps = state => ({

});

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

            if (state.username.length === 0)
                state.errors.username = "Username can't be empty";

            if (state.password.length === 0)
                state.errors.password = "Password can't be empty";

            if (state.password !== state.passwordConfirmation)
                state.errors.passwordConfirmation = "Passwords don't match";

            if (Object.keys(state.errors).length > 0)
                return state;

            return state;
        });
    };

    handleInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
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
                    withError={this.state.errors.hasOwnProperty("username")}
                    errorMessage={this.state.errors.username}/>
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

});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);