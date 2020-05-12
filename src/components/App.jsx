import React from "react";
import classnames from "classnames/bind";
import styles from "./App.module.scss";
import { BrowserRouter, Link, Redirect, Route, Switch } from "react-router-dom";
import TasksWrapper from "./Tasks/TasksWrapper/TasksWrapper";
import ProjectsWrapper from "./Projects/ProjectsWrapper/ProjectsWrapper";
import TaskEditDialog from "./Dialogs/TaskEditDialog/TaskEditDialog";
import SignUp from "./Authentication/SignUp/SignUp";
import { connect } from "react-redux";

const cx = classnames.bind(styles);

const mapStateToProps = state => ({
    isAuthorized: state.todoReducer.isAuthorized
});

const App = ({ isAuthorized }) => (
    <BrowserRouter>
        <div className={cx("app")}>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/sign-up" component={SignUp}/>
                {!isAuthorized ? <Redirect to="/"/> : null}
                <Route exact path="/projects/"
                       component={(props) => <ProjectsWrapper {...props}/>}/>
                <Route path="/projects/:projectId/"
                       component={(props) => <TasksWrapper
                           projectId={Number(props.match.params.projectId)} {...props}/>}/>

                <Redirect to="/"/>
            </Switch>
            <TaskEditDialog/>
        </div>
    </BrowserRouter>
);

const Home = () => (
    <div>
        <h1>Home</h1>
        <Link to="/sign-up">Sign up</Link>
    </div>
);

export default connect(mapStateToProps)(App);