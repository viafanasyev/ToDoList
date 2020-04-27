const defaultState = {
    projects: [],
    tasks: {}
};

const reducer = (state = defaultState, action) => {
    let newState;
    let projectId;
    switch (action.type) {
        case 'ADD_TASK_SUCCESS':
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
        case 'SORT_TASKS':
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
        case 'ADD_PROJECT_SUCCESS':
            return {
                ...state,
                projects: [
                    ...state.projects,
                    action.project
                ]
            };
        case 'LOAD_PROJECTS_SUCCESS':
            return {
                ...state,
                projects: action.projects
            };
        case 'LOAD_TASKS_SUCCESS':
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