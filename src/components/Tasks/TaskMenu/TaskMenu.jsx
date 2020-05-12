import React from "react";
import { connect } from "react-redux";
import { addTask, sortTasksBy } from "../../../actions";
import classnames from "classnames/bind";
import styles from "./TaskMenu.module.scss";
import { Link } from "react-router-dom";
import { BigTextInputComponent, TextInputComponent } from "../../TextInputs/TextInputs";
import { ButtonComponent } from "../../Buttons/Buttons";

const cx = classnames.bind(styles);

const MAX_NAME_LENGTH = 50;

// TODO: Add task editing with react-modal

class TaskMenuComponent extends React.Component {
    state = {
        inputTaskName: "",
        inputTaskDescription: "",
        inputTaskPriority: "",
        errors: {},
        sorted: {
            name: false,
            priority: false
        }
    };

    handleAddButtonClick = () => {
        this.setState(oldState => {
            const state = {
                ...oldState,
                sorted: {
                    name: false,
                    priority: false
                }
            };

            delete state.errors.name;
            delete state.errors.description;
            delete state.errors.priority;

            // Parse priority property
            if (this.isInvalidPriority(state.inputTaskPriority))
                state.errors.priority = "Invalid number! Should be 1, 2 or 3";
            const parsedPriority = Number(state.inputTaskPriority);

            // Check name length
            if (state.inputTaskName.length > MAX_NAME_LENGTH)
                state.errors.name = "Name is too long! (max " + MAX_NAME_LENGTH + " characters)";
            if (state.inputTaskName.length === 0)
                state.errors.name = "Empty name!";

            // If some errors - don't add new task
            if (Object.keys(state.errors).length > 0)
                return state.errors;

            // Add new task
            this.props.addTask(state.inputTaskName, state.inputTaskDescription, parsedPriority, this.props.projectId);

            // Update affected components
            state.inputTaskName = state.inputTaskDescription = state.inputTaskPriority = "";
            return state;
        });
    };

    isInvalidPriority(priorityString) {
        const priority = Number(priorityString);
        return Number.isNaN(priority) || (priorityString === "") || (priority < 1) || (priority > 3);
    };

    handleTaskNameChange = (event) => {
        this.setState({inputTaskName: event.target.value});
    };

    handleTaskDescriptionChange = (event) => {
        this.setState({inputTaskDescription: event.target.value});
    };

    handleTaskPriorityChange = (event) => {
        this.setState({inputTaskPriority: event.target.value});
    };

    sortTasksBy = (property) => {
        this.props.sortTasksBy(property, this.props.projectId, this.state.sorted[property]);
        this.setState(oldState => {
            const state = {
                ...oldState,
            };
            state.sorted[property] = !state.sorted[property];
            return state;
        });
    };

    render() {
        return (
            <div className={cx("menu")}>
                <Link to="/projects/" className={cx("back-button")}>Back</Link>
                <h1>To Do List</h1>

                <TextInputComponent
                    value={this.state.inputTaskName}
                    onChange={this.handleTaskNameChange}
                    placeholder={"Task name"}
                    withError={this.state.errors.hasOwnProperty("name")}
                    errorMessage={this.state.errors.name}/>
                <BigTextInputComponent
                    value={this.state.inputTaskDescription}
                    onChange={this.handleTaskDescriptionChange}
                    placeholder={"Task description"}
                    withError={this.state.errors.hasOwnProperty("description")}
                    errorMessage={this.state.errors.description}/>
                <TextInputComponent
                    value={this.state.inputTaskPriority}
                    onChange={this.handleTaskPriorityChange}
                    placeholder={"Task priority"}
                    withError={this.state.errors.hasOwnProperty("priority")}
                    errorMessage={this.state.errors.priority}/>

                <ButtonComponent
                    text={"Add"}
                    onClick={this.handleAddButtonClick}/>
                <br/>
                <ButtonComponent
                    text={"Priority sort"}
                    onClick={() => this.sortTasksBy("priority")}/>
                <ButtonComponent
                    text={"Name sort"}
                    onClick={() => this.sortTasksBy("name")}/>

                <div className={cx("hint")}>Click task to edit it</div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    addTask: (name, description, priority, projectId) => dispatch(addTask(name, description, priority, projectId)),
    sortTasksBy: (property, projectId, isDescendingOrder) => dispatch(sortTasksBy(property, projectId, isDescendingOrder))
});

export default connect(null, mapDispatchToProps)(TaskMenuComponent);