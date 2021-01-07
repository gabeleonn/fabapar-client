const axios = require('axios');

const api = axios.create({
    baseURL: 'http://localhost:8080/v1/',
});

const enums = {
    department: {
        default: 'NTI',
        enum: ['NTI', 'RH', 'MARKETING', 'FINANCEIRO', 'CAPTAÇÃO'],
    },
    categories: {
        default: 'PERIFÉRICOS',
        enum: ['PERIFÉRICOS'],
    },
    status: {
        default: 'DISPONÍVEL',
        enum: ['DISPONÍVEL', 'MANUTENÇÃO', 'EM USO'],
    },
    roles: { default: 'NORMAL', enum: ['SUPER', 'ADMIN', 'NORMAL'] },
};

module.exports = { api, enums };
