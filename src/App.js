import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import NavMenu from './Components/NavMenu';

import './App.css';
import { AppWrapper, ContentWrapper } from './Pages/OtherElements';

import Dashboard from './Pages/Dashboard';
import Login from './Pages/Login';
import Loans from './Pages/Loans';
import Fixed from './Pages/Fixed';
import Users from './Pages/Users';
import Tickets from './Pages/Tickets';
import Ruined from './Pages/Ruined';
import Reports from './Pages/Reports';

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/login" component={Login} />
                <AppWrapper>
                    <NavMenu />
                    <ContentWrapper>
                        <Route exact path="/" component={Dashboard} />
                        <Route exact path="/tickets" component={Tickets} />
                        <Route exact path="/usuarios" component={Users} />
                        <Route exact path="/emprestimos" component={Loans} />
                        <Route exact path="/itens-fixos" component={Fixed} />
                        <Route exact path="/descartados" component={Ruined} />
                        <Route exact path="/relatorios" component={Reports} />
                    </ContentWrapper>
                </AppWrapper>
            </Switch>
        </Router>
    );
}

export default App;
