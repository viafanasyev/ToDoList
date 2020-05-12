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
    componentDidMount() {
        const token = localStorage.getItem("token");
        if (token)
            this.props.restoreSessionSuccess(token);
    }

    render() {
        return (
            <BrowserRouter>
                <div className={cx("app")}>
                    {this.props.isAuthorized ?
                        <Switch>
                            <Route exact path="/projects/"
                                   component={(props) => <ProjectsWrapper {...props}/>}/>
                            <Route path="/projects/:projectId/"
                                   component={(props) => <TasksWrapper
                                       projectId={Number(props.match.params.projectId)} {...props}/>}/>

                            <Redirect to="/projects"/>
                        </Switch>
                        :
                        <Switch>
                            <Route exact path="/" component={Home}/>
                            <Route exact path="/sign-up" component={SignUp}/>
                            <Route exact path="/sign-in" component={SignIn}/>

                            <Redirect to="/"/>
                        </Switch>
                    }
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