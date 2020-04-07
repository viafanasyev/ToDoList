import React from "react";
import { connect } from "react-redux";
import { addTask, sortTasksBy } from "../actions";
import classnames from "classnames/bind";
import TaskList from "./TaskList/TaskList";
import TaskMenu from "./TaskMenu/TaskMenu";
import ProjectList from "./ProjectList/ProjectList";
import ProjectMenu from "./ProjectMenu/ProjectMenu";
import styles from "./App.module.scss";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

const cx = classnames.bind(styles);

const mapStateToProps = state => ({
    projects: state.projects
});

const App = ({ projects }) => (
    <BrowserRouter>
        <div className={cx("app")}>
            <Route exact path="/">
                <Redirect to="/projects/" />
            </Route>

            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/projects/" component={Projects} />
                <Route path="/projects/:projectId/" component={(props) => <Tasks projects={projects} {...props}/>} />

                <Redirect to="/" />
            </Switch>
        </div>
    </BrowserRouter>
);

const Home = () => (
    <h1>Home</h1>
);

const Projects = () => {
    return (
        <div style={{
            "display": "flex",
            "flex-direction": "row",
            "justify-content": "space-between",
            "padding-left": "400px"}}>
            <ProjectMenu/>
            <ProjectList/>
        </div>
    );
};

const Tasks = ({ match, projects }) => {
    const projectId = Number(match.params.projectId);
    const projectIndex = projects.findIndex(project => project.id === projectId);
    if (isNaN(projectId) || (projectIndex === -1))
        return (<NotFound text={"Project with given id not found"} />);

    return (
        <div style={{
            "display": "flex",
            "flex-direction": "row",
            "justify-content": "space-between",
            "padding-left": "400px"}}>
            <TaskMenu projectId={projectId}/>
            <TaskList projectId={projectId} projectName={projects[projectIndex].name}/>
        </div>
    );
};

const NotFound = ({ text }) => {
    return (
        <div style={{
            "display": "flex",
            "flex-direction": "column"}}>
            <h1 style={{
                "display": "flex",
                "flex-direction": "row",
                "justify-content": "space-around"}}>404</h1>
            <h3 style={{"display": "flex",
                "flex-direction": "row",
                "justify-content": "space-around"}}>{text}</h3>
        </div>
    );
};

const mapDispatchToProps = dispatch => ({
  addTask: (name, description, priority) => dispatch(addTask(name, description, priority)),
  sortTasksBy: (property) => dispatch(sortTasksBy(property))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);