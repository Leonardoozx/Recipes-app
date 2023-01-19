import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import renderWithRouterAndRedux from './Helpers/RenderWithRouterAndRedux';
import App from '../App';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import { captalizeTypes } from '../Components/RecipeDetailsInfo';
import { drinkMock, mealMock, storageDrinkIngredientsMock } from './Helpers/mocks';

const foodId = '53060';
const drinkId = '13837';

const mockMealFetch = () => {
  jest.spyOn(global, 'fetch')
    .mockImplementationOnce(() => Promise.resolve({
      json: () => Promise.resolve(mealMock),
    }))
    .mockImplementationOnce(() => Promise.resolve({
      json: () => Promise.resolve(drinkMock),
    }));
};

const mockDrinkFetch = () => {
  jest.spyOn(global, 'fetch')
    .mockImplementationOnce(() => Promise.resolve({
      json: () => Promise.resolve(drinkMock),
    }))
    .mockImplementationOnce(() => Promise.resolve({
      json: () => Promise.resolve(mealMock),
    }))
    .mockImplementationOnce(() => Promise.resolve({
      json: () => Promise.resolve(drinkMock),
    }))
    .mockImplementationOnce(() => Promise.resolve({
      json: () => Promise.resolve(mealMock),
    }))
    .mockImplementationOnce(() => Promise.resolve({
      json: () => Promise.resolve(drinkMock),
    }))
    .mockImplementationOnce(() => Promise.resolve({
      json: () => Promise.resolve(drinkMock),
    }))
    // .mockImplementationOnce(() => Promise.resolve({
    //   json: () => Promise.resolve(mealMock),
    // }))
    .mockImplementationOnce(() => Promise.resolve({
      json: () => Promise.resolve(drinkMock),
    }))
};



describe('Testing if the Recipe Details is being rendered correctly - meal', () => {
  beforeEach(mockMealFetch);
  afterEach(() => jest.clearAllMocks());
  it('tests if the meal details page is working correctly', async () => {
    await act(async () => {
      const { history } = renderWithRouterAndRedux(<App />, {}, `/foods/${foodId}`)

      expect(await screen.findByTestId('0-recomendation-title')).toHaveTextContent('Kir Royale');

      expect(await screen.findByTestId('recipe-title')).toBeInTheDocument();

      userEvent.click(screen.getByRole('button', { name: /start recipe/i }));

      history.push(`/foods/${foodId}`);

      userEvent.click(await screen.findByRole('button', { name: /continue recipe/i }))

      history.push(`/foods/${foodId}`);

      expect(history.location.pathname).toBe('/foods/53060');


      global.localStorage.clear();
    })
  });
});

describe('Testing if the Recipe Details is being rendered correctly - drink', () => {
  jest.clearAllMocks();
  beforeEach(mockDrinkFetch);
  afterEach(() => jest.clearAllMocks());
  it('tests if the drinks details page is working correctly', async () => {
    await act(async () => {
      const { history } = renderWithRouterAndRedux(<App />, {}, `/drinks/${drinkId}`)

      expect(await screen.findByTestId('recipe-title')).toBeInTheDocument();
      userEvent.click(screen.getByRole('button', { name: /start recipe/i }));
      expect(history.location.pathname).toBe('/drinks/13837/in-progress');
    })
  });
  it('Test if the drinks details page is working correctly - 2', async () => {
    await act(async () => {
      global.localStorage.setItem('recipeInProgress', JSON.stringify(storageDrinkIngredientsMock))
      const { history } = renderWithRouterAndRedux(<App />, {}, `/drinks/${drinkId}`)
      userEvent.click(await screen.findByRole('button', { name: /continue recipe/i }));
      expect(history.location.pathname).toBe('/drinks/13837/in-progress');
      const captalize = captalizeTypes('drinks', mealMock.meals)
      expect(typeof captalize).toBe('object');

    })
  })
})
