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
        default: 'DISPONÍVEL',
        enum: ['DISPONÍVEL', 'MANUTENÇÃO', 'EMPRESTADO', 'FIXO', 'DESCARTADO'],
    },
    roles: { default: 'NORMAL', enum: ['SUPER', 'ADMIN', 'NORMAL'] },
    ticket: {
        categories: {
            default: 'hardware',
            enum: ['hardware', 'software', 'rede', 'plataforma'],
        },
        priority: {
            default: 'low',
            enum: ['low', 'medium', 'high'],
        },
        status: {
            default: 'entrada',
            enum: [
                'entrada',
                'em andamento',
                'aguardando terceiros',
                'concluído',
                'perdido',
            ],
        },
    },
};

module.exports = { api, enums };
