import { request } from "../requests";

export const ActionType = Object.freeze({
    SET_NOT_AUTHENTICATED: 'SET_NOT_AUTHENTICATED',
    AUTHENTICATION_SUCCESS: 'AUTHENTICATION_SUCCESS',
    SIGN_OUT: 'SIGN_OUT',
    SIGN_UP_FAIL: 'SIGN_UP_FAIL',
    SIGN_IN_FAIL: 'SIGN_IN_FAIL',
    CLEAR_AUTH_ERROR_MESSAGES: 'CLEAR_AUTH_ERROR_MESSAGES'
});

export const signUp = (login, password) => (dispatch) => {
    request('/register/', 'POST', { login, password })
        .then(response => {
            if (response.ok)
                return response.json();
            else
                dispatch(signUpFail("username", "Name is already taken"));
        })
        .then(authResult => {
            if (authResult)
                dispatch(authenticationSuccess(authResult.token));
        });
};

export const signIn = (login, password) => (dispatch) => {
    request('/login/', 'POST', { login, password })
        .then(response => {
            if (response.ok)
                return response.json();
            else
                dispatch(signInFail("any", "Invalid username or password"));
        })
        .then(authResult => {
            if (authResult)
                dispatch(authenticationSuccess(authResult.token));
        });
};

export const setNotAuthenticated = () => ({
    type: ActionType.SET_NOT_AUTHENTICATED
});

export const authenticationSuccess = (token) => ({
    type: ActionType.AUTHENTICATION_SUCCESS,
    token
});

export const signOut = () => ({
    type: ActionType.SIGN_OUT
});

const signUpFail = (field, errorMessage) => ({
    type: ActionType.SIGN_UP_FAIL,
    field,
    errorMessage
});

const signInFail = (field, errorMessage) => ({
    type: ActionType.SIGN_IN_FAIL,
    field,
    errorMessage
});

export const clearAuthErrorMessages = () => ({
    type: ActionType.CLEAR_AUTH_ERROR_MESSAGES
});