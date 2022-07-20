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
  const recipeType = pathname.includes('food') ? 'Meals' : 'Drinks';
  useEffect(() => {
    const URL = type === '/foods'
      ? `${mealUrl}${Object.values(params)[0]}`
      : `${drinkUrl}${Object.values(params)[0]}`;
    const fetchRecipe = async () => {
      const request = await fetch(URL).then((response) => response.json());
      setRecipe(request);
    };
    fetchRecipe();
  }, []);
  console.log(recipe);
  return (
    <>
      {pathname.includes('food') ? <h1>Meal in Progress</h1>
        : <h1>Drink In Progress</h1>}
      { recipe[recipeType.toLowerCase()]
      && <RecipeInfo
        recipe={ recipe[recipeType.toLowerCase()][0] }
        finishButton
        checkbox
        type={ recipeType }
      />}
    </>
  );
}

const mapStateToProps = (state) => ({
  mealsAndDrinks: state.mealsReducer.recipes,
});

export default connect(mapStateToProps)(RecipeInProgress);
