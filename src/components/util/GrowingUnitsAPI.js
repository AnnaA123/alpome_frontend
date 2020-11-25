const apiUrl = 'http://localhost:3004/api/growing_unit/';

const getSingleUnit = (unitId) => {
    return fetch(apiUrl + unitId).then(response => {
        return response.json();
    })
}

// add a new unit. used in AddUnit.js
const addNewUnit = (data, token) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'token': token,
    },
    body: JSON.stringify(data),
  };
  return fetch(apiUrl, options).then(response => {
    return response.json();
  })
}

const updateData = (data, token, unitId) => {
  console.log('GROWINGUNITAPI token is here: ' + token)
  const options = {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
    },
  };
  return fetch(apiUrl + unitId, options).then(response =>{
    return response.json();
  });
}

const uploadImg = (data, token, unitId)=>{
    const options = {
      method: 'POST',
      body: data,
      headers:{
        'token': token,
      },
    };
    return fetch(apiUrl + 'unitimage/' + unitId, options).then(response =>{
      return response.json();
    });
  };

export { getSingleUnit, addNewUnit, updateData, uploadImg };