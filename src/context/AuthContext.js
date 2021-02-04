import React, { useContext, useCallback, useState, createContext } from 'react';
import jwt from 'jsonwebtoken';
import { api } from '../services';

const AuthContext = createContext({
    user: {
        fullname: '',
        email: '',
        role: '',
        code: '',
    },
    token: '',
});

export const AuthProvider = ({ children }) => {
    const [data, setData] = useState(() => {
        let user = localStorage.getItem('@fabapar/user');
        let token = localStorage.getItem('@fabapar/token');
        if (!!user && !!token) {
            try {
                jwt.verify(token, 'secret');
                return { user: JSON.parse(user), token };
            } catch (e) {
                console.log(e);
                return {};
            }
        }
        return {};
    });

    const signIn = useCallback(async ({ code, password }) => {
        const response = await api.post('/login', { code, password });
        if (response.data.token) {
            try {
                let { dataValues } = jwt.verify(response.data.token, 'secret');
                let user = {
                    fullname: `${dataValues.firstname} ${dataValues.lastname}`,
                    email: dataValues.email,
                    role: dataValues.role,
                    code: dataValues.code,
                };
                localStorage.setItem('@fabapar/user', JSON.stringify(user));
                localStorage.setItem('@fabapar/token', response.data.token);
                setData({
                    user,
                    token: response.data.token,
                });
            } catch (e) {
                localStorage.removeItem('@fabapar/user');
                localStorage.removeItem('@fabapar/token');
                console.log(e);
            }
        }
    }, []);

    const signOut = useCallback(() => {
        localStorage.removeItem('@fabapar/user');
        localStorage.removeItem('@fabapar/token');
        setData({ user: null, token: null });
    }, []);

    return (
        <AuthContext.Provider
            value={{ user: data.user, token: data.token, signIn, signOut }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider.');
    }
    return context;
};
