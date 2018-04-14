export const getUserList = (server) => {
    const url = `${server}/users`;
    return fetch(url, {
        method: 'POST',
        mode: 'CORS'
    })
        .then(response => response.ok ? response.json() : Promise.reject(response.text()) )
        .catch( () => Promise.reject('get-user-list-fail') );
};

export const getUserById = (server, userId) => {
    const url = `${server}/users/:userId`;
    return fetch(url, {
        method: 'GET',
        mode: 'CORS'
    })
        .then(response => response.ok ? response.json() : Promise.reject(response.text()))
        .catch( () => Promise.reject('get user fail'));
};

export const getUserByName = (server, username) => {
    const url = `${server}/users/:username`;
    return fetch(url, {
        method: 'GET',
        mode: 'CORS'
    })
        .then(response => response.ok ? response.json() : Promise.reject(response.text()))
        .catch( () => Promise.reject('get user fail'));
};

export const addNewUser = (server, user) => {
    console.log(user);
    const url = `${server}/users`;
    return fetch(url, {
        method: 'POST',
        mode: 'CORS',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username: user.username, avatar: user.avatar, email: user.email, password: user.password})
    })
        .then(response => response.ok ? response.json() : Promise.reject(response.text()) )
        .catch( () => Promise.reject('add-new-user-fail') );
};

export const getGuess = (server, secretId, common, preGuess) => {
    let url = `${server}/game/${secretId}/guessed`;
    return fetch(url, {
        method: 'PUT',
        mode: 'CORS',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( { preGuess: preGuess, common: common, id: secretId } )
    })
        .then(response => response.ok ? response.json() : Promise.reject(response.text()) )
        .catch( () => Promise.reject('get-guess-fail') );
};

export const checkResult = (server, guess, secretId) => {
    let url = `${server}/game/${secretId}/guess/${guess}`;
    return fetch(url, {
        method: 'GET',
        mode: 'CORS',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then( response => response.ok ? response.json() : Promise.reject(response.text()) )
        .catch( () => Promise.reject('check-result-fail') );
};

export const clearGame = (server, secretId) => {
    let url = `${server}/game/${secretId}`;
    return fetch(url, {
        method: 'DELETE',
        mode: 'CORS',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then( response => response.ok ? response.json() : Promise.reject(response.text()) )
        .catch( () => Promise.reject('clear-history-fail') );
};

