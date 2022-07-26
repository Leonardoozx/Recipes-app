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

  function getTestId(string, i, element2) {
    if (element2) { return `0-${element2}-horizontal-tag`; }
    return `${i}${string}`;
  }
  function getPath(element) {
    return `./${element.type}s/${element.id}`;
  }
  return (
    <div className="flex flex-col items-center bg-[url('https://tinyurl.com/29b4cyrp')] bg-cover">
      <Header renderButton={ false } title="Done Recipes" />
      <div className="flex flex-row space-x-5">
        <button
          className="bg-[#9a0000] py-1 px-4 rounded border-2 border-[#302d2d] text-white"
          data-testid="filter-by-all-btn"
          type="button"
          onClick={ takeAllRecipes }
        >
          All
        </button>
        <button
          className="bg-[#9a0000] py-1 px-3 rounded border-2 border-[#302d2d] text-white"
          data-testid="filter-by-food-btn"
          type="button"
          onClick={ takeFoodRecipes }
        >
          Food
        </button>
        <button
          className="bg-[#9a0000] py-1 px-3 rounded border-2 border-[#302d2d] text-white"
          data-testid="filter-by-drink-btn"
          type="button"
          onClick={ takeDrinkRecipes }
        >
          Drinks
        </button>
      </div>
      { takeDoneRecipes?.length > 0
      && takeDoneRecipes?.map((element, i) => (
        <div className="mb-10" key={ element.id }>
          <div
            className="flex flex-col items-center"
            data-testid={ getTestId('-horizontal-top-text', i) }
          >
            <h2
              className="decoration-"
              data-testid={ getTestId('-horizontal-name', i) }
            >
              { element.name }
            </h2>
            <h3>
              { element?.alcoholicOrNot !== ''
          && element?.alcoholicOrNot }
            </h3>
            {' '}
            <h3>
              {' '}
              { element?.nationality }
              {' '}
            </h3>
            {' '}
            {' '}
            <h3>
              { element?.category }
              {' '}
            </h3>
          </div>
          <div className="flex flex-col items-center">
            <p
              data-testid={ getTestId('-horizontal-done-date', i) }
            >
              { element.doneDate }

            </p>
            {element.tags !== '' && element.tags.map((element2) => (
              <p
                key={ element2 }
                data-testid={ getTestId('a', i, element2) }
              >
                { element2 }
              </p>

            ))}
          </div>
          <div className="flex justify-center">
            <Link to={ getPath(element) }>
              <img
                data-testid={ getTestId('-horizontal-image', i) }
                src={ element.image }
                alt={ element.name }
                style={ { width: '200px' } }
              />
            </Link>
            <ShareBtns
              type={ element.type }
              id={ element.id }
              favoriteBtn={ false }
              testId={ getTestId('-horizontal-share-btn', i) }
            />
          </div>
        </div>

      ))}
    </div>
  );
}

export default DoneRecipes;
