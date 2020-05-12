const BASE_URL = 'http://valerystatinov.me/api';
export const request = (url, token, method = 'GET', body) => {
    return fetch(`${BASE_URL}${url}`, {
        method,
        headers: {
            'Token': token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
};