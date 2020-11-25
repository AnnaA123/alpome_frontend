/* changed urls to relative urls and added proxy url to package.json.
That way in development it uses the proxy and in prduction it uses the parent i.e server*/
const apiUrl = '/api/login/';


// used in LoginForm.js

const login = (username, password) => {
    const settings = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    };
    return fetch(apiUrl, settings).then(response => {
      return response.json();
    });
};

export { login };