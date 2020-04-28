import React from "react";
import { actionType } from "../actions/dialog";

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
        case actionType.START_DIALOG_FOR_RESULT:
            return {
                ...state,
                isOpen: true,
                taskName: action.taskName,
                taskDescription: action.taskDescription,
                taskPriority: action.taskPriority,
                taskId: action.taskId,
                projectId: action.projectId
            };
        case actionType.PRE_EDIT_TASK:
            return {
                ...state,
                taskName: action.name,
                taskDescription: action.description,
                taskPriority: action.priority,
            };
        case actionType.CLOSE_DIALOG:
            return defaultState;
        default:
            return state;
    }
};

export default dialog;