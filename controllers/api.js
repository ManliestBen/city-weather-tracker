const City = require('../models/city');
const axios = require('axios');

module.exports = {
    getWeather,
    getCities,
    addCity,
    deleteCity
}

function addCity(req, res){
    req.body.user = req.user._id;
    City.create(req.body)
    .then(city => {res.json(city)})
}

function deleteCity(req, res){
    City.findByIdAndDelete(req.params.id)
    .then(city => {res.json(city)})
}

function getWeather(req, res){
    axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${req.body.name},${req.body.country}&units=imperial&appid=${process.env.API_KEY}`)
    .then(response => {res.json(response.data)})
}

function getCities(req, res){
    City.find({"user": req.user._id})
    .then(cities => {res.json(cities)})
}