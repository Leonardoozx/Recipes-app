export const SEND_MEALS = 'SEND MEALS';
export const SEND_CATEGORIES = 'SEND_CATEGORIES';
export const SEARCH_BAR = 'SEARCH_BAR';

export const actSendMeals = (payload) => ({ type: SEND_MEALS, payload });

export const actSendCategories = { type: SEND_CATEGORIES };

export const actIsSearchBar = { type: SEARCH_BAR };

export const mealsThunk = (searchBarInput, searchCondition, type) => {
  const urlFoods = 'https://www.themealdb.com/api/json/v1/1/';
  const urlDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/';
  let URL = '';
  const key = type === '/foods' ? 'meals' : 'drinks';
  const LIMIT = 12;
  switch (searchCondition) {
  case 'Ingredient':
    URL = type === '/foods' ? `${urlFoods}filter.php?i=${searchBarInput}`
      : `${urlDrinks}filter.php?i=${searchBarInput}`;
    break;
  case 'Name':
    URL = type === '/foods' ? `${urlFoods}search.php?s=${searchBarInput}`
      : `${urlDrinks}search.php?s=${searchBarInput}`;
    break;
  default:
    URL = type === '/foods' ? `${urlFoods}search.php?f=${searchBarInput}`
      : `${urlDrinks}search.php?f=${searchBarInput}`;
    break;
  }
  return async (dispatch) => {
    let request = await fetch(URL).then((response) => response.json());
    if (!request[key]) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
      return;
    }
    request = { [key]: request[key].slice(0, LIMIT) };
    dispatch(actSendMeals(request));
  };
};

export const categoriesThunk = (category, type) => {
  let URL = '';
  const LIMIT = 12;
  console.log(category, type);
  switch (type) {
  case 'meals':
    URL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
    break;
  default:
    URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
    break;
  }
  return async (dispatch) => {
    let request = await fetch(URL).then((response) => response.json());
    request = { [type]: request[type].slice(0, LIMIT) };
    dispatch(actSendMeals(request));
  };
};
