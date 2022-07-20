import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import RecipeInProgress from './Pages/RecipeInProgress';
import Recipes from './Pages/Recipes';
import RecipeDetails from './Pages/RecipeDetails';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/drinks/:drinkId/in-progress" component={ RecipeInProgress } />
      <Route path="/foods/:foodId/in-progress" component={ RecipeInProgress } />
      <Route path="/drinks/:id" component={ RecipeDetails } />
      <Route path="/foods/:id" component={ RecipeDetails } />
      <Route path="/foods" render={ () => <Recipes title="Foods" /> } />
      <Route path="/drinks" render={ () => <Recipes title="Drinks" /> } />
      <Route path="/profile" component={ Profile } />
      {/* <Route path="/done-recipes" component={ DoneRecipes } /> */}
      {/* <Route path="/favorite-recipes" component={ FavoriteRecipes } /> */}
    </Switch>
  );
}

export default App;
