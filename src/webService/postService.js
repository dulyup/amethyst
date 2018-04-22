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

export const postNew = (server, post) => {
    console.log(post);
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