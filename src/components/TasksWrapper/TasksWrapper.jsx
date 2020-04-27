import React from "react";
import { loadTasksSuccess } from "../../actions";
import { NotFound } from "../NotFound/NotFound";
import TaskMenu from "../TaskMenu/TaskMenu";
import TaskList from "../TaskList/TaskList";
import { connect } from "react-redux";
import { isSuccessfulResponse, request } from "../../requests";

class TasksWrapper extends React.Component {
    state = {
        isFetching: true,
        statusCode: null
    };

    componentDidMount() {
        if (isNaN(this.props.projectId))
            return;

        // FIXME: Dirty way to check if project with given id exists
        request(`/projects/${this.props.projectId}/tasks/`)
            .then(response => {
                this.setState({ isFetching: false, statusCode: response.status});
                if (isSuccessfulResponse(response.status))
                    return response.json();
            })
            .then(tasks => {
                this.props.loadTasksSuccess(tasks, this.props.projectId);
            });
    }

    render() {
        if (isNaN(this.props.projectId))
            return (<NotFound text={"Project with given id not found"}/>);
        else if (this.state.isFetching)
            return null;
        else if (isSuccessfulResponse(this.state.statusCode))
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

export default connect(null, mapDispatchToProps)(TasksWrapper);