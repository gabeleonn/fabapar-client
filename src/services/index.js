const axios = require('axios');

const api = axios.create({
    baseURL: 'http://192.168.0.43:8080/v1/',
});

module.exports = api;
