import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch,
} from 'react-router-dom';

import ProtectedRoute from './Components/ProtectedRoute';

import NavMenu from './Components/NavMenu';

import './App.css';
import { AppWrapper, ContentWrapper } from './Pages/OtherElements';

import Dashboard from './Pages/Dashboard';
import Login from './Pages/Login';
import Fixed from './Pages/Fixed';
import Users from './Pages/Users';
import Tickets from './Pages/Tickets';
import Reports from './Pages/Reports';
import Profile from './Pages/Profile';

import { useEffect, useState } from 'react';

import { auth } from './services';

function App() {
    const [logged, setLogged] = useState(false);

    useEffect(() => {
        setLogged(auth.isLogged());
    }, [logged]);

    if (!logged) {
        <Redirect to="/login" />;
    }

    return (
        <Router>
            <Switch>
                <Route exact path="/login" component={Login} />
                <AppWrapper>
                    <NavMenu />
                    <ContentWrapper>
                        <ProtectedRoute exact path="/" component={Dashboard} />
                        <ProtectedRoute
                            exact
                            path="/chamados"
                            component={Tickets}
                        />
                        <ProtectedRoute
                            exact
                            path="/usuarios"
                            component={Users}
                        />
                        <ProtectedRoute
                            exact
                            path="/equipamentos"
                            component={Fixed}
                        />
                        <ProtectedRoute
                            exact
                            path="/relatorios"
                            component={Reports}
                        />
                        <ProtectedRoute exact path="/me" component={Profile} />
                    </ContentWrapper>
                </AppWrapper>
            </Switch>
        </Router>
    );
}

export default App;
