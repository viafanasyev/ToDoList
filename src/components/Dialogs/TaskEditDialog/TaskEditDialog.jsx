import Modal from "react-modal";
import React from "react";
import classnames from "classnames/bind";
import styles from "./TaskEditDialog.module.scss";
import { closeDialog, editTask, preEditTask } from "../../../actions/dialog";
import { connect } from "react-redux";
import { BigTextInputComponent, TextInputComponent } from "../../TextInputs/TextInputs";
import { ButtonComponent } from "../../Buttons/Buttons";

const cx = classnames.bind(styles);

const customStyles = {
    overlay: { zIndex: 100000 }
};

const MAX_NAME_LENGTH = 50;

const mapStateToProps = state => ({
    isOpen: state.dialogReducer.isOpen,
    taskName: state.dialogReducer.taskName,
    taskDescription: state.dialogReducer.taskDescription,
    taskPriority: state.dialogReducer.taskPriority,
    taskId: state.dialogReducer.taskId,
    projectId: state.dialogReducer.projectId
});

class TaskEditDialog extends React.Component {
    state = {
        errors: {},
    };

    handleAddButtonClick = () => {
        this.setState(oldState => {
            const state = {
                ...oldState
            };

            delete state.errors.name;
            delete state.errors.description;
            delete state.errors.priority;

            // Parse priority property
            if (this.isInvalidPriority(this.props.taskPriority))
                state.errors.priority = "Invalid number! Should be 1, 2 or 3";
            const parsedPriority = Number(this.props.taskPriority);

            // Check name length
            if (this.props.taskName.length > MAX_NAME_LENGTH)
                state.errors.name = "Name is too long! (max " + MAX_NAME_LENGTH + " characters)";
            if (this.props.taskName.length === 0)
                state.errors.name = "Empty name!";

            // If some errors - don't edit task
            if (Object.keys(state.errors).length > 0)
                return state.errors;

            // Edit task
            this.props.editTask(this.props.taskName, this.props.taskDescription, parsedPriority, this.props.projectId, this.props.taskId);

            return state;
        });
    };

    isInvalidPriority(priorityString) {
        const priority = Number(priorityString);
        return Number.isNaN(priority) || (priorityString === "") || (priority < 1) || (priority > 3);
    };

    handleTaskNameChange = (event) => {
        this.props.preEditTask(event.target.value, this.props.taskDescription, this.props.taskPriority);
    };

    handleTaskDescriptionChange = (event) => {
        this.props.preEditTask(this.props.taskName, event.target.value, this.props.taskPriority);
    };

    handleTaskPriorityChange = (event) => {
        this.props.preEditTask(this.props.taskName, this.props.taskDescription, event.target.value);
    };

    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                onRequestClose={this.props.closeDialog}
                ariaHideApp={false}
                className={cx("task-edit-dialog")}
                style={customStyles}
                contentLabel="Example Modal">

                <h2>Edit task</h2>

                <TextInputComponent
                    value={this.props.taskName}
                    onChange={this.handleTaskNameChange}
                    placeholder={"Task name"}
                    withError={this.state.errors.hasOwnProperty("name")}
                    errorMessage={this.state.errors.name}/>
                <BigTextInputComponent
                    value={this.props.taskDescription}
                    onChange={this.handleTaskDescriptionChange}
                    placeholder={"Task description"}
                    withError={this.state.errors.hasOwnProperty("description")}
                    errorMessage={this.state.errors.description}/>
                <TextInputComponent
                    value={this.props.taskPriority}
                    onChange={this.handleTaskPriorityChange}
                    placeholder={"Task priority"}
                    withError={this.state.errors.hasOwnProperty("priority")}
                    errorMessage={this.state.errors.priority}/>

                <ButtonComponent
                    text={"Save"}
                    onClick={this.handleAddButtonClick}/>
                <ButtonComponent
                    text={"Cancel"}
                    onClick={this.props.closeDialog}/>
            </Modal>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    closeDialog: () => dispatch(closeDialog()),
    editTask: (name, description, priority, projectId, taskId) => dispatch(editTask(name, description, priority, projectId, taskId)),
    preEditTask: (name, description, priority) => dispatch(preEditTask(name, description, priority))
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskEditDialog);