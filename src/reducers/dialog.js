import React from "react";
import { ActionType } from "../actions/dialog";

const defaultState = {
    isOpen: false,
    taskName: "",
    taskDescription: "",
    taskPriority: "",
    taskId: null,
    projectId: null
};

const dialog = (state = defaultState, action) => {
    switch (action.type) {
        case ActionType.START_DIALOG_FOR_RESULT:
            return {
                ...state,
                isOpen: true,
                taskName: action.taskName,
                taskDescription: action.taskDescription,
                taskPriority: action.taskPriority,
                taskId: action.taskId,
                projectId: action.projectId
            };
        case ActionType.PRE_EDIT_TASK:
            return {
                ...state,
                taskName: action.name,
                taskDescription: action.description,
                taskPriority: action.priority,
            };
        case ActionType.CLOSE_DIALOG:
            return defaultState;
        default:
            return state;
    }
};

export default dialog;