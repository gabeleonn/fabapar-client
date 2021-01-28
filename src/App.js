import {
    BrowserRouter as Router,
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

import { AuthProvider } from './context/AuthContext';

function App() {

    return (
        <Router>
            <Switch>
                <AuthProvider>
                    <ProtectedRoute exact path="/login" component={Login} />
                    <AppWrapper>
                        <NavMenu />
                        <ContentWrapper>
                            <ProtectedRoute
                                exact
                                path="/"
                                component={Dashboard}
                                isAdmin
                                isPrivate
                            />
                            <ProtectedRoute
                                exact
                                path="/chamados"
                                component={Tickets}
                                isPrivate
                            />
                            <ProtectedRoute
                                exact
                                path="/usuarios"
                                component={Users}
                                isAdmin
                                isPrivate
                            />
                            <ProtectedRoute
                                exact
                                path="/equipamentos"
                                component={Fixed}
                                isAdmin
                                isPrivate
                            />
                            <ProtectedRoute
                                exact
                                path="/relatorios"
                                component={Reports}
                                isAdmin
                                isPrivate
                            />
                            <ProtectedRoute
                                exact
                                path="/me"
                                component={Profile}
                                isPrivate
                            />
                            
                        </ContentWrapper>
                    </AppWrapper>
                
                </AuthProvider>
            </Switch>
        </Router>
    );
}

export default App;
