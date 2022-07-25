import { screen } from '@testing-library/react';
import React from 'react';
import renderWithRouterAndRedux from './Helpers/RenderWithRouterAndRedux';
import userEvent from '@testing-library/user-event'
import FavoriteRecipes from '../Pages/FavoriteRecipes';

const favoriteRecipes = [
  {
    name: "Lasagne",
    id: "52844",
    category: "Pasta",
    type: "food",
    nationality: "Italian",
    image: "https://www.themealdb.com/images/media/meals/wtsvxx1511296896.jpg",
  },
  {
    name: "A1",
    id: "17222",
    alcoholicOrNot: "Alcoholic",
    category: "Cocktail",
    type: "drink",
    image: "https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg",
  }
];

describe('01.FavoriteRecipes', () => {
  global.localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));

    test('Testa se os botões estão na página', () => {
      renderWithRouterAndRedux(<FavoriteRecipes />)

      expect(screen.getByTestId('filter-by-all-btn')).toBeInTheDocument();
      expect(screen.getByTestId('filter-by-food-btn')).toBeInTheDocument();
      expect(screen.getByTestId('filter-by-drink-btn')).toBeInTheDocument();
    });

    test('Testa o filtro All', () => {
      renderWithRouterAndRedux(<FavoriteRecipes />)

      const allRecipes  = screen.getByTestId('filter-by-all-btn');
      userEvent.click(allRecipes);

      expect(screen.getByText('Italian')).toBeInTheDocument()
      expect(screen.getByText('Lasagne')).toBeInTheDocument()
      expect(screen.getByText('food')).toBeInTheDocument()
      expect(screen.getByText('Pasta')).toBeInTheDocument()
      expect(screen.getByText('Alcoholic')).toBeInTheDocument()
      expect(screen.getByText('A1')).toBeInTheDocument()
      expect(screen.getByText('drink')).toBeInTheDocument()
      expect(screen.getByText('Cocktail')).toBeInTheDocument()
    })

    test('Testa o filtro Food', () => {
      renderWithRouterAndRedux(<FavoriteRecipes />)

      const filterFoods  = screen.getByTestId('filter-by-food-btn');
      userEvent.click(filterFoods);
      
      expect(screen.getByText('Italian')).toBeInTheDocument()
      expect(screen.getByText('Lasagne')).toBeInTheDocument()
      expect(screen.getByText('food')).toBeInTheDocument()
      expect(screen.getByText('Pasta')).toBeInTheDocument()
      expect(screen.getByText('Favorite Recipes')).toBeInTheDocument()
    })

    test('Testa o filtro Drink', () => {
      renderWithRouterAndRedux(<FavoriteRecipes />)

      const filterDrinks  = screen.getByTestId('filter-by-drink-btn');
      userEvent.click(filterDrinks);

      expect(screen.getByText('Alcoholic')).toBeInTheDocument()
      expect(screen.getByText('A1')).toBeInTheDocument()
      expect(screen.getByText('drink')).toBeInTheDocument()
      expect(screen.getByText('Cocktail')).toBeInTheDocument()
      expect(screen.getByText('Favorite Recipes')).toBeInTheDocument()
      })

    
}) 
