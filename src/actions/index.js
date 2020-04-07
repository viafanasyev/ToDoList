let tasksCount = 0;
let projectsCount = 0;

export const addTask = (name, description, priority, projectId) => ({
    type: 'ADD_TASK',
    id: tasksCount++,
    name: name,
    description: description,
    priority: priority,
    projectId: projectId
});

export const sortTasksBy = (property, projectId, isDescendingOrder) => ({
    type: 'SORT_TASKS',
    property: property,
    projectId: projectId,
    isDescendingOrder: isDescendingOrder
});

export const addProject = (name) => ({
    type: 'ADD_PROJECT',
    id: projectsCount++,
    name: name
});