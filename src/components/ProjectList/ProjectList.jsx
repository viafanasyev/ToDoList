import React from "react";
import classnames from "classnames/bind";
import styles from "./ProjectList.module.scss";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const cx = classnames.bind(styles);

const mapStateToProps = state => ({
    projects: state.projects,
    tasks: state.tasks
});

const ProjectItemComponent = ({ project, tasksCount }) => {
    return (
        <Link to={"/projects/" + project.id.toString()} style={{ textDecoration: 'none' }}>
        <div className={cx("project-item")}>
            <div className={cx("project-item-overall")}>
                <div className={cx("project-item-title")}>{project.name}</div>
                <div className={cx("project-item-tasks-count")}>{tasksCount}</div>
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
                        tasksCount={tasks.hasOwnProperty(project.id) ? tasks[project.id].length : 0}/>
                    )
                }
            </div>
        </div>
    );
};

export default connect(mapStateToProps)(ProjectList)