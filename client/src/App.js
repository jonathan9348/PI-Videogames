import './App.css';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import LandingPage from '../src/components/LandingPage';
import Home from './components/Home';
import VideogameDetail from './components/VideogameDetail';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route path="/home/:id" component={VideogameDetail}/>
            
           


        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
