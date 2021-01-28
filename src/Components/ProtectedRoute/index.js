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
                return isPrivate && !!user ? (
                    <Component />
                ) : (
                    <Redirect
                        to={{
                            pathname: isPrivate ? '/login' : '/dashboard',
                            state: { from: location },
                        }}
                    />
                );
            }}
        />
    );
};

export default ProtectedRoute;
