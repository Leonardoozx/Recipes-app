import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import RecipeInfo from '../Components/RecipeInfo';

function RecipeInProgress() {
  const params = useParams();
  const { location: { pathname } } = useHistory();
  const [recipe, setRecipe] = useState([]);
  const mealUrl = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
  const drinkUrl = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
  const [type] = pathname.split(/\/[0-9]/);
  const recipeType = pathname.includes('drink') ? 'Drinks' : 'Meals';
  useEffect(() => {
    const URL = type === '/foods'
      ? `${mealUrl}${params.foodId}`
      : `${drinkUrl}${params.drinkId}`;
    const fetchRecipe = async () => {
      const request = await fetch(URL).then((response) => response.json());
      setRecipe(request);
    };
    fetchRecipe();
  }, [params.drinkId, params.foodId, type]);
  return (
    <div>
      { recipe[recipeType.toLowerCase()]
      && <RecipeInfo
        recipe={ recipe[recipeType.toLowerCase()][0] }
        finishButton
        checkbox
        type={ recipeType }
      />}
    </div>
  );
}

const mapStateToProps = (state) => ({
  mealsAndDrinks: state.mealsReducer.recipes,
});

export default connect(mapStateToProps)(RecipeInProgress);
