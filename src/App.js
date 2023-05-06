import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import Login from './Pages/Login';
import Meals from './Pages/Meals';

function App() {
  return (
    <div className="container">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/meals" component={ Meals } />
      </Switch>
    </div>
  );
}

export default App;
