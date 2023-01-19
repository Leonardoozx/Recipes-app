import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import ShareBtns from './ShareBtns';
import '../CSS/recipeDetails.css';

export const captalizeTypes = (type, recipe) => {
  const captalizedType = type.charAt(0).toUpperCase() + type.slice(1);
  const splitedType = captalizedType.split('');
  splitedType.pop();
  const thumb = `str${splitedType.join('')}Thumb`;
  const recipeName = recipe[`str${splitedType.join('')}`];
  return { thumb, recipeName, type: splitedType.join('') };
};

function RecipeDetailsInfo({ x, y }) {
  const { location: { pathname } } = useHistory();
  const [recommendation, setRecommendation] = useState([]);

  useEffect(() => {
    const drinksUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const mealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const [type] = pathname.split(/\/[0-9]/);
    const recommendationType = type.includes('foods') ? 'drinks' : 'meals';
    const URL = type !== '/foods' ? mealsUrl : drinksUrl;

    const recomendationFetch = async () => {
      const request = await fetch(URL).then((response) => response.json());
      const RECOMMENDATION_LIMIT = 6;
      setRecommendation(request[recommendationType].slice(0, RECOMMENDATION_LIMIT));
    };
    recomendationFetch();
  }, [pathname]);

  // Referência: https://flexiple.com/javascript-capitalize-first-letter/

  const recipeType = pathname.includes('food') ? 'meals' : 'drinks';
  const { thumb, recipeName, type } = captalizeTypes(recipeType, x);
  const storageType = pathname.includes('food') ? 'food' : 'drink';

  const recipeEntries = Object.entries(x);

  const measureUnitsArr = recipeEntries.map(([isMeasurement, measurement]) => (
    isMeasurement.includes('strMeasure') && measurement !== '' ? measurement : ''))
    .filter((a) => a !== '' && a !== ' ');

  let index = 0;
  return (
    <div
      className="flex flex-col justify-center items-center md:w-100"
      key={ y }
    >
      <div className="flex flex-row items-center">
        <div className="w-full">
          <img
            className="w-80"
            data-testid="recipe-photo"
            src={ x[thumb] }
            alt={ recipeName }
          />
        </div>
        <div>
          <ShareBtns
            image={ x[thumb] }
            name={ recipeName }
            id={ x[`id${type}`] }
            alcoholicOrNot={ storageType === 'drink' ? x.strAlcoholic : '' }
            category={ x.strCategory }
            type={ storageType }
            nationality={ storageType === 'drink' ? '' : x.strArea }
            favoriteBtn
            testId="share-btn"
          />
        </div>
      </div>
      <h1 data-testid="recipe-title">{recipeName}</h1>
      <h4 data-testid="recipe-category">
        { x.idMeal ? x.strCategory : 'Alcoholic' }
      </h4>
      <div className="flex flex-col items-center">
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
      <div className="w-4/5 text-center">
        <p data-testid="instructions">{x.strInstructions}</p>
      </div>

      <div className="recommendation">

        { x.idMeal
          ? (
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
                    src={ rec[drinkThumb] }
                    alt=""
                    // className="object-cover h-full w-full lg:mr-20"
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
}

RecipeDetailsInfo.propTypes = {
  x: PropTypes.objectOf(PropTypes.string).isRequired,
  y: PropTypes.number.isRequired,
};

export default RecipeDetailsInfo;
