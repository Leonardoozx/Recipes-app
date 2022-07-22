import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import RecipeDetailsInfo, { captalizeTypes } from '../Components/RecipeDetailsInfo';

function RecipeDetails() {
  // Referência: https://stackoverflow.com/questions/68892625/how-to-use-props-match-params
  const { id } = useParams();
  const history = useHistory();
  const { location: { pathname } } = history;

  const [recipe, setRecipe] = useState([]);
  const mealUrl = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
  const drinkUrl = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

  useEffect(() => {
    const [type] = pathname.split(/\/[0-9]/);
    const URL = type === '/foods' ? `${mealUrl}${id}` : `${drinkUrl}${id}`;
    const fetchRecipe = async () => {
      const request = await fetch(URL).then((response) => response.json());
      setRecipe(request);
    };
    fetchRecipe();
    return setRecipe([]);
  }, [pathname, id]);

  const recipeType = pathname.includes('food') ? 'meals' : 'drinks';

  const startedRecipes = JSON.parse(localStorage.getItem('startedRecipes')) || [];

  const storageRecipeType = pathname.includes('food') ? 'meals' : 'cocktails';
  const onStartRecipeBtnClick = ({ target: { name } }) => {
    localStorage.setItem('startedRecipes', JSON.stringify([...startedRecipes, name]));
    const inProgressIngredients = JSON.parse(localStorage.getItem('inProgressRecipes'))
    || { [storageRecipeType]: { [name]: [] } };
    const progressRecipes = { ...inProgressIngredients,
      [storageRecipeType]: { ...inProgressIngredients[storageRecipeType], [name]: [] } };
    localStorage.setItem('inProgressRecipes', JSON.stringify(progressRecipes));

    const { type } = captalizeTypes(recipeType, recipe[recipeType][0]);
    const isInProgress = Object.keys(inProgressIngredients[storageRecipeType])
      .some((recIn) => (
        recIn === recipe[recipeType][0][`id${type}`]));

    if (isInProgress) {
      history.push(`${pathname}/in-progress`);
    }

    // history.push(`${pathname}/in-progress`);
    // setStartBtnKey((x) => x + 1);
  };

  return (
    <div>
      { recipe[recipeType]?.length > 0
        && recipe[recipeType].map((x, y) => {
          const progressRecipes = JSON.parse(
            localStorage.getItem('inProgressRecipes'),
          ) || {};
          let inProgress;
          if (Object.keys(progressRecipes).length > 0
          && progressRecipes[storageRecipeType]) {
            const isInProgress = Object.keys(progressRecipes[storageRecipeType])
              .some((recIn) => (
                recIn === x[`id${pathname.includes('foods') ? 'Meal' : 'Drink'}`]));
            inProgress = isInProgress;
          }
          const hasStarted = startedRecipes.some((name) => (
            name === x[`id${pathname.includes('foods') ? 'Meal' : 'Drink'}`]));
          return (

            <div key={ y }>
              <RecipeDetailsInfo x={ x } y={ y } />
              {
                (!hasStarted || inProgress)
                && (
                  <button
                    data-testid="start-recipe-btn"
                    className="start-recipe-btn"
                    type="button"
                    name={
                      recipe[recipeType][0][`id${pathname.includes('foods')
                        ? 'Meal' : 'Drink'}`]
                    }
                    onClick={ onStartRecipeBtnClick }
                  >
                    { inProgress ? 'Continue Recipe' : 'Start Recipe' }
                  </button>)
              }
            </div>
          );
        }) }
      { recipe.meals
         && (
      // Referências:
      // como usar iFrame (eu tava completamente perdido): https://dequeuniversity.com/rules/axe/4.3/video-caption
      // o que fazia o dar a mensagem 'www.youtube.com refused to connect' e como solucionar: https://forum.freecodecamp.org/t/youtube-refused-to-connect/245262
           <iframe
             data-testid="video"
             src={ recipe.meals[0].strYoutube.replace('watch?v=', '/embed/') }
             title="YouTube video player"
             frameBorder="0"
             allowFullScreen
           />
         )}
    </div>
  );
}

export default RecipeDetails;
