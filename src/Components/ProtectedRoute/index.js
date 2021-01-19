import React from 'react';

import { Redirect, Route } from 'react-router-dom';
import { auth } from '../../services';

const ProtectedRoute = ({ admin, component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) => {
            let isLogged = auth.isLogged();
            let isNormal = localStorage.getItem('role') === 'NORMAL';
            if (admin) {
                if (isLogged && !isNormal) {
                    return <Component {...props} />;
                } else {
                    return <Redirect to="/login" />;
                }
            } else {
                if (isLogged) {
                    return <Component {...props} />;
                } else {
                    return <Redirect to="/login" />;
                }
            }
        }}
    />
);

export default ProtectedRoute;
