const defaultState = {
    message: "You have 0 tasks",
    tasks: [],
    sorted: {
        name: false,
        priority: false
    }
};

const tasks = (state = defaultState, action) => {
    switch (action.type) {
        case 'ADD_TASK':
            return {
                ...state,
                tasks: [
                    ...state.tasks,
                    {
                        id: action.id,
                        name: action.name,
                        description: action.description,
                        priority: action.priority
                    }
                ],
                sorted: {
                    name: false,
                    priority: false
                }
            };
        case 'SORT_TASKS':
            const newState = {
                ...state,
                tasks: [...state.tasks]
            };
            const property = action.property;
            for (let sortedProperty in newState.sorted) {
                if (sortedProperty !== property)
                    newState.sorted[sortedProperty] = false;
            }

            // If not sorted - sort in increasing order
            if (!newState.sorted[property]) {
                newState.sorted[property] = true;
                newState.tasks.sort((a, b) => a[property] < b[property] ? -1 : (a[property] > b[property] ? 1 : 0));
            }
            // Otherwise - sort in decreasing order
            else
                newState.tasks.reverse();
            return newState;
        default:
            return state
    }
};

export default tasks;