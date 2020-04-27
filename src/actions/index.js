import { isSuccessfulResponse, request } from "../requests";

export const addTask = (name, description, priority, projectId) => (dispatch) => {
    request(`/projects/${projectId}/tasks/`, 'POST', { name, description, priority })
        .then(response => {
            if (isSuccessfulResponse(response.status))
                return response.json();
        })
        .then(task => {
            dispatch(addTaskSuccess(task, projectId));
        });
};

export const addTaskSuccess = (task, projectId) => ({
    type: 'ADD_TASK_SUCCESS',
    task: task,
    projectId: projectId
});

export const sortTasksBy = (property, projectId, isDescendingOrder) => ({
    type: 'SORT_TASKS',
    property: property,
    projectId: projectId,
    isDescendingOrder: isDescendingOrder
});

export const addProject = (name) => (dispatch) => {
    request('/projects/', 'POST', { name })
        .then(response => {
            if (isSuccessfulResponse(response.status))
                return response.json();
        })
        .then(project => {
            dispatch(addProjectSuccess(project));
        });
};

export const addProjectSuccess = (project) => ({
    type: 'ADD_PROJECT_SUCCESS',
    project: project
});

export const loadProjects = () => (dispatch) => {
    request('/projects/')
        .then(response => {
            if (isSuccessfulResponse(response.status))
                return response.json();
        })
        .then(projects => {
            dispatch(loadProjectsSuccess(projects));
        });
};

export const loadProjectsSuccess = (projects) => ({
    type: 'LOAD_PROJECTS_SUCCESS',
    projects: projects
});

export const loadTasks = (projectId) => (dispatch) => {
    request(`/projects/${projectId}/tasks/`)
        .then(response => {
            if (isSuccessfulResponse(response.status))
                return response.json();
        })
        .then(tasks => {
            dispatch(loadTasksSuccess(tasks, projectId));
        });
};

export const loadTasksSuccess = (tasks, projectId) => ({
    type: 'LOAD_TASKS_SUCCESS',
    tasks: tasks,
    projectId: projectId
});