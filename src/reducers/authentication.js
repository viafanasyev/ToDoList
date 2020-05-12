import { ActionType } from "../actions/authentication";

const defaultState = {
    isAuthenticated: false
};

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case ActionType.SET_NOT_AUTHENTICATED:
            return defaultState;
        case ActionType.AUTHENTICATION_SUCCESS:
            localStorage.setItem("token", action.token);
            return {
                ...state,
                isAuthenticated: true
            };
        case ActionType.SIGN_OUT:
            localStorage.removeItem("token");
            return defaultState;
        default:
            return state;
    }
};

export default reducer;