import { screen } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouterAndRedux from './Helpers/RenderWithRouterAndRedux';
import userEvent from '@testing-library/user-event'

describe('Testing if the login page is working correctly', () => {
  it('tests if the inputs are working', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const emailInputEl = screen.getByRole('textbox', { name: /email:/i });
    const submitBtnEl = screen.queryByRole('button', { name: /enter/i });
    const passwordInputEl = screen.getByLabelText(/password:/i);
    
    expect(submitBtnEl).toBeDisabled();

    userEvent.type(emailInputEl, 'leonardo@gmail.com');
    
    expect(submitBtnEl).toBeDisabled();

    userEvent.type(passwordInputEl, '123456');

    expect(submitBtnEl).toBeDisabled();

    userEvent.type(passwordInputEl, '7');

    userEvent.click(submitBtnEl);

    expect(history.location.pathname).toBe('/foods');
  });
});