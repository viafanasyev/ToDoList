import { ActionType } from "../actions/authentication";

const defaultState = {
    isAuthorized: false,
    token: ""
};

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case ActionType.SET_AUTHORIZED:
            return {
                ...state,
                isAuthorized: action.isAuthorized
            };
        case ActionType.SIGN_UP_SUCCESS:
            console.log(action.token);
            return {
                ...state,
                isAuthorized: true,
                token: action.token
            };
        default:
            return state;
    }
};

export default reducer;