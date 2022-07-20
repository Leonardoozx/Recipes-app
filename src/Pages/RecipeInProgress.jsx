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
  const convertString = pathname.split('/')[1];
  const recipeType = convertString.charAt(0).toUpperCase() + convertString.slice(1);
  useEffect(() => {
    const URL = type === '/foods'
      ? `${mealUrl}${Object.values(params)[0]}`
      : `${drinkUrl}${Object.values(params)[0]}`;
    console.log(URL);
    const fetchRecipe = async () => {
      const request = await fetch(URL).then((response) => response.json());
      setRecipe(request);
    };
    fetchRecipe();
  }, [params, type]);

  return (
    <>
      {pathname.includes('food') ? <h1>Comidas em Progresso</h1>
        : <h1>Bebidas em Progresso</h1>}
      { recipe[recipeType.toLowerCase()]
      && <RecipeInfo
        recipe={ recipe[recipeType.toLowerCase()][0] }
        finishButton
        type={ recipeType }
      />}
    </>
  );
}

const mapStateToProps = (state) => ({
  mealsAndDrinks: state.mealsReducer.recipes,
});

export default connect(mapStateToProps)(RecipeInProgress);
