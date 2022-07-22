import { screen } from '@testing-library/react';
import React from 'react';
import renderWithRouterAndRedux from './Helpers/RenderWithRouterAndRedux';
import userEvent from '@testing-library/user-event'
import DoneRecipes from '../Pages/DoneRecipes';

const doneRecipes = [
  {
    image: "https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg",
    name: "Burek",
    id: "53060",
    alcoholicOrNot: "",
    category: "Side",
    type: "food",
    nationality: "Croatian",
    tags: [
            "Streetfood",
            "Onthego"
          ],
    doneDate: "21/07/2022"
  },
  {
    alcoholicOrNot: "Optional alcohol",
    category: "Ordinary Drink",
    doneDate: "22/07/2022",
    id: "15997",
    image: "https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg",
    name: "GG",
    nationality: "",
    tags: "",
    type: "drink",
  }
];

describe('Tests page DoneRecipes', () => {
  global.localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    it('Tests if the buttons are in the page', () => {
        renderWithRouterAndRedux(<DoneRecipes />)
        expect(screen.getByTestId('filter-by-all-btn')).toBeInTheDocument();
        expect(screen.getByTestId('filter-by-food-btn')).toBeInTheDocument();
        expect(screen.getByTestId('filter-by-drink-btn')).toBeInTheDocument();
        expect(screen.getByRole('button', {name:'Voltar'})).toBeInTheDocument();
    });
    it('Tests if buttons are in the page', () => {
      renderWithRouterAndRedux(<DoneRecipes />)
      const allBtn  = screen.getByTestId('filter-by-all-btn');
      // const foodBtn  = screen.getByTestId('filter-by-food-btn');
      // const drinkBtn  = screen.getByTestId('filter-by-drink-btn');
      // const backBtn  = screen.getByRole('button', {name:'Voltar'});
      userEvent.click(allBtn);
      expect(screen.getByText('Croatian')).toBeInTheDocument()
      // userEvent.click(foodBtn);
      expect(screen.getByText('Burek')).toBeInTheDocument()
      // userEvent.click(drinkBtn);
      expect(screen.getByText('alcohol')).toBeInTheDocument()
      // userEvent.click(backBtn);
      expect(screen.getByText('Foods')).toBeInTheDocument()
    })
    it('Tests drink button', () => {
    renderWithRouterAndRedux(<DoneRecipes />)
    const drinkBtn  = screen.getByTestId('filter-by-drink-btn');
    userEvent.click(drinkBtn);
    expect(screen.getByText('Done Recipes')).toBeInTheDocument()
    })
    it('Tests food button', () => {
      renderWithRouterAndRedux(<DoneRecipes />)
      const foodBtn  = screen.getByTestId('filter-by-food-btn');
      userEvent.click(foodBtn);
      expect(screen.getByText('Onthego')).toBeInTheDocument()
    })
})