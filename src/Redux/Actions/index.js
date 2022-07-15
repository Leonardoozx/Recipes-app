export const SEND_MEALS = 'SEND MEALS';

export const actSendMeals = (payload) => ({ type: SEND_MEALS, payload });

export const mealsThunk = (searchBarInput, searchCondition) => {
  let URL = '';
  switch (searchCondition) {
  case 'Ingredient':
    URL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchBarInput}`;
    break;
  case 'Name':
    URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchBarInput}`;
    break;
  default:
    URL = `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchBarInput}`;
    break;
  }
  return async (dispatch) => {
    const request = await fetch(URL).then((response) => response.json());
    dispatch(actSendMeals(request));
  };
};
