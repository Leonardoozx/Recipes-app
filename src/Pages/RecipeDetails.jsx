import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import RecipeDetailsInfo from '../Components/RecipeDetailsInfo';

function RecipeDetails() {
  // Referência: https://stackoverflow.com/questions/68892625/how-to-use-props-match-params
  const { id } = useParams();
  const history = useHistory();
  const { location: { pathname } } = history;

  const [recipe, setRecipe] = useState([]);
  const [startBtnKey, setStartBtnKey] = useState(0);

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
    return (setRecipe([]));
  }, [pathname, id]);

  const recipeType = pathname.includes('food') ? 'meals' : 'drinks';

  const startedRecipes = JSON.parse(localStorage.getItem('startedRecipes')) || [];

  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes')) || [];

  const onStartRecipeBtnClick = ({ target: { name } }) => {
    if (inProgressRecipes.some((x) => x === name)) {
      history.push(`${pathname}/in-progress`);
      return;
    }
    if (startedRecipes.some((x) => x === name)) {
      setStartBtnKey((x) => x + 1);
      return;
    }
    history.push(`${pathname}/in-progress`);
    console.log(name);
    setStartBtnKey((x) => x + 1);
    localStorage.setItem('inProgressRecipes',
      JSON.stringify([...inProgressRecipes, name]));
    localStorage.setItem('startedRecipes', JSON.stringify([...startedRecipes, name]));
  };

  return (
    <div>
      { recipe[recipeType]?.length > 0
        && recipe[recipeType].map((x, y) => {
          const progressRecipe = inProgressRecipes.some((proReci) => (
            proReci === x[`id${pathname.includes('foods')
              ? 'Meal' : 'Drink'}`]));
          return (

            <div key={ y }>
              <RecipeDetailsInfo x={ x } y={ y } />
              {
                (!startedRecipes.some((name) => name === x[`id${pathname.includes('foods')
                  ? 'Meal' : 'Drink'}`]) || progressRecipe)
                && (
                  <button
                    data-testid="start-recipe-btn"
                    key={ startBtnKey }
                    className="start-recipe-btn"
                    type="button"
                    name={
                      recipe[recipeType][0][`id${pathname.includes('foods')
                        ? 'Meal' : 'Drink'}`]
                    }
                    onClick={ onStartRecipeBtnClick }
                  >
                    { inProgressRecipes.some((reci) => (
                      reci === x[`id${pathname.includes('foods') ? 'Meal' : 'Drink'}`]))
                      ? 'Continue Recipe' : 'Start Recipe' }
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
