import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import ShareBtns from '../Components/ShareBtns';

function DoneRecipes() {
  const originRecipe = JSON.parse(localStorage.getItem('doneRecipes'));
  const [takeDoneRecipes, setTakeDoneRecipes] = useState([]);
  useEffect(() => {
    const setDoneRecipes = () => {
      setTakeDoneRecipes(originRecipe);
    };
    setDoneRecipes();
  }, []);
  function takeAllRecipes() {
    setTakeDoneRecipes(originRecipe);
  }
  function takeDrinkRecipes() {
    const drinks = originRecipe.filter((el) => el.type === 'drink');
    setTakeDoneRecipes(drinks);
  }
  function takeFoodRecipes() {
    const foods = originRecipe.filter((el) => el.type === 'food');
    setTakeDoneRecipes(foods);
  }

  function getTestId(string, index, element2) {
    if (element2) { return `0-${element2}-horizontal-tag`; }
    return `${index}${string}`;
  }
  function getPath(element) {
    return `./${element.type}s/${element.id}`;
  }
  return (
    <div>
      <Header renderButton={ false } title="Done Recipes" />
      <button
        data-testid="filter-by-all-btn"
        type="button"
        onClick={ takeAllRecipes }
      >
        All
      </button>
      <button
        data-testid="filter-by-food-btn"
        type="button"
        onClick={ takeFoodRecipes }
      >
        Food
      </button>
      <button
        data-testid="filter-by-drink-btn"
        type="button"
        onClick={ takeDrinkRecipes }
      >
        Drinks
      </button>
      { takeDoneRecipes?.length > 0
      && takeDoneRecipes?.map((element, i) => (
        <div key={ element.id }>
          <div data-testid={ getTestId('-horizontal-top-text', i) }>
            <p>
              {' '}
              { element?.alcoholicOrNot !== ''
          && element?.alcoholicOrNot }
              {' '}

            </p>
            {' '}
            -
            <p>
              {' '}
              { element?.nationality }
              {' '}
            </p>
            {' '}
            -
            {' '}
            <p>
              { element?.category }
              {' '}
            </p>
          </div>
          <Link to={ getPath(element) }>
            <p data-testid={ getTestId('-horizontal-name', i) }>{ element.name }</p>
          </Link>
          <p data-testid={ getTestId('-horizontal-done-date', i) }>
            { element.doneDate }
          </p>
          {element.tags !== '' && element.tags.map((element2) => (
            <p
              key={ element2 }
              data-testid={ getTestId('opa', i, element2) }
            >
              { element2 }
            </p>
          ))}
          <ShareBtns
            type={ element.type }
            id={ element.id }
            favoriteBtn={ false }
            testId={ getTestId('-horizontal-share-btn', i) }
          />
          <Link to={ getPath(element) }>
            <img
              data-testid={ getTestId('-horizontal-image', i) }
              src={ element.image }
              alt={ element.name }
              style={ { width: '200px' } }
            />
          </Link>
        </div>
      ))}
    </div>
  );
}

export default DoneRecipes;
