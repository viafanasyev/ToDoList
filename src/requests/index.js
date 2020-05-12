const BASE_URL = 'http://valerystatinov.me/api';
export const request = (url, method = 'GET', body) => {
    return fetch(`${BASE_URL}${url}`, {
        method,
        headers: {
            'Token': localStorage.getItem("token"),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
};