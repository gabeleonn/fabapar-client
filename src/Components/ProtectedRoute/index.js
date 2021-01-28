import React from 'react';

import { Redirect, Route } from 'react-router-dom';

import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({
    isAdmin,
    isPrivate,
    component: Component,
    ...rest
}) => {
    const { user } = useAuth();
    return (
        <Route
            {...rest}
            render={({ location }) => {
                if (isPrivate) {
                    if (!!user) {
                        if (isAdmin) {
                            if(user.role === 'NORMAL') {
                                return <Redirect
                                to={{
                                    pathname: '/chamados',
                                    state: { from: location },
                                }}
                            />;
                            }
                            return <Component />;
                        } else {
                            return <Component />;
                        }
                    } else {
                        return <Redirect
                            to={{
                                pathname: '/login',
                                state: { from: location },
                            }}
                        />;
                    }
                } else {
                    if(!!user) {
                        return <Redirect
                                to={{
                                    pathname: '/',
                                    state: { from: location },
                                }}
                            />;
                    }
                    return <Component />;
                }
            }}
        />
    );
};

export default ProtectedRoute;
