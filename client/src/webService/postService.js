/**
 * Get all post list
 * @param server
 * @returns {Promise<Response>}
 */
export const getPostList = (server) => {
    const url = `${server}/posts`;
    return fetch(url, {
        method: 'GET',
        mode: 'CORS',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })
        .then(response => response.ok ? response.json() : Promise.reject(response.text()) )
        .catch( () => Promise.reject('register-fail') );
};

/**
 * Look up posts by username
 * @param server
 * @returns {Promise<Response>}
 */
export const getPostByName = (server, username) => {
    const url = `${server}/posts/${username}`;
    return fetch(url, {
        method: 'GET',
        mode: 'CORS',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })
        .then(response => response.ok ? response.json() : Promise.reject(response.text()) )
        .catch( () => Promise.reject('register-fail') );
};

/**
 * Add new post
 * @param server
 * @param post
 * @returns {Promise<Response>}
 */
export const postNew = (server, post) => {
    const url = `${server}/posts`;
    return fetch(url, {
        method: 'POST',
        mode: 'CORS',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({content: post.content, image:post.image})
    })
        .then(response => response.ok ? response.json() : Promise.reject(response.text()) )
        .catch( () => Promise.reject('register-fail') );
};
