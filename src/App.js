import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import NavMenu from './Components/NavMenu';

import './App.css';
import { AppWrapper, ContentWrapper } from './Pages/OtherElements';

import Dashboard from './Pages/Dashboard';
import Login from './Pages/Login';

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/login" component={Login} />
                <AppWrapper>
                    <NavMenu />
                    <ContentWrapper>
                        <Route exact path="/" component={Dashboard} />
                    </ContentWrapper>
                </AppWrapper>
            </Switch>
        </Router>
    );
}

export default App;
