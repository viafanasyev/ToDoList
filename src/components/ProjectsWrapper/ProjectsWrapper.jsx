import ProjectMenu from "../ProjectMenu/ProjectMenu";
import ProjectList from "../ProjectList/ProjectList";
import React from "react";
import { loadProjects } from "../../actions";
import { connect } from "react-redux";

const ProjectsWrapper = ({ loadProjects }) => {
    loadProjects();
    return (
        <div style={{
            "display": "flex",
            "flexDirection": "row",
            "justifyContent": "space-between",
            "paddingLeft": "400px"}}>
            <ProjectMenu/>
            <ProjectList/>
        </div>
    );
};

const mapDispatchToProps = dispatch => ({
    loadProjects: () => dispatch(loadProjects()),
});

export default connect(null, mapDispatchToProps)(ProjectsWrapper);