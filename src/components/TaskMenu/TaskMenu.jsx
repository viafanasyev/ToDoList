import React from "react";
import { connect } from "react-redux";
import { addTask, sortTasksBy } from "../../actions";
import classnames from "classnames/bind";
import styles from "./TaskMenu.module.scss";

const cx = classnames.bind(styles);

const TextInputComponent = ({ value, placeholder, onChange, withError }) => {
    return (
        <input className={cx("text-input", {[`text-input-with-error`]: withError})} type="text" value={value} onChange={onChange} placeholder={placeholder}/>
    );
};

const BigTextInputComponent = ({ value, placeholder, onChange, withError }) => {
    return (
        <textarea className={cx("text-input", "text-input-big", {[`text-input-with-error`]: withError})} value={value} onChange={onChange} placeholder={placeholder}/>
    );
};

const ButtonComponent = ({ text, onClick }) => {
    return (
        <button className={cx("button")} onClick={onClick}>
            {text}
        </button>
    );
};

const MAX_NAME_LENGTH = 50;

class TaskMenuComponent extends React.Component {
    state = {
        inputTaskName: "",
        inputTaskDescription: "",
        inputTaskPriority: "",
        errors: {}
    };

    handleAddButtonClick = () => {
        this.setState(oldState => {
            const state = {...oldState};

            delete state.errors.name;
            delete state.errors.description;
            delete state.errors.priority;

            // Parse priority property
            const parsedPriority = Number(state.inputTaskPriority);
            if (Number.isNaN(parsedPriority) || (state.inputTaskPriority === "") || (parsedPriority < 0))
                state.errors.priority = "Invalid number!";

            // Check name length
            if (state.inputTaskName.length > MAX_NAME_LENGTH)
                state.errors.name = "Name is too long! (max " + MAX_NAME_LENGTH + " characters)";
            if (state.inputTaskName.length === 0)
                state.errors.name = "Empty name!";

            // If some errors - don't add new task
            if (Object.keys(state.errors).length > 0)
                return state.errors;

            // Add new task
            this.props.addTask(state.inputTaskName, state.inputTaskDescription, parsedPriority);

            // Update affected components
            state.inputTaskName = state.inputTaskDescription = state.inputTaskPriority = "";
            return state;
        });
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

    render() {
        return (
            <div className={cx("menu")}>
                <h1>To Do List</h1>
                <div className={cx("input-task-name")}>
                    <TextInputComponent
                        value={this.state.inputTaskName}
                        onChange={this.handleTaskNameChange}
                        placeholder={"Task name"}
                        withError={this.state.errors.hasOwnProperty("name")}/>
                    <div className={cx("input-error")}>{this.state.errors.name}</div>
                </div>
                <div className={cx("input-task-description")}>
                    <BigTextInputComponent
                        value={this.state.inputTaskDescription}
                        onChange={this.handleTaskDescriptionChange}
                        placeholder={"Task description"}
                        withError={this.state.errors.hasOwnProperty("description")}/>
                    <div className={cx("input-error")}>{this.state.errors.description}</div>
                </div>
                <div className={cx("input-task-priority")}>
                    <TextInputComponent
                        value={this.state.inputTaskPriority}
                        onChange={this.handleTaskPriorityChange}
                        placeholder={"Task priority"}
                        withError={this.state.errors.hasOwnProperty("priority")}/>
                    <div className={cx("input-error")}>{this.state.errors.priority}</div>
                </div>
                <ButtonComponent
                    text={"Add"}
                    onClick={this.handleAddButtonClick}/>
                <div className={cx("control-buttons")}>
                    <ButtonComponent
                        text={"Priority sort"}
                        onClick={() => this.props.sortTasksBy("priority")}/>
                    <ButtonComponent
                        text={"Name sort"}
                        onClick={() => this.props.sortTasksBy("name")}/>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    addTask: (name, description, priority) => dispatch(addTask(name, description, priority)),
    sortTasksBy: (property) => dispatch(sortTasksBy(property))
});

export default connect(null, mapDispatchToProps)(TaskMenuComponent);