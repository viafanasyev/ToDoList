import React from "react";
import classnames from "classnames/bind";
import styles from "./SignIn.module.scss";
import { connect } from "react-redux";
import { TextInputComponent } from "../../TextInputs/TextInputs";
import { ButtonComponent } from "../../Buttons/Buttons";
import PropTypes from "prop-types";
import { signIn } from "../../../actions/authentication";

const cx = classnames.bind(styles);

const mapStateToProps = state => ({

});

class SignIn extends React.Component {
    state = {
        username: "",
        password: "",
        errors: {}
    };

    handleSignUpButtonClick = () => {
        this.setState(oldState => {
            const state = {
                ...oldState
            };

            delete state.errors.username;
            delete state.errors.password;

            if (state.username.length === 0)
                state.errors.username = "Username can't be empty";

            if (state.password.length === 0)
                state.errors.password = "Password can't be empty";

            if (Object.keys(state.errors).length > 0)
                return state;

            this.props.signIn(state.username, state.password);

            return state;
        });
    };

    handleInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        return (
            <div className={cx("sign-in-form")}>

                <h2>Sign In</h2>

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

                <ButtonComponent
                    text={"Sign In"}
                    onClick={this.handleSignUpButtonClick}/>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    signIn: (username, password) => dispatch(signIn(username, password))
});

SignIn.propTypes = {
    signIn: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);