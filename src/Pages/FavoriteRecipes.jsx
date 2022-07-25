import React, { useState } from 'react';
import FavoriteRecipesDetails from '../Components/FavoriteRecipesInfo';
import Header from '../Components/Header';
// import ShareBtns from '../Components/ShareBtns';

function FavoriteRecipes() {
  const [filterRecipe, setFilterRecipe] = useState('all');

  function showFavoriteRecipes() {
    const getFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    console.log(showFavoriteRecipes);

    if (filterRecipe === 'all') {
      return (getFavoriteRecipes.map((item, index) => (
        <FavoriteRecipesDetails
          key={ item.id }
          index={ index }
          image={ item.image }
          name={ item.name }
          id={ item.id }
          type={ item.type }
          nationality={ item.nationality }
          category={ item.category }
          alcoholicOrNot={ item.alcoholicOrNot }

        />
      )));
    }
    if (getFavoriteRecipes === 0) {
      return null;
    }
    return (getFavoriteRecipes.filter((item) => item.type === filterRecipe)
      .map((item, index) => (
        <FavoriteRecipesDetails
          index={ index }
          key={ item.id }
          image={ item.image }
          name={ item.name }
          id={ item.id }
          type={ item.type }
          nationality={ item.nationality }
          category={ item.category }
          alcoholicOrNot={ item.alcoholicOrNot }
        />
      )));
  }
  return (
    <div>
      <Header
        renderButton={ false }
        title="Favorite Recipes"
      />
      <ul>
        { showFavoriteRecipes() }
      </ul>
      <button
        data-testid="filter-by-all-btn"
        type="button"
        onClick={ () => setFilterRecipe('all') }
      >
        All
      </button>
      <button
        data-testid="filter-by-food-btn"
        type="button"
        onClick={ () => setFilterRecipe('food') }
      >
        Food
      </button>
      <button
        data-testid="filter-by-drink-btn"
        type="button"
        onClick={ () => setFilterRecipe('drink') }
      >
        Drinks
      </button>
    </div>
  );
}

export default FavoriteRecipes;
