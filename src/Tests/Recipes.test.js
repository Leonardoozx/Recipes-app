import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './Helpers/RenderWithRouterAndRedux';
import Recipes from '../Pages/Recipes';

describe('Testes da página Foods.js', () => {

  test('Verifica estado inicial', async () => {
    renderWithRouterAndRedux(<Recipes title="Foods" />);

    await waitFor(() => {
      expect(screen.getByTestId('11-recipe-card')).toBeInTheDocument();
    });
  });

  test('Verifica estado inicial', async () => {
    renderWithRouterAndRedux(<Recipes title="Drinks"  />);

    const drinkButton = screen.getByTestId('drinks-bottom-btn');

    await waitFor(() => {
      userEvent.click(drinkButton);
      expect(screen.getAllByRole('article')).toHaveLength(12);
    });
  })

  test('Verifica header com título e searchBar', async () => {
    renderWithRouterAndRedux(<Recipes title="Foods" />);

    const showSearch = screen.getByTestId('search-top-btn');

    userEvent.click(showSearch);

    const inputSearch = screen.getByTestId('search-input');
    const firstLetterRadio = screen.getByTestId('first-letter-search-radio');
    const buttonSearch = screen.getByTestId('exec-search-btn');

    userEvent.click(firstLetterRadio);
    userEvent.type(inputSearch, 'b');

    await waitFor(() => {
      userEvent.click(buttonSearch);
      expect(screen.getAllByRole('article')).toHaveLength(12);
    });
    
    expect(screen.queryByRole('heading', { name: 'Foods', level: 1 }));
  })
})