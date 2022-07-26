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
    const { history } = renderWithRouterAndRedux(<Recipes title="Foods" />);
    history.push('/foods');

    const showSearch = screen.getByTestId('search-top-btn');

    userEvent.click(showSearch);

    const inputSearch = screen.getByTestId('search-input');
    const firstLetterRadio = screen.getByTestId('first-letter-search-radio');
    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    const buttonSearch = screen.getByTestId('exec-search-btn');

    userEvent.click(firstLetterRadio);
    userEvent.type(inputSearch, 'b');

    await waitFor(() => {
      userEvent.click(buttonSearch);
      expect(screen.getAllByRole('article')).toHaveLength(12);
    });

    userEvent.click(ingredientRadio);
    userEvent.type(inputSearch, 'anana');

    await waitFor(() => {
      userEvent.click(buttonSearch);
      expect(screen.getAllByRole('article')).toHaveLength(3);
    });
    
    expect(screen.queryByRole('heading', { name: 'Foods', level: 1 }));
  });

  test('Verifica filtro por categorias', async () => {
    const { history } = renderWithRouterAndRedux(<Recipes title="Foods" />);
    history.push('/foods');
    await waitFor(() => {
      expect(screen.getAllByTestId(/-category-filter/i)).toHaveLength(6);
      const button = screen.queryByTestId('Beef-category-filter');
      userEvent.click(button);
    });
    
    await waitFor(() => {
      expect(screen.getByText(/Beef and Mustard Pie/i)).toBeInTheDocument();
    });

    history.push('/drinks');
    await waitFor(() => {
      expect(screen.getAllByTestId(/-category-filter/i)).toHaveLength(6);
      const button = screen.queryByTestId('Cocktail-category-filter');
      userEvent.click(button);
    });
    
    await waitFor(() => {
      expect(screen.getByText(/155 Belmont/i)).toBeInTheDocument();
    });
  })

  test('Verifica se search não retornar valor', async () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    const { history } = renderWithRouterAndRedux(<Recipes title="Foods" />);
    history.push('/foods');
    const showSearch = screen.getByTestId('search-top-btn');
    userEvent.click(showSearch);

    const inputSearch = screen.getByTestId('search-input');
    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    const buttonSearch = screen.getByTestId('exec-search-btn');

    userEvent.click(ingredientRadio);
    userEvent.type(inputSearch, 'chocolate');
    userEvent.click(buttonSearch);
    await waitFor(() => {
      expect(alert).toHaveBeenCalled();
    });
    userEvent.click(await screen.findByTestId('Goat-category-filter'));
    expect(history.location.pathname).toBe('/foods');
    userEvent.type(inputSearch, '{selectall}{del}Mbuzi Choma');
    console.log(inputSearch.value)
    userEvent.click(await screen.findByTestId('name-search-radio'));
    userEvent.click(buttonSearch);
    await waitFor(() => expect(history.location.pathname).not.toBe('/foods'));
  })
})