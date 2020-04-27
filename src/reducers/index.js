import { actionType } from "../actions";

const defaultState = {
    projects: [],
    tasks: {}
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
        default:
            return state
    }
};

export default reducer;