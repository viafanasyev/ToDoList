import { request } from "../requests";

export const ActionType = Object.freeze({
    SET_AUTHORIZED: 'SET_AUTHORIZED',
    SIGN_UP_SUCCESS: 'SIGN_UP_SUCCESS'
});

export const signUp = (login, password) => (dispatch) => {
    request('/register/', null, 'POST', { login, password })
        .then(response => {
            if (response.ok)
                return response.json();
            else
                alert('Name is already taken'); // TODO: Show this error in SignUp form
        })
        .then(({ token }) => {
            if (token)
                dispatch(signUpSuccess(token));
        });
};

const signUpSuccess = (token) => ({
    type: ActionType.SIGN_UP_SUCCESS,
    token
});

export const setAuthorized = (isAuthorized) => ({
    type: ActionType.SET_AUTHORIZED,
    isAuthorized
});