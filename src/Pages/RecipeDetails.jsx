import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import RecipeCard from '../Components/RecipeCard';
import RecipeInfo from '../Components/RecipeInfo';

function RecipeDetails() {
  // Referência: https://stackoverflow.com/questions/68892625/how-to-use-props-match-params
  const { id } = useParams();
  const { location: { pathname } } = useHistory();

  const [recipe, setRecipe] = useState([]);

  const mealUrl = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
  const drinkUrl = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

  const recipeType = pathname.split('/')[1];

  useEffect(() => {
    const [type] = pathname.split(/\/[0-9]/);
    const URL = type === '/foods' ? `${mealUrl}${id}` : `${drinkUrl}${id}`;
    const fetchRecipe = async () => {
      const request = await fetch(URL).then((response) => response.json());
      setRecipe(request);
    };
    fetchRecipe();
  }, [pathname, id]);

  // Referência: https://flexiple.com/javascript-capitalize-first-letter/
  const captalizeTypes = (x) => {
    const captalizedType = x.charAt(0).toUpperCase() + x.slice(1);
    const splitedType = captalizedType.split('');
    splitedType.pop();
    return splitedType.join('');
  };

  return (
    <div>
      { recipe[recipeType]?.length > 0 && recipe[recipeType].map((x) => {
        const type = captalizeTypes(recipeType);
        const thumb = `str${type}Thumb`;
        const recipeName = x[`str${type}`];
        return (
          <RecipeCard
            id={ +recipeName }
            key={ recipeName }
            thumb={ x[thumb] }
            name={ recipeName }
          />);
      })}

      {/* { recipe[recipeType]?.length > 0
        && recipe[recipeType].map((x) => (
          <RecipeInfo
            type={ recipeType }
            // key={ x[`str${splitedType.join('')}`] }
          />
        )) } */}
    </div>
  );
}

export default RecipeDetails;
