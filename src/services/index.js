const axios = require('axios');

const api = axios.create({
    baseURL: 'http://192.168.15.135:8080/v1/',
});

const enums = {
    department: {
        default: 'NTI',
        enum: ['NTI', 'RH', 'MARKETING', 'FINANCEIRO', 'CAPTAÇÃO'],
    },
    categories: {
        default: 'PERIFÉRICOS',
        enum: ['PERIFÉRICOS', 'DESKTOPS', 'NOTEBOOKS', 'RAMAIS'],
    },
    status: {
        default: 'FIXO',
        enum: ['DISPONÍVEL', 'MANUTENÇÃO', 'EMPRESTADO', 'FIXO', 'DESCARTADO'],
    },
    roles: { default: 'NORMAL', enum: ['SUPER', 'ADMIN', 'NORMAL'] },
};

module.exports = { api, enums };
