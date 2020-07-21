import tokenService from './tokenService';



export function getWeatherDataFromBackEnd(formData){
    console.log(formData)
    return fetch('/api/weather', {
        method: "POST",
        headers: {'content-type': 'application/json', 'Authorization': 'Bearer ' + tokenService.getToken()},
        body: JSON.stringify(formData)
    }, {mode: "cors"})
    .then(res => res.json())
}

export function getCities(){
    return fetch('/api/cities', {
        headers: {'Authorization': 'Bearer ' + tokenService.getToken()}
    }, {mode: "cors"})
    .then(res => res.json())
}

export function addCity(formData){
    return fetch('/api/cities', {
        method: "POST",
        headers: {'content-type': 'application/json', 'Authorization': 'Bearer ' + tokenService.getToken()},
        body: JSON.stringify(formData)
    }, {mode: "cors"})
    .then(res => res.json())
}

export function deleteCity(cityId){
    return fetch(`/api/cities/${cityId}`, {
        method: "DELETE",
        headers: {'content-type': 'application/json', 'Authorization': 'Bearer ' + tokenService.getToken()}
    }, {mode: "cors"})
    .then(res => res.json())
}