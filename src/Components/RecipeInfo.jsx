import React from 'react';
import PropTypes from 'prop-types';

function RecipeInfo(props) {
  const { type, recipe, finishButton } = props;
  const recipeType1 = type.split('');
  recipeType1.pop();
  const recipeType = recipeType1.join('');
  return (
    <main>
      <h1 data-testid="recipe-title">{recipe[`str${recipeType}`]}</h1>
      <img
        src={ recipe[`str${recipeType}Thumb`] }
        alt={ `${recipeType}` }
        className="recipe-card img"
      />
      <button type="button" data-testid="share-btn">Share</button>
      <button type="button" data-testid="favorite-btn">Favorite</button>
      <h4 data-testid="recipe-category">{recipe.strCategory}</h4>
      {Object.keys(recipe).map((key, index) => (
        key.includes('strIngredient') && recipe[key] && (
          <p key={ index } data-testid={ `${index}-ingredient-step` }>{recipe[key]}</p>
        )
      ))}
      <article data-testid="instructions">
        {recipe.strInstructions}
      </article>
      {finishButton
      && <button type="button" data-testid="finish-recipe-btn">Finalizar</button>}
    </main>
  );
}

RecipeInfo.propTypes = {
  type: PropTypes.string.isRequired,
  recipe: PropTypes.objectOf(PropTypes.string).isRequired,
  finishButton: PropTypes.bool.isRequired,
};

export default RecipeInfo;
