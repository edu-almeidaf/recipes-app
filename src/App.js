import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './Pages/Login';
import Meals from './Pages/Meals';
import Drinks from './Pages/Drinks';
import Profile from './Pages/Profile';
import DoneRecipes from './Pages/DoneRecipes';
import FavoriteRecipes from './Pages/FavoriteRecipes';
import RecipeDetailsDrinks from './components/RecipeDetailsDrinks';
import RecipeDetailsMeals from './components/RecipeDetailsMeals';
import MealsInProgress from './Pages/MealsInProgress';
import DrinksInProgres from './Pages/DrinksInProgres';

function App() {
  return (
    <div className="container">
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
          component={ RecipeDetailsMeals }
        />
        <Route
          exact
          path="/drinks/:id"
          component={ RecipeDetailsDrinks }
        />
        <Route
          exact
          path="/meals/:id/in-progress"
          component={ MealsInProgress }
        />
        <Route
          exact
          path="/drinks/:id/in-progress"
          component={ DrinksInProgres }
        />

      </Switch>
    </div>
  );
}

export default App;
