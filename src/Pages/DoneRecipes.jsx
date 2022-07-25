import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import ShareBtns from '../Components/ShareBtns';

function DoneRecipes() {
  const originRecipe = JSON.parse(localStorage.getItem('doneRecipes'));
  const [takeDoneRecipes, setTakeDoneRecipes] = useState([]);
  useEffect(() => {
    setTakeDoneRecipes(originRecipe);
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
          <div data-testid={ `${i}-horizontal-top-text` }>
           <p> { element?.alcoholicOrNot !== ''
          && element?.alcoholicOrNot } </p>
            {' '}
            -
          <p>  { element?.nationality } </p>
            {' '}
            -
            {' '}
            <p>{ element?.category } </p>
          </div>
          <Link to={ `./${element.type}s/${element.id}` }>
            <p data-testid={ `${i}-horizontal-name` }>{ element.name }</p>
          </Link>
          <p data-testid={ `${i}-horizontal-done-date` }>{ element.doneDate }</p>
          {element.tags !== '' && element.tags.map((element2) => (
            <p
              key={ element2 }
              data-testid={ `0-${element2}-horizontal-tag` }
            >
              { element2 }
            </p>
          ))}
          <ShareBtns
            type={ element.type }
            id={ element.id }
            favoriteBtn={ false }
            testId={ `${i}-horizontal-share-btn` }
          />
          <Link to={ `./${element.type}s/${element.id}` }>
            <img
              data-testid={ `${i}-horizontal-image` }
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
