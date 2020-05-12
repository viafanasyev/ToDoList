import React from "react";
import classnames from "classnames/bind";
import styles from "./App.module.scss";
import { BrowserRouter, Link, Redirect, Route, Switch } from "react-router-dom";
import TasksWrapper from "./Tasks/TasksWrapper/TasksWrapper";
import ProjectsWrapper from "./Projects/ProjectsWrapper/ProjectsWrapper";
import TaskEditDialog from "./Dialogs/TaskEditDialog/TaskEditDialog";
import SignUp from "./Authentication/SignUp/SignUp";
import { connect } from "react-redux";
import SignIn from "./Authentication/SignIn/SignIn";
import PropTypes from "prop-types";
import { authenticationSuccess } from "../actions/authentication";

const cx = classnames.bind(styles);

const mapStateToProps = state => ({
    isAuthorized: state.authenticationReducer.isAuthorized
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

        const isAuthorized = this.props.isAuthorized;
        return (
            <BrowserRouter>
                <div className={cx("app")}>
                    <Switch>
                        <Route exact path="/">
                            {!isAuthorized ? <Home/> : <Redirect to="/projects/"/>}
                        </Route>

                        <Route exact path="/sign-up">
                            {!isAuthorized ? <SignUp/> : <Redirect to="/projects/"/>}
                        </Route>

                        <Route exact path="/sign-in">
                            {!isAuthorized ? <SignIn/> : <Redirect to="/projects/"/>}
                        </Route>

                        <Route exact path="/projects/"
                               component={(props) =>
                                   (isAuthorized
                                       ? <ProjectsWrapper {...props}/>
                                       : <Redirect to="/"/>
                                   )}/>

                        <Route path="/projects/:projectId/"
                               component={(props) =>
                                   (isAuthorized
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

const Home = () => (
    <div>
        <h1>Home</h1>
        <div><Link to="/sign-up">Sign up</Link></div>
        <div><Link to="/sign-in">Sign In</Link></div>
    </div>
);

const mapDispatchToProps = dispatch => ({
    restoreSessionSuccess: (token) => dispatch(authenticationSuccess(token))
});

App.propTypes = {
    isAuthorized: PropTypes.bool,
    restoreSessionSuccess: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(App);