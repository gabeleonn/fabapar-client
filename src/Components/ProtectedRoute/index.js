import React from 'react';

import { Redirect, Route } from 'react-router-dom';
import { auth } from '../../services';

console.log(auth.isLogged());

const ProtectedRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) =>
            auth.isLogged() ? (
                <Component {...props} />
            ) : (
                <Redirect to="/login" />
            )
        }
    />
);

export default ProtectedRoute;
