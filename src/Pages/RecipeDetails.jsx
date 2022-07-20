import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import ShareBtns from '../Components/ShareBtns';

function RecipeDetails() {
  // Referência: https://stackoverflow.com/questions/68892625/how-to-use-props-match-params
  const { id } = useParams();
  const { location: { pathname } } = useHistory();
  let index = 0;

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

  // Referência: https://flexiple.com/javascript-capitalize-first-letter/
  const captalizeTypes = (type, x) => {
    const captalizedType = type.charAt(0).toUpperCase() + type.slice(1);
    const splitedType = captalizedType.split('');
    splitedType.pop();
    const thumb = `str${splitedType.join('')}Thumb`;
    const recipeName = x[`str${splitedType.join('')}`];
    return { thumb, recipeName, type: splitedType.join('') };
  };

  const recipeType = pathname.includes('food') ? 'meals' : 'drinks';

  return (
    <div>
      { recipe[recipeType]?.length > 0
        && recipe[recipeType].map((x, y) => {
          const { thumb, recipeName, type } = captalizeTypes(recipeType, x);
          const recipeEntries = Object.entries(x);
          const measureUnitsArr = recipeEntries.map(([isMeasurement, measurement]) => (
            isMeasurement.includes('strMeasure')
            && measurement !== '' ? measurement : ''))
            .filter((a) => a !== '' && a !== ' ');
          const storageType = pathname.includes('food') ? 'food' : 'drink';
          return (
            <div key={ y }>
              <img
                data-testid="recipe-photo"
                src={ x[thumb] }
                alt={ recipeName }
                style={ { width: '200px' } }
              />

              <ShareBtns
                image={ x[thumb] }
                name={ recipeName }
                id={ x[`id${type}`] }
                alcoholicOrNot={ storageType === 'drink' ? x.strAlcoholic : '' }
                category={ x.strCategory }
                type={ storageType }
                nationality={ storageType === 'drink' ? '' : x.strArea }
              />

              <h1 data-testid="recipe-title">{recipeName}</h1>
              <p data-testid="recipe-category">{x.strCategory}</p>
              <div>
                { recipeEntries.map(([isIngredient, ingredient]) => {
                  if (isIngredient.includes('strIngredient') && ingredient) {
                    index += 1;
                  }
                  return (
                    isIngredient.includes('strIngredient') && ingredient && (
                      <p
                        data-testid={ `${index - 1}-ingredient-name-and-measure` }
                        key={ isIngredient }
                      >
                        {`${ingredient} - ${measureUnitsArr[index - 1]}`}

                      </p>));
                })}
              </div>
              <div>
                { recipe[recipeType]?.length > 0
                && (
                  <p data-testid="instructions">
                    {recipe[recipeType][0].strInstructions}
                  </p>)}
              </div>
            </div>
          );
        }) }
      {/* { recipe[recipeType]?.length > 0
         && (
           <iframe
             src="https://www.youtube.com/watch?v=C5J39YnnPsg"
             title="YouTube video player"
             allowFullScreen
           />
         )} */}
    </div>
  );
}

export default RecipeDetails;
