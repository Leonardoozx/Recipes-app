import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import RecipeDetailsInfo from '../Components/RecipeDetailsInfo';
import '../CSS/recipeDetails.css';

function RecipeDetails() {
  // Referência: https://stackoverflow.com/questions/68892625/how-to-use-props-match-params
  const { id } = useParams();
  const { location: { pathname } } = useHistory();
  const [recipe, setRecipe] = useState([]);

  useEffect(() => {
    const mealUrl = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
    const drinkUrl = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
    const [type] = pathname.split(/\/[0-9]/);
    const URL = type === '/foods' ? `${mealUrl}${id}` : `${drinkUrl}${id}`;
    const fetchRecipe = async () => {
      const request = await fetch(URL).then((response) => response.json());
      setRecipe(request);
    };
    fetchRecipe();
  }, [pathname, id]);

  const recipeType = pathname.includes('food') ? 'meals' : 'drinks';

  return (
    <div>
      { recipe[recipeType]?.length > 0
        && recipe[recipeType].map((x, y) => (
          <div key={ y }><RecipeDetailsInfo x={ x } y={ y } /></div>)) }
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
      <button id="start-recipe-btn" type="button">Start Recipe</button>
    </div>
  );
}

export default RecipeDetails;
