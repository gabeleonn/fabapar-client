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
    console.log(!!user);
    return (
        <Route
            {...rest}
            render={({ location }) => {
                if (isPrivate) {
                    if (!!user) {
                        return (
                            <Redirect
                                to={{
                                    pathname: '/',
                                    state: { from: location },
                                }}
                            />
                        );
                    }

                    if (user.role !== 'NORMAL' && isAdmin) {
                        return <Component />;
                    } else {
                        return (
                            <Redirect
                                to={{
                                    pathname: '/chamados',
                                    state: { from: location },
                                }}
                            />
                        );
                    }
                } else {
                    return <Component />;
                }
            }}
        />
    );
};

export default ProtectedRoute;
