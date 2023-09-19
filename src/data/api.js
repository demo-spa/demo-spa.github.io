import { clearUserData, getUserData } from '../util.js';

//const host = 'http://localhost:3030';
const host = 'https://softuni-server-e92b4566d45a.herokuapp.com';


async function request(method, url, data) {
    const options = {
        method,
        headers: {}
    };

    const user = getUserData();
    if (user) {
        options.headers['X-Authorization'] = user.accessToken;
    }

    if (data !== undefined) {
        options.headers['Content-Type'] = 'application.json';
        options.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(host + url, options);

        if (response.status == 204) {
            return response;
        }

        const data = await response.json();

        if(response.ok == false) {
            if (response.status == 403) {
                clearUserData();
            }
            throw new Error(data.message);
        }

        return data;

    } catch (err) {
        alert(err.message);
        throw err;
    }
}

export const get = request.bind(null, 'get');
export const post = request.bind(null, 'post');
export const put = request.bind(null, 'put');
export const del = request.bind(null, 'delete');


/* import { clearUserData, getUserData } from '../util.js';

const host = 'http://localhost:3030';

function request(method, url, data) {
    const options = {
        method,
        headers: {}
    };

    const user = getUserData();
    if (user) {
        options.headers['X-Authorization'] = user.accessToken;
    }

    if (data !== undefined) {
        options.headers['Content-Type'] = 'application.json';
        options.body = JSON.stringify(data);
    }

    return fetch(host + url, options)
        .then(response => {
            if (response.status === 204) {
                return response;
            }

            return response.json()
                .then(data => {
                    if (response.ok === false) {
                        if (response.status === 403) {
                            clearUserData();
                        }
                        throw new Error(data.message);
                    }

                    return data;
                });
        })
        .catch(err => {
            alert(err.message);
            throw err;
        });
}

export const get = request.bind(null, 'get');
export const post = request.bind(null, 'post');
export const put = request.bind(null, 'put');
export const del = request.bind(null, 'delete'); */