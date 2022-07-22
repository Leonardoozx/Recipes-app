import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from './Helpers/RenderWithRouterAndRedux';
import App from '../App';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import { captalizeTypes } from '../Components/RecipeDetailsInfo';
import { mealMock } from './Helpers/mocks';

const foodId = '53060';
const drinkId = '13837';

describe('Testing if the Recipe Details is being rendered correctly', () => {
  it('tests if the meal details page is working correctly', async () => {
    await act( async () => {
      const { history } = renderWithRouterAndRedux(<App />, {}, `/foods/${foodId}`)
      
      expect(await screen.findByTestId('recipe-title')).toBeInTheDocument();
      
      userEvent.click(screen.getByRole('button', { name: /start recipe/i }));
      
      history.push(`/foods/${foodId}`);
      
      userEvent.click(await screen.findByRole('button', { name: /continue recipe/i }))

      history.push(`/foods/${foodId}`);

      expect(history.location.pathname).toBe('/foods/53060');
    })
  });

  it('tests if the drinks details page is working correctly', async () => {
    await act( async () => {
      const { history } = renderWithRouterAndRedux(<App />, {}, `/drinks/${drinkId}`)
      
      expect(await screen.findByTestId('recipe-title')).toBeInTheDocument();
      
      userEvent.click(screen.getByRole('button', { name: /start recipe/i }));
      
      history.push(`/drinks/${drinkId}`);
      
      userEvent.click(await screen.findByRole('button', { name: /continue recipe/i }))

      history.push(`/drinks/${drinkId}`);

      expect(history.location.pathname).toBe('/drinks/13837');
    })
  });
});
