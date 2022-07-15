export const SEND_MEALS = 'SEND MEALS';

export const actSendMeals = (payload) => ({ type: SEND_MEALS, payload });

export const mealsThunk = (searchBarInput, searchCondition) => {
  let URL = '';
  if (searchCondition === 'First letter' && searchBarInput.length >= 2) {
    global.alert('Your search must have only 1 (one) character');
  }
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
    if (request.meals === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
      return;
    }
    dispatch(actSendMeals(request));
  };
};
