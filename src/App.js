import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch,
} from 'react-router-dom';

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

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/login" component={Login} />
                <AppWrapper>
                    <NavMenu />
                    <ContentWrapper>
                        <Route exact path="/" component={Dashboard} />
                        <Route exact path="/chamados" component={Tickets} />
                        <Route exact path="/usuarios" component={Users} />
                        <Route exact path="/equipamentos" component={Fixed} />
                        <Route exact path="/relatorios" component={Reports} />
                        <Route exact path="/me" component={Profile} />
                        <Route exact path="/logout">
                            <Redirect to="/login" />
                        </Route>
                    </ContentWrapper>
                </AppWrapper>
            </Switch>
        </Router>
    );
}

export default App;
