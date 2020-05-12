import React from "react";
import classnames from "classnames/bind";
import styles from "./App.module.scss";
import { BrowserRouter, Link, Redirect, Route, Switch, useHistory } from "react-router-dom";
import TasksWrapper from "./Tasks/TasksWrapper/TasksWrapper";
import ProjectsWrapper from "./Projects/ProjectsWrapper/ProjectsWrapper";
import TaskEditDialog from "./Dialogs/TaskEditDialog/TaskEditDialog";
import SignUp from "./Authentication/SignUp/SignUp";
import { connect } from "react-redux";
import SignIn from "./Authentication/SignIn/SignIn";
import PropTypes from "prop-types";
import { authenticationSuccess } from "../actions/authentication";
import { ButtonComponent } from "./Buttons/Buttons";

const cx = classnames.bind(styles);

const mapStateToProps = state => ({
    isAuthenticated: state.authenticationReducer.isAuthenticated
});

class App extends React.Component {
    state = {
        isFetching: true
    };

    componentDidMount() {
        const token = localStorage.getItem("token");
        if (token)
            this.props.restoreSessionSuccess(token);
        this.setState({ isFetching: false });
    }

    render() {
        if (this.state.isFetching)
            return null;

        const isAuthenticated = this.props.isAuthenticated;
        return (
            <BrowserRouter>
                <div className={cx("app")}>
                    <Switch>
                        <Route exact path="/">
                            {!isAuthenticated ? <Home/> : <Redirect to="/projects/"/>}
                        </Route>

                        <Route exact path="/sign-up">
                            {!isAuthenticated ? <SignUp/> : <Redirect to="/projects/"/>}
                        </Route>

                        <Route exact path="/sign-in">
                            {!isAuthenticated ? <SignIn/> : <Redirect to="/projects/"/>}
                        </Route>

                        <Route exact path="/projects/"
                               component={(props) =>
                                   (isAuthenticated
                                       ? <ProjectsWrapper {...props}/>
                                       : <Redirect to="/"/>
                                   )}/>

                        <Route path="/projects/:projectId/"
                               component={(props) =>
                                   (isAuthenticated
                                       ? <TasksWrapper projectId={Number(props.match.params.projectId)} {...props}/>
                                       : <Redirect to="/"/>
                                   )}/>

                       <Redirect to="/"/>
                    </Switch>
                    <TaskEditDialog/>
                </div>
            </BrowserRouter>
        );
    }
}

const Home = () => {
    const history = useHistory();
    return (
        <div className={cx("home-wrapper")}>
            <h1 className={cx("home-header")}>Home</h1>
            <div className={cx("home-auth-buttons")}>
                <ButtonComponent
                    text="Sign Up"
                    onClick={() => history.push("/sign-up")}/>
                <ButtonComponent
                    text="Sign In"
                    onClick={() => history.push("/sign-in")}/>
            </div>
        </div>
    );
};

const mapDispatchToProps = dispatch => ({
    restoreSessionSuccess: (token) => dispatch(authenticationSuccess(token))
});

App.propTypes = {
    isAuthenticated: PropTypes.bool,
    restoreSessionSuccess: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(App);