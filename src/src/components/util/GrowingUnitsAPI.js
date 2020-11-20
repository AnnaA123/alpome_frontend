const apiUrl = 'http://localhost:3004/api/growing_unit/';

const getSingleUnit = (unitId) => {
    return fetch(apiUrl + unitId).then(response => {
        return response.json();
    })
}

// add a new unit. used in AddUnit.js
// NOT WORKING
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

export { getSingleUnit, addNewUnit, uploadImg };