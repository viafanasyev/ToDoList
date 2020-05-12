import React from "react";
import classnames from "classnames/bind";
import styles from "./TaskList.module.scss";
import { connect } from "react-redux";
import { startDialogForResult } from "../../../actions/dialog";

const cx = classnames.bind(styles);

const getTasksNumber = (tasks) =>
    tasks === undefined ? 0 : tasks.length;

const mapStateToProps = (state, ownProps) => ({
    tasks: state.todoReducer.tasks[ownProps.projectId],
    sorted: state.todoReducer.sorted
});

const mapDispatchToProps = dispatch => ({
    startDialogForResult: (taskName, taskDescription, taskPriority, taskId, projectId) => dispatch(startDialogForResult(taskName, taskDescription, taskPriority, taskId, projectId))
});

const TaskItemComponent = connect(null, mapDispatchToProps)(({ task, projectId, startDialogForResult }) => {
    return (
        <div className={cx("task-item")}
             onClick={() => startDialogForResult(task.name, task.description, task.priority, task.id, projectId)}>
            <div className={cx("task-item-overall")}>
                <div className={cx("task-item-title")}>{task.name}</div>
                <div className={cx("task-item-priority")}>{task.priority}</div>
            </div>
            <div className={cx("task-item-description")}>{task.description}</div>
        </div>
    );
});

const TaskList = ({ tasks, projectId, projectName }) => {
    return (
        <div className={cx("tasks-container")}>
            <div className={cx("tasks-container-header")}>
                <h4 className={cx("tasks-container-header-project-name")}>{projectName}</h4>
                You have {getTasksNumber(tasks)} tasks
            </div>
            <div className={cx("tasks-container-body")}>
                {tasks === undefined ? "" : tasks.map((task) => <TaskItemComponent key={task.id} task={task} projectId={projectId}/>)}
            </div>
        </div>
    );
};

export default connect(mapStateToProps)(TaskList)