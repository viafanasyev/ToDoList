import React from "react";

import classnames from "classnames/bind";

import styles from "./TaskList.module.scss";

import { connect } from "react-redux";

const cx = classnames.bind(styles);

const mapStateToProps = state => ({
    tasks: state.tasks,
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

const TaskList = ({ tasks, projectId, projectName }) => {
    return (
        <div className={cx("tasks-container")}>
            <div className={cx("tasks-container-header")}>
                <h4 className={cx("tasks-container-header-project-name")}>{projectName}</h4>
                You have {!tasks.hasOwnProperty(projectId) ? 0 : tasks[projectId].length} tasks
            </div>
            <div className={cx("tasks-container-body")}>
                {!tasks.hasOwnProperty(projectId) ? "" : tasks[projectId].map((task) => <TaskItemComponent key={task.id} task={task}/>)}
            </div>
        </div>
    );
};

export default connect(mapStateToProps)(TaskList)