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

const cx = classnames.bind(styles);

const mapStateToProps = state => ({
    isAuthorized: state.authenticationReducer.isAuthorized
});

const App = ({ isAuthorized }) => (
    <BrowserRouter>
        <div className={cx("app")}>
            {isAuthorized ?
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

const Home = () => (
    <div>
        <h1>Home</h1>
        <div><Link to="/sign-up">Sign up</Link></div>
        <div><Link to="/sign-in">Sign In</Link></div>
    </div>
);

export default connect(mapStateToProps)(App);