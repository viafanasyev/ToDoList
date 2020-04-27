import React from "react";

import classnames from "classnames/bind";

import styles from "./TaskList.module.scss";

import { connect } from "react-redux";

const cx = classnames.bind(styles);

export const getTasksNumber = (tasks) =>
    tasks === undefined ? 0 : tasks.length;

const mapStateToProps = (state, ownProps) => ({
    tasks: state.tasks[ownProps.projectId],
    sorted: state.sorted
});

const TaskItemComponent = ({ task }) => {
    return (
        <div className={cx("task-item")}>
            <div className={cx("task-item-overall")}>
                <div className={cx("task-item-title")}>{task.name}</div>
                <div className={cx("task-item-priority")}>{task.priority}</div>
            </div>
            <div className={cx("task-item-description")}>{task.description}</div>
        </div>
    );
};

const TaskList = ({ tasks, projectName }) => {
    return (
        <div className={cx("tasks-container")}>
            <div className={cx("tasks-container-header")}>
                <h4 className={cx("tasks-container-header-project-name")}>{projectName}</h4>
                You have {getTasksNumber(tasks)} tasks
            </div>
            <div className={cx("tasks-container-body")}>
                {tasks === undefined ? "" : tasks.map((task) => <TaskItemComponent key={task.id} task={task}/>)}
            </div>
        </div>
    );
};

export default connect(mapStateToProps)(TaskList)