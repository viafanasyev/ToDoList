import React from "react";
import classnames from "classnames/bind";
import styles from "./App.module.scss";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import TasksWrapper from "./Tasks/TasksWrapper/TasksWrapper";
import ProjectsWrapper from "./Projects/ProjectsWrapper/ProjectsWrapper";

const cx = classnames.bind(styles);

const App = () => (
    <BrowserRouter>
        <div className={cx("app")}>
            <Route exact path="/">
                <Redirect to="/projects/"/>
            </Route>

            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/projects/"
                       component={(props) => <ProjectsWrapper {...props}/>}/>
                <Route path="/projects/:projectId/"
                       component={(props) => <TasksWrapper projectId={Number(props.match.params.projectId)} {...props}/>}/>

                <Redirect to="/"/>
            </Switch>
        </div>
    </BrowserRouter>
);

const Home = () => (
    <h1>Home</h1>
);

export default App;