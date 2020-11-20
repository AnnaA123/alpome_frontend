const apiUrl = 'https://us-central1-amiable-hydra-279814.cloudfunctions.net/app/api/read';

//get all data of a single unit
const getAllData = () => {
    return fetch(apiUrl).then(response => {
        
        return response.json();;
    })
}

const getDayData = (date) => {
    return fetch(apiUrl + '/datetime/' + date).then(response => {
        return response.json();;
    })
}

export { getAllData, getDayData };