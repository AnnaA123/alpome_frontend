/* changed urls to relative urls and added proxy url to package.json.
That way in development it uses the proxy and in prduction it uses the parent i.e server*/
const apiUrl = '/api/users/';

//get info of specific user. used at ListUnits.js
const getSingleUser = (id) => {
    return fetch(apiUrl + id).then(response => {
        return response.json();
    });
}

//add a new user at SignUpForm.js
const register = (user) => {
    const settings = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    };
    return fetch(apiUrl, settings).then(response => {
        return response.json();
    })
}

export { getSingleUser, register };