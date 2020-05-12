import { actionType } from "../actions";
import dialog from "./dialog";
import { combineReducers } from "redux";

const defaultState = {
    projects: [],
    tasks: {},
    isAuthorized: false
};

const reducer = (state = defaultState, action) => {
    let newState;
    let projectId;
    switch (action.type) {
        case actionType.ADD_TASK_SUCCESS:
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
        case actionType.SORT_TASKS:
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
        case actionType.ADD_PROJECT_SUCCESS:
            return {
                ...state,
                projects: [
                    ...state.projects,
                    action.project
                ]
            };
        case actionType.LOAD_PROJECTS_SUCCESS:
            return {
                ...state,
                projects: action.projects
            };
        case actionType.LOAD_TASKS_SUCCESS:
            return {
                ...state,
                tasks: {
                    ...state.tasks,
                    [action.projectId]: action.tasks
                }
            };
        case actionType.EDIT_TASK_SUCCESS:
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
        default:
            return state
    }
};

export default combineReducers({
    todoReducer: reducer,
    dialogReducer: dialog
});