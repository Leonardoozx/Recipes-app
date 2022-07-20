import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function RecipeInfo(props) {
  const [doneIngredients, setIngredient] = useState([]);
  const [buttonDisabled, changeButtonStatus] = useState(true);
  const { type, recipe, finishButton } = props;
  useEffect(() => {
    function resumeRecipe() {
      const ingredients = JSON.parse(
        localStorage.getItem('inProgressRecipes'),
      ) || [];
      setIngredient(ingredients);
    }
    resumeRecipe();
  }, []);
  useEffect(() => {
    function activateFinishButton() {
      Object.keys(recipe).forEach((key) => {
        if (key.includes('strIngredient') && recipe[key]) {
          changeButtonStatus(doneIngredients.every((item) => item !== key));
        }
      });
    }
    activateFinishButton();
  }, [doneIngredients]);
  function checkedBox(id) {
    return doneIngredients.some((ingredient) => ingredient === id);
  }
  const saveIngredient = (target) => {
    const ingredient = [...doneIngredients];
    if (doneIngredients.every((el) => el !== target.id)) {
      localStorage.setItem(
        'inProgressRecipes', JSON.stringify([...ingredient, target.id]),
      );
      setIngredient([...doneIngredients, target.id]);
      return;
    }
    const filteredArray = ingredient.filter((ingr) => ingr !== target.id);
    setIngredient(filteredArray);
    localStorage.setItem(
      'inProgressRecipes', JSON.stringify(filteredArray),
    );
  };
  const recipeType1 = type.split('');
  recipeType1.pop();
  const recipeType = recipeType1.join('');
  let index = 0;
  return (
    <main>
      <h1 data-testid="recipe-title">{recipe[`str${recipeType}`]}</h1>
      <img
        data-testid="recipe-photo"
        src={ recipe[`str${recipeType}Thumb`] }
        alt={ `${recipeType}` }
        className="recipe-card img"
      />
      <button type="button" data-testid="share-btn">Share</button>
      <button type="button" data-testid="favorite-btn">Favorite</button>
      <h4 data-testid="recipe-category">{recipe.strCategory}</h4>
      {Object.keys(recipe).map((key) => {
        if (key.includes('strIngredient') && recipe[key]) {
          index += 1;
          return (
            <div data-testid={ `${index - 1}-ingredient-step` } key={ key }>
              <label htmlFor={ key }>
                {recipe[key]}
                { checkedBox(key)
                  ? (
                    <input
                      id={ key }
                      style={ { backgroundColor: 'red' } }
                      type="checkbox"
                      onChange={ ({ target }) => saveIngredient(target) }
                      onClick={ ({ target }) => console.log(target) }
                      defaultChecked
                    />)
                  : (
                    <input
                      id={ key }
                      type="checkbox"
                      checked={ checkedBox(key) }
                      onChange={ ({ target }) => saveIngredient(target) }
                    />
                  )}
              </label>
            </div>
          );
        }
        return null;
      })}
      <article data-testid="instructions">
        {recipe.strInstructions}
      </article>
      <footer style={ { backgroundColor: 'transparent' } }>
        {finishButton
      && (
        <Link to="/done-recipes">
          <button
            type="button"
            style={ { position: 'fixed' } }
            data-testid="finish-recipe-btn"
            disabled={ buttonDisabled }
          >
            {' '}
            Finalizar

          </button>
        </Link>)}
      </footer>
    </main>
  );
}

RecipeInfo.propTypes = {
  type: PropTypes.string.isRequired,
  recipe: PropTypes.isRequired,
  finishButton: PropTypes.bool.isRequired,

};

export default RecipeInfo;
