import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Foods from './Pages/Foods';
import Drinks from './Pages/Drinks';
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import RecipeInProgress from './Pages/RecipeInProgress';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/foods" component={ Foods } />
      <Route exact path="/drinks" component={ Drinks } />
      {/* <Route path="/drinks:id" component={ DrinkDetails } /> */}
      {/* <Route path="/foods:id" component={ FoodDetails } /> */}
      <Route path="/drinks/:drinkId/in-progress" component={ RecipeInProgress } />
      <Route path="/foods/:foodId/in-progress" component={ RecipeInProgress } />
      <Route path="/profile" component={ Profile } />
      {/* <Route path="/done-recipes" component={ DoneRecipes } /> */}
      {/* <Route path="/favorite-recipes" component={ FavoriteRecipes } /> */}
    </Switch>
  );
}

export default App;
