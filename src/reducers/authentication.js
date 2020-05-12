import { ActionType } from "../actions/authentication";

const defaultState = {
    isAuthenticated: false,
    signUpErrors: {},
    signInErrors: {}
};

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case ActionType.SET_NOT_AUTHENTICATED:
            return defaultState;
        case ActionType.AUTHENTICATION_SUCCESS:
            localStorage.setItem("token", action.token);
            return {
                ...state,
                isAuthenticated: true,
                signUpErrors: {}
            };
        case ActionType.SIGN_OUT:
            localStorage.removeItem("token");
            return defaultState;
        case ActionType.SIGN_UP_FAIL:
            return {
                ...state,
                signUpErrors: {
                    [action.field]: action.errorMessage
                }
            };
        case ActionType.SIGN_IN_FAIL:
            return {
                ...state,
                signInErrors: {
                    [action.field]: action.errorMessage
                }
            };
        case ActionType.CLEAR_AUTH_ERROR_MESSAGES:
            return {
                ...state,
                signUpErrors: {},
                signInErrors: {}
            };
        default:
            return state;
    }
};

export default reducer;