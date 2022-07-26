import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import ShareBtns from './ShareBtns';

function RecipeInfo(props) {
  const { location: { pathname } } = useHistory();
  const [doneIngredients, setIngredient] = useState([]);
  const [buttonDisabled, changeButtonStatus] = useState(true);
  const { type, recipe, finishButton } = props;
  const recipeType = type.replace('s', '');
  const recipeId = recipe[`id${recipeType}`];
  const recipeTypePlural = pathname.includes('food') ? 'meals' : 'cocktails';

  useEffect(() => {
    function resumeRecipe() {
      const savedIngredients = JSON.parse(
        localStorage.getItem('inProgressRecipes'),
      ) || { [recipeTypePlural]: { [recipeId]: [] } };
      const ingredients = savedIngredients[recipeTypePlural] || [];
      setIngredient(ingredients[recipeId] || []);
    }
    resumeRecipe();
  }, [recipeId, recipeTypePlural]);

  useEffect(() => {
    function activateFinishButton() {
      Object.keys(recipe).forEach((key) => {
        if (key.includes('strIngredient') && recipe[key]) {
          changeButtonStatus(doneIngredients.every((item) => item !== key));
        }
      });
    }
    activateFinishButton();
  }, [recipe, doneIngredients]);

  function checkedBox(id) {
    return doneIngredients.some((ingredient) => ingredient === id);
  }
  const saveIngredient = (target) => {
    const ingredient = [...doneIngredients];
    const savedIngredients = JSON.parse(localStorage.getItem('inProgressRecipes')) || {
      [recipeTypePlural]: {
        [recipeId]: [],
      },
    };
    if (doneIngredients.every((el) => el !== target.id)) {
      const inProgressRecipes = {
        ...savedIngredients,
        [recipeTypePlural]: {
          ...savedIngredients[recipeTypePlural],
          [recipeId]: [...doneIngredients, target.id],
        },
      };
      localStorage.setItem(
        'inProgressRecipes', JSON.stringify(inProgressRecipes),
      );
      setIngredient([...doneIngredients, target.id]);
      return;
    }
    const filteredArray = ingredient.filter((ingr) => ingr !== target.id);
    setIngredient(filteredArray);
    localStorage.setItem(
      'inProgressRecipes', JSON.stringify({
        ...savedIngredients,
        [recipeTypePlural]: {
          ...savedIngredients[recipeTypePlural],
          [recipeId]: filteredArray,
        },
      }),
    );
  };

  const finishRecipe = () => {
    console.log(typeof recipe.strTags);
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    const today = new Date().toLocaleDateString();
    const newRecipe = {
      image: recipe[`str${recipeType}Thumb`],
      name: recipe[`str${recipeType}`],
      id: recipeId,
      alcoholicOrNot: recipeType.toLowerCase() === 'drink' ? recipe.strAlcoholic : '',
      category: recipe.strCategory,
      type: recipeType === 'Meal' ? 'food' : 'drink',
      nationality: recipeType.toLowerCase() === 'drink' ? '' : recipe.strArea,
      tags: typeof recipe.strTags === 'string' ? recipe.strTags.split(',') : '',
      doneDate: today,
    };
    localStorage.setItem('doneRecipes', JSON.stringify([...doneRecipes, newRecipe]));
    const savedIngredients = JSON.parse(localStorage.getItem('inProgressRecipes'));
    delete savedIngredients[recipeTypePlural][recipeId];
    localStorage.setItem('inProgressRecipes', JSON.stringify(savedIngredients));
  };
  let index = 0;

  return (
    <main className="flex flex-col items-center">
      <h1 data-testid="recipe-title">{recipe[`str${recipeType}`]}</h1>
      <div className="flex">
        <img
          data-testid="recipe-photo"
          src={ recipe[`str${recipeType}Thumb`] }
          alt={ `${recipeType}` }
          className="recipe-card img w-72 mb-3"
        />
        <ShareBtns
          favoriteBtn
          image={ recipe[`str${recipeType}Thumb`] }
          name={ recipe[`str${recipeType}`] }
          id={ recipeId }
          alcoholicOrNot={ recipeType.toLowerCase() === 'drink'
            ? recipe.strAlcoholic : '' }
          category={ recipe.strCategory }
          type={ recipeType === 'Meal' ? 'food' : 'drink' }
          nationality={ recipeType.toLowerCase() === 'drink' ? '' : recipe.strArea }
          testId="share-btn"
        />
      </div>
      <h4 data-testid="recipe-category">
        {recipeType === 'Meal' ? recipe.strCategory : recipe.strAlcoholic}
      </h4>
      {Object.keys(recipe).map((key) => {
        if (key.includes('strIngredient') && recipe[key]) {
          index += 1;
          return (
            <div>

              { checkedBox(key)
                ? (
                  <label
                    data-testid={ `${index - 1}-ingredient-step` }
                    key={ key }
                    style={ { textDecoration: 'line-through' } }
                    htmlFor={ key }
                  >
                    {recipe[key]}
                    <input
                      id={ key }
                      type="checkbox"
                      onChange={ ({ target }) => saveIngredient(target) }
                      defaultChecked
                    />
                  </label>)

                : (
                  <label
                    data-testid={ `${index - 1}-ingredient-step` }
                    key={ key }
                    htmlFor={ key }
                  >
                    {recipe[key]}

                    <input
                      id={ key }
                      type="checkbox"
                      checked={ checkedBox(key) }
                      onChange={ ({ target }) => saveIngredient(target) }
                    />
                  </label>
                )}
            </div>
          );
        }
        return null;
      })}
      <article className="mb-20" data-testid="instructions">
        {recipe.strInstructions}
      </article>
      <footer style={ { backgroundColor: 'transparent' } }>
        {finishButton
      && (
        <Link to="/done-recipes">
          <button
            type="button"
            className="start-recipe-btn mt-5 bg-[#9c330d] text-white"
            data-testid="finish-recipe-btn"
            disabled={ buttonDisabled }
            onClick={ finishRecipe }
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
  recipe: PropTypes.objectOf(PropTypes.string).isRequired,
  finishButton: PropTypes.bool.isRequired,
};

export default RecipeInfo;
