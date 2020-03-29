let tasksCount = 0;
export const addTask = (name, description, priority) => ({
    type: 'ADD_TASK',
    id: tasksCount++,
    name: name,
    description: description,
    priority: priority
});

export const sortTasksBy = (property) => ({
    type: 'SORT_TASKS',
    property: property
});