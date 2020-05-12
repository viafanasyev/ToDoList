import { ActionType } from "../actions";
import dialog from "./dialog";
import authentication from "./authentication";
import { combineReducers } from "redux";

const defaultState = {
    projects: [],
    tasks: {}
};

const reducer = (state = defaultState, action) => {
    let newState;
    let projectId;
    switch (action.type) {
        case ActionType.ADD_TASK_SUCCESS:
            return {
                ...state,
                tasks: {
                    ...state.tasks,
                    [action.projectId]: [
                        ...state.tasks[action.projectId],
                        action.task
                    ]
                }
            };
        case ActionType.SORT_TASKS:
            projectId = action.projectId;
            if (!state.tasks.hasOwnProperty(projectId))
                return state;

            newState = {
                ...state,
                tasks: {
                    ...state.tasks,
                    [projectId]: [...state.tasks[projectId]]
                }
            };

            const property = action.property;
            if (!action.isDescendingOrder)
                newState.tasks[projectId].sort((a, b) => a[property] < b[property] ? -1 : (a[property] > b[property] ? 1 : 0));
            else
                newState.tasks[projectId].sort((a, b) => a[property] > b[property] ? -1 : (a[property] < b[property] ? 1 : 0));

            return newState;
        case ActionType.ADD_PROJECT_SUCCESS:
            return {
                ...state,
                projects: [
                    ...state.projects,
                    action.project
                ]
            };
        case ActionType.LOAD_PROJECTS_SUCCESS:
            return {
                ...state,
                projects: action.projects
            };
        case ActionType.LOAD_TASKS_SUCCESS:
            return {
                ...state,
                tasks: {
                    ...state.tasks,
                    [action.projectId]: action.tasks
                }
            };
        case ActionType.EDIT_TASK_SUCCESS:
            projectId = action.projectId;
            if (!state.tasks.hasOwnProperty(projectId))
                return state;

            newState = {
                ...state,
                tasks: {
                    ...state.tasks,
                    [projectId]: [...state.tasks[projectId]]
                }
            };

            const i = newState.tasks[projectId].findIndex(task => task.id === action.taskId);
            if (i !== -1) {
                newState.tasks[projectId][i] = {
                    id: action.taskId,
                    name: action.name,
                    description: action.description,
                    priority: action.priority
                };
            }

            return newState;
        case ActionType.SET_AUTHORIZED:
            return {
                ...state,
                isAuthorized: action.isAuthorized
            };
        default:
            return state
    }
};

export default combineReducers({
    todoReducer: reducer,
    dialogReducer: dialog,
    authenticationReducer: authentication
});