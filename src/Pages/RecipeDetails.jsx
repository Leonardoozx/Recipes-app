import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import RecipeCard from '../Components/RecipeCard';

function RecipeDetails() {
  // Referência: https://stackoverflow.com/questions/68892625/how-to-use-props-match-params
  const { id } = useParams();
  const { location: { pathname } } = useHistory();

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
  }, [pathname, id]);

  return (
    <div>
      { recipe.meals?.length > 0 && recipe.meals.map((x) => (
        <RecipeCard
          id={ +x.idMeal }
          key={ x.idMeal }
          thumb={ x.strMealThumb }
          name={ x.strMeal }
        />
      )) }
    </div>
  );
}

export default RecipeDetails;
