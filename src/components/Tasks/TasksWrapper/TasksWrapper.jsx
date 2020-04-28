import React from "react";
import { loadTasksSuccess } from "../../../actions";
import { NotFound } from "../../NotFound/NotFound";
import TaskMenu from "../TaskMenu/TaskMenu";
import TaskList from "../TaskList/TaskList";
import { connect } from "react-redux";
import { isSuccessfulResponse, request } from "../../../requests";

class TasksWrapper extends React.Component {
    state = {
        isFetching: true,
        statusCode: null
    };

    async componentDidMount() {
        if (isNaN(this.props.projectId)) {
            this.setState({ isFetching: false, statusCode: 404 });
            return;
        }

        try {
            const response = await request(`/projects/${this.props.projectId}/tasks/`);
            const status = response.status;

            this.setState({ isFetching: false, statusCode: status });
            if (isSuccessfulResponse(status)) {
                const tasks = await response.json();
                this.props.loadTasksSuccess(tasks, this.props.projectId);
            }
        }
        catch (error) {
            this.setState({ isFetching: false, statusCode: 404 });
            console.log(error);
        }
    }

    render() {
        if (this.state.isFetching)
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