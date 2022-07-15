import React from 'react';
import App from '../App';
import renderWithRouterAndRedux from './Helpers/RenderWithRouter';

describe('Testing if the login page is working correctly', () => {
  it('tests if the inputs are working', () => {
    renderWithRouterAndRedux(<App />)
  });
});