const apiUrl = 'http://localhost:3004/api/users/';

//get info of specific user. used at ListUnits.js
const getSingleUser = (id) => {
    return fetch(apiUrl + id).then(response => {
        return response.json();
    });
}

//add a new user at SignUpForm.js
const register = (user) => {
    console.log('user is here: ' + JSON.stringify(user));
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