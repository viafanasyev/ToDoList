import { request } from "../requests";
import { editTaskSuccess } from "./index";

export const ActionType = Object.freeze({
    START_DIALOG_FOR_RESULT: 'START_DIALOG_FOR_RESULT',
    CLOSE_DIALOG: 'CLOSE_DIALOG',
    PRE_EDIT_TASK: 'PRE_EDIT_TASK'
});

export const startDialogForResult = (taskName, taskDescription, taskPriority, taskId, projectId) => ({
    type: ActionType.START_DIALOG_FOR_RESULT,
    taskName: taskName,
    taskDescription: taskDescription,
    taskPriority: taskPriority,
    taskId: taskId,
    projectId: projectId
});

export const closeDialog = () => ({
   type: ActionType.CLOSE_DIALOG
});

export const preEditTask = (name, description, priority) => ({
    type: ActionType.PRE_EDIT_TASK,
    name: name,
    description: description,
    priority: priority
});

export const editTask = (name, description, priority, projectId, taskId) => (dispatch) => {
    dispatch(closeDialog());
    request(`/projects/${projectId}/tasks/${taskId}/`, 'PUT', { name, description, priority, projectId })
        .then(response => {
            if (response.ok)
                dispatch(editTaskSuccess(name, description, priority, projectId, taskId));
        });
};