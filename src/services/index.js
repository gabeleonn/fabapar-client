const axios = require('axios');
const jwt = require('jsonwebtoken');

const api = axios.create({
    baseURL: 'http://192.168.15.135:8080/v1/',
});

class Auth {
    token = '';

    constructor() {
        this.token = localStorage.getItem('token');
    }

    async login(form) {
        let response = await api.post('login', form);
        if (response.data.token !== null) {
            localStorage.setItem('token', response.data.token);
            return response.data.token;
        }
        return null;
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('code');
    }

    isLogged() {
        if (localStorage.getItem('token') === null) {
            this.token = null;
            return false;
        }
        this.token = localStorage.getItem('token');
        try {
            let decoded = jwt.verify(this.token, 'secret');
            localStorage.setItem('role', decoded.dbUser.role);
            localStorage.setItem('code', decoded.dbUser.code);
            return true;
        } catch (e) {
            console.log(e);
            this.logout();
            return false;
        }
    }

    getToken() {
        return localStorage.getItem('token');
    }
}

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

module.exports = { api, enums, auth: new Auth() };
