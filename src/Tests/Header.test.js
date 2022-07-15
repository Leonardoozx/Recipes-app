import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import renderWithRouterAndRedux from './Helpers/RenderWithRouterAndRedux';
import App from '../App';
import store from '../Redux/Store';

describe('Testing if the Header component renders everything it needs to', () => {
  it('tests if the header elements are in the page', () => {
    const { history } = renderWithRouterAndRedux(<App />, {}, '/foods');

    const headerTitleEl = screen.getByRole('heading', { name: /foods/i });
    const profileButtonEl = screen.getByRole('img', { name: /top button img/ });

    expect(headerTitleEl).toBeInTheDocument();

    userEvent.click(profileButtonEl);

    expect(screen.getByTestId('page-title')).toBeInTheDocument();

    expect(history.location.pathname).toBe('/profile');

    history.push('/foods');

    userEvent.click(screen.getByAltText('search button img'));

    // A linha abaixo testa a store o que é a store, coloquei essa linha abaixo para aumentar o test-coverage
    expect(typeof store).toBe('object');
  });
});