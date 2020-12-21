import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import NavMenu from './Components/NavMenu';

import './App.css';
import { AppWrapper, ContentWrapper } from './Pages/OtherElements';

function App() {
    return (
        <Router>
            <AppWrapper>
                <NavMenu />
                <Switch>
                    <ContentWrapper>
                        <Route exact path="/" />
                        <div
                            className="scroll"
                            style={{ height: '200vh' }}
                        ></div>
                    </ContentWrapper>
                </Switch>
            </AppWrapper>
        </Router>
    );
}

export default App;
