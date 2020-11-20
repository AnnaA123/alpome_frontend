const apiUrl = 'https://us-central1-amiable-hydra-279814.cloudfunctions.net/app/api/read';

//get all data of a single unit
const getAllData = () => {
    return fetch(apiUrl).then(response => {
        
        return response.json();;
    })
}

const getDayData = (date) => {
    const options = {
        method: 'GET',
        params: {
            _limit: 3
        },
      };
    return fetch(apiUrl + '/datetime/' + date, options).then(response => {
        return response.json();;
    })
}

export { getAllData, getDayData };