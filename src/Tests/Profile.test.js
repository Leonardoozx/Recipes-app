import { screen } from '@testing-library/react';
import React from 'react';
import Profile from '../Pages/Profile';
import renderWithRouterAndRedux from './Helpers/RenderWithRouter';
import userEvent from '@testing-library/user-event'

const data = {email: 'kwexler@bcs.com'}

describe('Tests if the Profile page works correctly', () => {
  global.localStorage.setItem('user', JSON.stringify(data));
    it('Tests if the page renders the expected elements', () => {
        renderWithRouterAndRedux(<Profile />)
        expect(screen.getByTestId('profile-email')).toHaveTextContent(data.email);
        expect(screen.getByTestId('profile-done-btn')).toBeDefined();
        expect(screen.getByTestId('profile-favorite-btn')).toBeDefined();
        expect(screen.getByTestId('profile-logout-btn')).toBeDefined();
    });
    it('Tests if the logout button works correctly', () => {
        const { history } = renderWithRouterAndRedux(<Profile />)
        userEvent.click(screen.getByTestId('profile-logout-btn'));
        expect(global.localStorage.getItem('user')).toBeFalsy();
        expect(history.location.pathname).toBe('/');
    })
})