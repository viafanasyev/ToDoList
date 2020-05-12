import { request } from "../requests";

export const ActionType = Object.freeze({
    ADD_TASK_SUCCESS: 'ADD_TASK_SUCCESS',
    SORT_TASKS: 'SORT_TASKS',
    ADD_PROJECT_SUCCESS: 'ADD_PROJECT_SUCCESS',
    LOAD_PROJECTS_SUCCESS: 'LOAD_PROJECTS_SUCCESS',
    LOAD_TASKS_SUCCESS: 'LOAD_TASKS_SUCCESS',
    EDIT_TASK_SUCCESS: 'EDIT_TASK_SUCCESS',
    SET_AUTHORIZED: 'SET_AUTHORIZED'
});

const getResultOrNonAuthorized = (response, dispatch) => {
    if (response.ok) {
        return response.json();
    } else if (response.status === 401) {
        dispatch(setAuthorized(false));
    }
};

export const addTask = (name, description, priority, projectId) => (dispatch) => {
    request(`/projects/${projectId}/tasks/`, 'POST', { name, description, priority })
        .then(response => getResultOrNonAuthorized(response, dispatch))
        .then(task => {
            dispatch(addTaskSuccess(task, projectId));
        });
};

export const addTaskSuccess = (task, projectId) => ({
    type: ActionType.ADD_TASK_SUCCESS,
    task: task,
    projectId: projectId
});

export const sortTasksBy = (property, projectId, isDescendingOrder) => ({
    type: ActionType.SORT_TASKS,
    property: property,
    projectId: projectId,
    isDescendingOrder: isDescendingOrder
});

export const addProject = (name) => (dispatch) => {
    request('/projects/', 'POST', { name })
        .then(response => getResultOrNonAuthorized(response, dispatch))
        .then(project => {
            dispatch(addProjectSuccess(project));
        });
};

export const addProjectSuccess = (project) => ({
    type: ActionType.ADD_PROJECT_SUCCESS,
    project: project
});

export const loadProjects = () => (dispatch) => {
    request('/projects/')
        .then(response => getResultOrNonAuthorized(response, dispatch))
        .then(projects => {
            dispatch(loadProjectsSuccess(projects));
        });
};

export const loadProjectsSuccess = (projects) => ({
    type: ActionType.LOAD_PROJECTS_SUCCESS,
    projects: projects
});

export const loadTasks = (projectId) => (dispatch) => {
    request(`/projects/${projectId}/tasks/`)
        .then(response => getResultOrNonAuthorized(response, dispatch))
        .then(tasks => {
            dispatch(loadTasksSuccess(tasks, projectId));
        });
};

export const loadTasksSuccess = (tasks, projectId) => ({
    type: ActionType.LOAD_TASKS_SUCCESS,
    tasks: tasks,
    projectId: projectId
});

export const editTaskSuccess = (name, description, priority, projectId, taskId) => ({
    type: ActionType.EDIT_TASK_SUCCESS,
    name: name,
    description: description,
    priority: priority,
    taskId: taskId,
    projectId: projectId
});

export const setAuthorized = (isAuthorized) => ({
    type: ActionType.SET_AUTHORIZED,
    isAuthorized
});