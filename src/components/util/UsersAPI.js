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

// update user data at ChangeEmail.js
const updateUser = (data, token, user) => {
  const options = {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
    },
  };
  console.log('heres updateUSER body: ' + options.body)
  return fetch(apiUrl + user, options).then(response =>{
    return response.json();
  });
}

// delete a user
const deleteUser = (token, user) => {
    const options = {
      method: 'DELETE',
      headers: {
        'Authorization': token,
      },
    };
    return fetch(apiUrl + user, options).then(response => {
      return response;
    })
  }

export { getSingleUser, register, updateUser, deleteUser };