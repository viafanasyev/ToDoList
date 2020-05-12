import { request } from "../requests";

export const ActionType = Object.freeze({
    SET_AUTHORIZED: 'SET_AUTHORIZED',
    AUTHENTICATION_SUCCESS: 'AUTHENTICATION_SUCCESS'
});

export const signUp = (login, password) => (dispatch) => {
    request('/register/', 'POST', { login, password })
        .then(response => {
            if (response.ok)
                return response.json();
            else
                alert('Name is already taken'); // TODO: Show this error in SignUp form
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
                alert('Invalid credentials'); // TODO: Show this error in SignIn form
        })
        .then(authResult => {
            if (authResult)
                dispatch(authenticationSuccess(authResult.token));
        });
};

export const setAuthorized = (isAuthorized) => ({
    type: ActionType.SET_AUTHORIZED,
    isAuthorized
});

export const authenticationSuccess = (token) => ({
    type: ActionType.AUTHENTICATION_SUCCESS,
    token
});