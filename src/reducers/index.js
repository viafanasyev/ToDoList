const defaultState = {
    projects: [],
    tasks: []
};

const reducer = (state = defaultState, action) => {
    let newState;
    let projectId;
    switch (action.type) {
        case 'ADD_TASK':
            newState = {
                ...state,
                tasks: [...state.tasks]
            };

            projectId = action.projectId;
            if (!newState.tasks.hasOwnProperty(projectId)) {
                newState.tasks[projectId] = [];
            }
            newState.tasks[projectId].push({
                id: action.id,
                name: action.name,
                description: action.description,
                priority: action.priority
            });

            return newState;
        case 'ADD_PROJECT':
            newState = {
                ...state,
                projects: [...state.projects]
            };

            newState.projects.push({
                id: action.id,
                name: action.name
            });

            return newState;
        case 'SORT_TASKS':
            projectId = action.projectId;
            if (!state.tasks.hasOwnProperty(projectId))
                return state;

            newState = {
                ...state,
                tasks: [...state.tasks]
            };

            const property = action.property;
            if (!action.isDescendingOrder)
                newState.tasks[projectId].sort((a, b) => a[property] < b[property] ? -1 : (a[property] > b[property] ? 1 : 0));
            else
                newState.tasks[projectId].sort((a, b) => a[property] > b[property] ? -1 : (a[property] < b[property] ? 1 : 0));

            return newState;
        default:
            return state
    }
};

export default reducer;