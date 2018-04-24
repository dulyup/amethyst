export const getUserList = () => {
    const url = `/users`;
    return fetch(url, {
        method: 'GET',
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

export const getUserById = (userId) => {
    const url = `/users/${userId}`;
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

export const getUserByName = (username) => {
    const url = `/users/${username}`;
    return fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        // credentials: 'include',
    })
        .then(response => response.ok ? response.json() : Promise.reject(response.text()))
        .catch( () => Promise.reject('get user fail'));
};

export const register = (user) => {
    const url = `/users`;
    return fetch(url, {
        method: 'POST',
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

export const login = (user) => {
    const url = `/users/login`;
    return fetch(url, {
        method: 'POST',
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

export const logout = () => {
    const url = `/users/logout`;
    console.log(url);
    return fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include',
    })
        .then(response => response.ok ? response.json() : Promise.reject(response.text()))
        .catch( () => Promise.reject('logout-fail') );
};


