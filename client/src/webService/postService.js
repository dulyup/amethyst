/**
 * Get all post list
 * @returns {Promise<Response>}
 */
export const getPostList = () => {
    const url = `/posts`;
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
 * @returns {Promise<Response>}
 */
export const getPostByName = (username) => {
    const url = `/posts/${username}`;
    return fetch(url, {
        method: 'GET',
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
 * @param post
 * @returns {Promise<Response>}
 */
export const postNew = (post) => {
    const url = `/posts`;
    return fetch(url, {
        method: 'POST',
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
