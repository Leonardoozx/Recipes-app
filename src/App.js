import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import Recipes from './Pages/Recipes';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/foods" render={ () => <Recipes title="Foods" /> } />
      <Route path="/drinks" render={ () => <Recipes title="Drinks" /> } />
      {/* <Route path="/drink:id" component={ DrinkDetails } /> */}
      {/* <Route path="/foods:id" component={ FoodDetails } /> */}
      {/* <Route path="/drinks:id/in-progress" component={ DrinksInProgress } /> */}
      <Route path="/profile" component={ Profile } />
      {/* <Route path="/done-recipes" component={ DoneRecipes } /> */}
      {/* <Route path="/favorite-recipes" component={ FavoriteRecipes } /> */}
    </Switch>
  );
}

export default App;
