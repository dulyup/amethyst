export const getUserList = (server) => {
    const url = `${server}/users`;
    return fetch(url, {
        method: 'POST',
        mode: 'CORS',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include',
    })
        .then(response => response.ok ? response.json() : Promise.reject(response.text()) )
        .catch( () => Promise.reject('get-user-list-fail') );
};

export const getUserById = (server, userId) => {
    const url = `${server}/users/:userId`;
    return fetch(url, {
        method: 'GET',
        mode: 'CORS',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include',
    })
        .then(response => response.ok ? response.json() : Promise.reject(response.text()))
        .catch( () => Promise.reject('get user fail'));
};

export const getUserByName = (server, username) => {
    const url = `${server}/users/:username`;
    return fetch(url, {
        method: 'GET',
        mode: 'CORS',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        // credentials: 'include',
    })
        .then(response => response.ok ? response.json() : Promise.reject(response.text()))
        .catch( () => Promise.reject('get user fail'));
};

export const register = (server, user) => {
    const url = `${server}/users`;
    return fetch(url, {
        method: 'POST',
        mode: 'CORS',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({username: user.username, avatar: user.avatar, email: user.email, password: user.password})
    })
        .then(response => {
            return response.ok ? response.json() : Promise.reject(response.text())}
        )
        .catch( () => Promise.reject('register-fail') );
};

export const login = (server, user) => {
    const url = `${server}/users/login`;
    return fetch(url, {
        method: 'POST',
        mode: 'CORS',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({username: user.username, password: user.password})
        })
        .then(response => {
            return response.ok ? response.json() : Promise.reject(response.text());
        })
        .catch( () => Promise.reject('login-fail') );
};

export const logout = (server) => {
    const url = `${server}/users/logout`;
    console.log(url);
    return fetch(url, {
        method: 'POST',
        mode: 'CORS',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        // body: JSON.stringify({username: user.username, password: user.password})
    })
        .then(response => response.ok ? response.json() : Promise.reject(response.text())

        )
        .catch( () => Promise.reject('logout-fail') );
};


