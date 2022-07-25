import { findByRole, findByTestId, fireEvent, screen, waitFor } from "@testing-library/react";
import React from "react";
import RecipeInProgress from "../Pages/RecipeInProgress";
import renderWithRouterAndRedux from "./Helpers/RenderWithRouterAndRedux";
import { drinkMock, favoriteDrink, mockDrinkFetch, mockMealFetch, doneDrinkMock, doneMealMock } from "./Helpers/mocks";
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';

const originalClipboard = { ...global.navigator.clipboard };

beforeEach(() => {
  let clipboardData = ''
  const mockClipboard = {
    writeText: jest.fn(
      (data) => { clipboardData = data }
    ),
    readText: jest.fn(
      () => { return clipboardData }
    ),
  };
  global.navigator.clipboard = mockClipboard;

});

afterEach(() => {
  jest.resetAllMocks();
  global.navigator.clipboard = originalClipboard;
}); // Solução encontrada no stackoverflow para testar se o texto é copiado para o clipboard. https://stackoverflow.com/a/67645603/19020048

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    drinkId: '13837',
    foodId: '52771',
  }),
})) // Não estava conseguindo testar a URL com a qual a requisição da API estava sendo feita porque parte da URL estava sendo definida pelo retorno do hook useParams(). Por isso pesquisei como poderia fazer um mock desse hook. Fonte: https://stackoverflow.com/questions/58117890/how-to-test-components-using-new-react-router-hooks/58206121#58206121

const initialState = { mealsReducer: {} }

describe('Tests Recipe In Progress Page with drink', () => {
  beforeEach(mockDrinkFetch);
  afterEach(() => jest.clearAllMocks());
  it('Tests if the recipe info is rendered', async () => {
    renderWithRouterAndRedux(<RecipeInProgress />, initialState, 'drinks/13837/in-progress');
    const drinkFetchURL = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=13837";
    expect(global.fetch).toHaveBeenCalledWith(drinkFetchURL)
    expect(await screen.findByTestId('recipe-photo')).toHaveAttribute('src', drinkMock.drinks[0].strDrinkThumb);
    expect(await screen.findByTestId('recipe-title')).toHaveTextContent(drinkMock.drinks[0].strDrink);
    expect(await screen.findByTestId('share-btn')).toBeDefined();
    expect(await screen.findByTestId('favorite-btn')).toBeDefined();
    expect(await screen.findByTestId('recipe-category')).toHaveTextContent(drinkMock.drinks[0].strAlcoholic);
    expect(await screen.findAllByTestId(/ingredient-step/)).toHaveLength(2);
    expect(await screen.findByTestId('instructions')).toHaveTextContent(drinkMock.drinks[0].strInstructions)
    expect(await screen.findByTestId('finish-recipe-btn')).toBeDefined();
    expect(await screen.findAllByRole('checkbox')).toHaveLength((await screen.findAllByTestId(/ingredient-step/)).length);
  })
  it('Tests if the progress is saved', async () => {
    renderWithRouterAndRedux(<RecipeInProgress />, initialState, 'drinks/13837/in-progress');
    expect((await screen.findAllByRole('checkbox'))[0]).not.toHaveAttribute('checked');
    fireEvent.click((await screen.findAllByRole('checkbox'))[0]);
    expect((await screen.findAllByRole('checkbox'))[0]).toHaveAttribute('checked');
    expect(JSON.parse(global.localStorage.getItem('inProgressRecipes')).cocktails['13837']).toHaveLength(1);
    fireEvent.click((await screen.findAllByRole('checkbox'))[0]);
    expect(JSON.parse(global.localStorage.getItem('inProgressRecipes')).cocktails['13837']).toHaveLength(0);
  });

  it('Tests the finish button', async () => {
    const { history } = renderWithRouterAndRedux(<RecipeInProgress />, initialState, 'drinks/13837/in-progress');
    expect(await screen.findByTestId('finish-recipe-btn')).toBeDisabled();
    expect(history.location.pathname).not.toBe('/done-recipes');
    const checkboxArr = await screen.findAllByRole('checkbox');
    checkboxArr.forEach((checkbox) => fireEvent.click(checkbox));
    expect(JSON.parse(global.localStorage.getItem('inProgressRecipes')).cocktails['13837']).toBeTruthy();
    expect(JSON.parse(global.localStorage.getItem('doneRecipes'))).toBeFalsy();
    expect(await screen.findByTestId('finish-recipe-btn')).not.toBeDisabled();
    fireEvent.click(await screen.findByTestId('finish-recipe-btn'));
    expect(JSON.parse(global.localStorage.getItem('inProgressRecipes')).cocktails['13837']).toBeFalsy;
    expect(JSON.parse(global.localStorage.getItem('doneRecipes'))).toBeTruthy();
    expect(history.location.pathname).toBe('/done-recipes');
    const doneRecipes = JSON.parse(global.localStorage.getItem('doneRecipes')); 
    expect(doneRecipes[0]).toStrictEqual(doneDrinkMock);

  })
})

describe('Tests Recipe In Progress Page with meal', () => {
  beforeEach(mockMealFetch);
  afterEach(() => jest.clearAllMocks());
  it('Tests if the recipe info is rendered', () => {
    renderWithRouterAndRedux(<RecipeInProgress />, initialState, '/foods/52771/in-progress');
    const mealFetchURL = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771';
    expect(global.fetch).toHaveBeenCalledWith(mealFetchURL);
  });
  it('Tests button finish', async () => {
    global.localStorage.clear();
    renderWithRouterAndRedux(<RecipeInProgress />, initialState, '/foods/53060/in-progress');
    const checkboxArr = await screen.findAllByRole('checkbox');
    checkboxArr.forEach((checkbox) => fireEvent.click(checkbox));
    fireEvent.click(await screen.findByTestId('finish-recipe-btn'));
    const doneRecipes = JSON.parse(global.localStorage.getItem('doneRecipes')); 
    expect(doneRecipes[0]).toStrictEqual(doneMealMock);

  })
})

describe('Tests share and favorite buttons', () => {
  beforeEach(mockDrinkFetch);
  afterEach(() => jest.clearAllMocks());
  it('Tests favorite button', async () => {
    global.localStorage.setItem('favoriteRecipes', JSON.stringify([favoriteDrink]));
    renderWithRouterAndRedux(<RecipeInProgress />, initialState, 'drinks/13837/in-progress');
    expect(await screen.findByTestId('favorite-btn')).toHaveAttribute('src', blackHeart);
    fireEvent.click(await screen.findByTestId('favorite-btn'));
    expect(await screen.findByTestId('favorite-btn')).toHaveAttribute('src', whiteHeart);
    expect(JSON.parse(global.localStorage.getItem('favoriteRecipes'))).toEqual([]);
    global.localStorage.clear();
    fireEvent.click(await screen.findByTestId('favorite-btn'));
    expect(JSON.parse(global.localStorage.getItem('favoriteRecipes'))).toHaveLength(1);
  });
  it('Tests share button', async () => {
    renderWithRouterAndRedux(<RecipeInProgress />, initialState, '/drinks/13837/in-progress');
    expect(screen.queryByText('Link copied!')).toBe(null);
    fireEvent.click(await screen.findByTestId('share-btn'));
    expect(navigator.clipboard.writeText).toBeCalled();
    expect(navigator.clipboard.readText()).toEqual('http://localhost:3000/drinks/13837');
    expect(screen.getByText('Link copied!')).toBeDefined();
  })
})