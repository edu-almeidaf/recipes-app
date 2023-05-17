import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './Pages/Login';
import Meals from './Pages/Meals';
import Drinks from './Pages/Drinks';
import Profile from './Pages/Profile';
import DoneRecipes from './Pages/DoneRecipes';
import FavoriteRecipes from './Pages/FavoriteRecipes';
import RecipeDetails from './Pages/RecipeDetails';
import RecipeInProgress from './Pages/RecipeInProgress';

function App() {
  const [theme, setTheme] = React.useState('retro');

  const handleRetro = () => {
    setTheme('retro');
  };

  const handleDark = () => {
    setTheme('dark');
  };

  const handleValentine = () => {
    setTheme('valentine');
  };

  const handleAutumn = () => {
    setTheme('autumn');
  };

  const handlePastel = () => {
    setTheme('pastel');
  };

  const handleLuxury = () => {
    setTheme('luxury');
  };
  return (
    <div
      className="container"
      data-theme={ theme }
    >
      <div className="flex justify-center flex-wrap">
        <button
          className="btn btn-primary m-4"
          onClick={ handleRetro }
        >
          retro
        </button>
        <button
          className="btn btn-primary m-4"
          onClick={ handleDark }
        >
          dark
        </button>
        <button
          className="btn btn-primary m-4"
          onClick={ handleValentine }
        >
          valentine
        </button>
        <button
          className="btn btn-primary m-4"
          onClick={ handleAutumn }
        >
          autumn
        </button>
        <button
          className="btn btn-primary m-4"
          onClick={ handlePastel }
        >
          pastel
        </button>
        <button
          className="btn btn-primary m-4"
          onClick={ handleLuxury }
        >
          luxury
        </button>
      </div>

      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/meals" component={ Meals } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
        <Route
          exact
          path="/meals/:id"
          component={ RecipeDetails }
        />
        <Route
          exact
          path="/drinks/:id"
          component={ RecipeDetails }
        />
        <Route
          exact
          path="/meals/:id/in-progress"
          component={ RecipeInProgress }
        />
        <Route
          exact
          path="/drinks/:id/in-progress"
          component={ RecipeInProgress }
        />

      </Switch>
    </div>
  );
}

export default App;
