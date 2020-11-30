/* changed urls to relative urls and added proxy url to package.json.
That way in development it uses the proxy and in prduction it uses the parent i.e server*/
const apiUrl = '/api/growing_unit/';

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
  console.log('GROWINGUNITAPI data here: ' + JSON.stringify(data))
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
    console.log('imagedata: ' + data);
    const options = {
      method: 'POST',
      body: data,
      headers:{
        'Authorization': token,
      },
      processData: false,
      mimeType: "multipart/form-data",
      contentType: false,
    };
    return fetch(apiUrl + 'unitimage/' + unitId, options).then(response =>{
      console.log('heres the response: ' + response);
      return response;
    }).then(
      success => console.log(success) // Handle the success response object
    ).catch(
      error => console.log(error) // Handle the error response object
    );
  };


  //TODO delete image
  const deleteImg = (data, token, unitId)=>{
    console.log('imagedata: ' + data);
    const options = {
      method: 'DELETE',
      body: data,
      headers:{
        'Authorization': token,
      },
      processData: false,
      mimeType: "multipart/form-data",
      contentType: false,
    };
    return fetch(apiUrl + 'unitimage/' + unitId, options).then(response =>{
      console.log('heres the response: ' + response);
      return response;
    }).then(
      success => console.log(success) // Handle the success response object
    ).catch(
      error => console.log(error) // Handle the error response object
    );
  };

export { getSingleUnit, addNewUnit, updateData, uploadImg };
