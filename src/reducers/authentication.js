import { ActionType } from "../actions/authentication";

const defaultState = {
    isAuthorized: false
};

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case ActionType.SET_AUTHORIZED:
            return {
                ...state,
                isAuthorized: action.isAuthorized
            };
        case ActionType.AUTHENTICATION_SUCCESS:
            localStorage.setItem("token", action.token);
            return {
                ...state,
                isAuthorized: true
            };
        case ActionType.SIGN_OUT:
            localStorage.removeItem("token");
            return defaultState;
        default:
            return state;
    }
};

export default reducer;