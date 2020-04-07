import React from "react";
import { connect } from "react-redux";
import { addProject } from "../../actions";
import classnames from "classnames/bind";
import styles from "./ProjectMenu.module.scss";
import { TextInputComponent } from "../TextInputs/TextInputs";
import { ButtonComponent } from "../Buttons/Buttons";

const cx = classnames.bind(styles);

const MAX_NAME_LENGTH = 50;

class ProjectMenuComponent extends React.Component {
    state = {
        inputProjectName: "",
        errors: {}
    };

    handleAddButtonClick = () => {
        this.setState(oldState => {
            const state = {...oldState};

            delete state.errors.name;

            // Check name length
            if (state.inputProjectName.length > MAX_NAME_LENGTH)
                state.errors.name = "Name is too long! (max " + MAX_NAME_LENGTH + " characters)";
            if (state.inputProjectName.length === 0)
                state.errors.name = "Empty name!";

            // If any error - don't add new project
            if (Object.keys(state.errors).length > 0)
                return state.errors;

            // Add new project
            this.props.addProject(state.inputProjectName);

            // Update affected components
            state.inputProjectName = "";
            return state;
        });
    };

    handleProjectNameChange = (event) => {
        this.setState({inputProjectName: event.target.value});
    };

    render() {
        return (
            <div className={cx("menu")}>
                <h1>To Do List</h1>

                <TextInputComponent
                    value={this.state.inputProjectName}
                    onChange={this.handleProjectNameChange}
                    placeholder={"Project name"}
                    withError={this.state.errors.hasOwnProperty("name")}
                    errorMessage={this.state.errors.name}/>

                <ButtonComponent
                    text={"Add"}
                    onClick={this.handleAddButtonClick}/>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    addProject: (name) => dispatch(addProject(name)),
});

export default connect(null, mapDispatchToProps)(ProjectMenuComponent);