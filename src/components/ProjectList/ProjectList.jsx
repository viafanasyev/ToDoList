import React from "react";
import classnames from "classnames/bind";
import styles from "./ProjectList.module.scss";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getTasksNumber } from "../TaskList/TaskList";

const cx = classnames.bind(styles);

const mapStateToProps = state => ({
    projects: state.projects,
    tasks: state.tasks
});

const ProjectItemComponent = ({ project, tasksNumber }) => {
    return (
        <Link to={"/projects/" + project.id.toString()} style={{ textDecoration: 'none' }}>
        <div className={cx("project-item")}>
            <div className={cx("project-item-overall")}>
                <div className={cx("project-item-title")}>{project.name}</div>
                <div className={cx("project-item-tasks-number")}>{tasksNumber}</div>
            </div>
        </div>
        </Link>
    );
};

const ProjectList = ({ projects, tasks }) => {
    return (
        <div className={cx("projects-container")}>
            <div className={cx("projects-container-header")}>You have {projects.length} projects</div>
            <div className={cx("projects-container-body")}>
                {
                    projects.map((project) =>
                    <ProjectItemComponent
                        key={project.id}
                        project={project}
                        tasksNumber={getTasksNumber(tasks, project.id)}/>
                    )
                }
            </div>
        </div>
    );
};

export default connect(mapStateToProps)(ProjectList)