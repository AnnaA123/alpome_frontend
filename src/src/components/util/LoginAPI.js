const apiUrl = 'http://localhost:3004/api/login/';


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