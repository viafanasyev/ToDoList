import React from "react";
import { connect } from "react-redux";
import { addTask, sortTasksBy } from "../actions";
import classnames from "classnames/bind";
import TaskList from "./TaskList/TaskList";
import TaskMenu from "./TaskMenu/TaskMenu";
import styles from "./App.module.scss";

const cx = classnames.bind(styles);

const App = () => (
    <div className={cx("app")}>
        <TaskMenu/>
        <TaskList/>
    </div>
);

const mapDispatchToProps = dispatch => ({
  addTask: (name, description, priority) => dispatch(addTask(name, description, priority)),
  sortTasksBy: (property) => dispatch(sortTasksBy(property))
});

export default connect(null, mapDispatchToProps)(App);