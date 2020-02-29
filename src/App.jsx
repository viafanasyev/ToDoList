import React from "react";

import classnames from "classnames/bind";

import styles from "./App.module.scss";

const cx = classnames.bind(styles);

const TextInputComponent = ({ value, placeholder, onChange }) => {
  return (
      <input className={cx("text-input")} type="text" value={value} onChange={onChange} placeholder={placeholder}/>
  );
};

const BigTextInputComponent = ({ value, placeholder, onChange }) => {
  return (
      <textarea className={cx("text-input", "text-input-big")} value={value} onChange={onChange} placeholder={placeholder}/>
  );
};

const ButtonComponent = ({ text, onClick }) => {
  return (
      <button className={cx("button")} onClick={onClick}>
        {text}
      </button>
  );
};

const TaskItemComponent = ({ task }) => {
  return (
      <div className={cx("task-item")}>
        <div className={cx("task-item-overall")}>{task.id}. {task.name}. Priority: {task.priority}</div>
        <span className={cx("task-item-description")}>{task.description}</span>
      </div>
  );
};

const MAX_NAME_LENGTH = 50;

class ClassComponent extends React.Component {
  state = {
    message: "You have 0 tasks",
    inputTaskName: "",
    inputTaskDescription: "",
    inputTaskPriority: "",
    tasks: [],
    sorted: {
      name: false,
      priority: false
    },
    errors: {}
  };

  handleAddButtonClick = () => {
    this.setState(state => {

      delete state.errors.name;
      delete state.errors.description;
      delete state.errors.priority;

      // Parse priority property
      const parsedPriority = Number(state.inputTaskPriority);
      if (Number.isNaN(parsedPriority))
        state.errors.priority = "Invalid number!";

      // Check name length
      if (state.inputTaskName.length > MAX_NAME_LENGTH)
        state.errors.name = "Name is too long! (max " + MAX_NAME_LENGTH + " characters)";

      // If some errors - don't add new task
      if (Object.keys(state.errors).length > 0)
        return state.errors;

      // Add new task
      state.tasks.push({
        id: state.tasks.length + 1,
        name: state.inputTaskName,
        description: state.inputTaskDescription,
        priority: parsedPriority
      });

      // Update affected components
      state.message = "You have " + state.tasks.length + " task" + (state.tasks.length === 1 ? "" : "s");
      state.inputTaskName = state.inputTaskDescription = state.inputTaskPriority = "";
      state.sorted.priority = false;
      state.sorted.name = false;
      return state.message;
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

  sortTasksBy = (property) => {
    this.setState(state => {

      // Set that tasks are not sorted by other properties
      for (let sortedProperty in state.sorted) {
        if (sortedProperty !== property)
          state.sorted[sortedProperty] = false;
      }

      // If not sorted - sort in increasing order
      if (!state.sorted[property]) {
        state.sorted[property] = true;
        return state.tasks.sort((a, b) => a[property] < b[property] ? -1 : (a[property] > b[property] ? 1 : 0));
      }
      // Otherwise - sort in decreasing order
      else
        return state.tasks.reverse();
    })
  };

  componentDidMount() {

  }

  render() {
    return (
        <div className={cx("app")}>
          <h1>To Do List</h1>
          <div className={cx("input-task-name")}>
            <TextInputComponent
              value={this.state.inputTaskName}
              onChange={this.handleTaskNameChange}
              placeholder={"Task name"}/>
            <span className={cx("input-error")}>{this.state.errors.name}</span>
          </div>
          <div className={cx("input-task-description")}>
            <BigTextInputComponent
                value={this.state.inputTaskDescription}
                onChange={this.handleTaskDescriptionChange}
                placeholder={"Task description"}/>
            <span className={cx("input-error")}>{this.state.errors.description}</span>
          </div>
          <div className={cx("input-task-priority")}>
            <TextInputComponent
                value={this.state.inputTaskPriority}
                onChange={this.handleTaskPriorityChange}
                placeholder={"Task priority"}/>
            <span className={cx("input-error")}>{this.state.errors.priority}</span>
          </div>
          <ButtonComponent
              text={"Add"}
              onClick={this.handleAddButtonClick}/>
          <div>{this.state.message}</div>
          <div className={cx("control-buttons")}>
            <ButtonComponent
                text={"Priority sort"}
                onClick={() => this.sortTasksBy("priority")}/>
            <ButtonComponent
                text={"Name sort"}
                onClick={() => this.sortTasksBy("name")}/>
          </div>
          <ul>
            {this.state.tasks.map((task) => <li><TaskItemComponent task={task}/></li>)}
          </ul>
        </div>
    );
  }
}

const App = () => {
  return <ClassComponent/>;
};

export default App;
