import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import React from 'react';
import App from '../App';
import renderWithRouterAndRedux from './Helpers/RenderWithRouterAndRedux';

describe('Testing if the searchBar is working in the right way', () => {
  it('tests the no ingredient name alert', () => {
    renderWithRouterAndRedux(<App />, {}, '/foods');

    // Referência: https://stackoverflow.com/questions/55088482/jest-not-implemented-window-alert
    // Essa linha abaixo, apenas tira um warning que tava aparecendo durante os testes
    window.alert = () => { };

    // Referência: https://stackoverflow.com/questions/55933105/how-to-mock-or-assert-whether-window-alert-has-fired-in-react-jest-with-typesc
    const alertMock = jest.spyOn(global, 'alert');

    userEvent.click(screen.getByAltText('search button img'));

    userEvent.click(screen.getByRole('radio', { name: /ingredient/i }));

    userEvent.click(screen.getByText('Search'));

    expect(alertMock).toHaveBeenCalledTimes(1);

    alertMock.mockClear();

  });

  it('tests the invalid first letter filter', () => {
    renderWithRouterAndRedux(<App />, {}, '/foods');

    window.alert = () => { };

    const alertMock = jest.spyOn(global, 'alert');

    userEvent.click(screen.getByAltText('search button img'));

    userEvent.click(screen.getByRole('radio', { name: /first letter/i }));

    userEvent.type(
      screen.getByRole('textbox'),
      'undefined'
    )

    userEvent.click(screen.getByText('Search'));

    expect(alertMock).toHaveBeenCalledTimes(1);

    alertMock.mockClear();

  });

  it('tests if the search button works when passing a valid string to the input', async () => {
    renderWithRouterAndRedux(<App />, {}, '/foods');

    userEvent.click(screen.getByAltText('search button img'));

    userEvent.click(screen.getByRole('radio', { name: /first letter/i }));

    userEvent.type(screen.getByRole('textbox'),'l');

    userEvent.click(screen.getByText('Search'));

  });
});