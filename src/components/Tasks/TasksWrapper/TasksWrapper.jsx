import React from "react";
import { loadTasksSuccess } from "../../../actions";
import { NotFound } from "../../NotFound/NotFound";
import TaskMenu from "../TaskMenu/TaskMenu";
import TaskList from "../TaskList/TaskList";
import { connect } from "react-redux";
import { request } from "../../../requests";
import PropTypes from "prop-types";

class TasksWrapper extends React.Component {
    state = {
        isFetching: true,
        isStatusOk: false
    };

    async componentDidMount() {
        if (isNaN(this.props.projectId)) {
            this.setState({ isFetching: false, isStatusOk: false });
            return;
        }

        try {
            const response = await request(`/projects/${this.props.projectId}/tasks/`);
            const isStatusOk = response.ok;

            this.setState({ isFetching: false, isStatusOk });
            if (isStatusOk) {
                const tasks = await response.json();
                this.props.loadTasksSuccess(tasks, this.props.projectId);
            }
        }
        catch (error) {
            this.setState({ isFetching: false, isStatusOk: false });
            console.log(error);
        }
    }

    render() {
        if (this.state.isFetching)
            return null;
        else if (this.state.isStatusOk)
            return (
                <div style={{
                    "display": "flex",
                    "flexDirection": "row",
                    "justifyContent": "space-between",
                    "paddingLeft": "400px"}}>
                    <TaskMenu projectId={this.props.projectId}/>
                    <TaskList projectId={this.props.projectId} projectName={undefined}/>
                </div>
                // TODO: Get projectName somehow
            );
        else
            return (<NotFound text={"Project with given id not found"}/>);
    }
}

const mapDispatchToProps = dispatch => ({
    loadTasksSuccess: (tasks, projectId) => dispatch(loadTasksSuccess(tasks, projectId))
});

TasksWrapper.propTypes = {
    loadTasksSuccess: PropTypes.func
};

export default connect(null, mapDispatchToProps)(TasksWrapper);