import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import ShareBtns from '../Components/ShareBtns';
import '../CSS/recommendation.css';

function RecipeDetails() {
  // Referência: https://stackoverflow.com/questions/68892625/how-to-use-props-match-params
  const { id } = useParams();
  const { location: { pathname } } = useHistory();
  let index = 0;

  const [recipe, setRecipe] = useState([]);
  const [recommendation, setRecommendation] = useState([]);

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

  // Recommendation card
  useEffect(() => {
    const drinksUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const mealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const [type] = pathname.split(/\/[0-9]/);
    const recommendationType = type.includes('foods') ? 'drinks' : 'meals';
    const URL = type !== '/foods' ? mealsUrl : drinksUrl;

    const recomendationFetch = async () => {
      const request = await fetch(URL).then((x) => x.json());
      const RECOMMENDATION_LIMIT = 6;
      setRecommendation(request[recommendationType].slice(0, RECOMMENDATION_LIMIT));
    };
    recomendationFetch();
  }, [id, pathname]);

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
              <RecipeDetailsInfo />
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
              <p data-testid="recipe-category">
                { x.idMeal ? x.strCategory : 'Alcoholic' }
              </p>
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
              <p data-testid="instructions">{x.strInstructions}</p>

              <div className="recommendation">

                { x.idMeal
                  ? (
                  // <div>
                  //   bebidas
                  // </div>
                    recommendation.map((rec, recIndex) => {
                      const {
                        recipeName: drinkName,
                        thumb: drinkThumb,
                        type: drinkType } = captalizeTypes('drinks', rec);
                      return (
                        <div
                          data-testid={ `${recIndex}-recomendation-card` }
                          key={ rec[`id${drinkType}`] }
                          className="recommendation-content"
                        >
                          <img
                            style={ { width: '120px' } }
                            src={ rec[drinkThumb] }
                            alt=""
                          />
                          <p data-testid={ `${recIndex}-recomendation-title` }>
                            {drinkName}
                          </p>
                        </div>
                      );
                    })
                  )
                  : (
                    recommendation.map((rec, recIndex) => {
                      const {
                        recipeName: mealName,
                        thumb: mealThumb,
                        type: mealType } = captalizeTypes('meals', rec);
                      return (
                        <div
                          data-testid={ `${recIndex}-recomendation-card` }
                          className="recommendation-content"
                          key={ rec[`id${mealType}`] }
                        >
                          <img
                            style={ { width: '120px' } }
                            src={ rec[mealThumb] }
                            alt=""
                          />
                          <p data-testid={ `${recIndex}-recomendation-title` }>
                            {mealName}
                          </p>
                        </div>
                      );
                    })
                  )}
              </div>
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
