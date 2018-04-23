export const getCommentById = (server, commentId) => {
    // const url = `${server}/comments/${commentId}`;
    const url = `/comments/${commentId}`;
    return fetch(url, {
        method: 'GET',
        mode: 'CORS',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        credentials: 'include'
    })
        .then(response => response.ok ? response.json() : Promise.reject(response.text()) )
        .catch( () => Promise.reject('register-fail') );
};

export const addNewComment = (server, postId, comment) => {
    // const url = `${server}/comments/${postId}`;
    const url = `/comments/${postId}`;
    return fetch(url, {
        method: 'POST',
        mode: 'CORS',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({comment: comment})
    })
        .then(response => response.ok ? response.json() : Promise.reject(response.text()) )
        .catch( () => Promise.reject('register-fail') );
};