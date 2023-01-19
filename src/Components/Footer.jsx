import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

const Footer = () => (
  <footer data-testid="footer" className="flex justify-center space-x-40">
    <div>
      <Link to="/foods">
        <img data-testid="food-bottom-btn" src={ mealIcon } alt="Meals" />
      </Link>
    </div>
    <div>
      <Link to="/drinks">
        <img data-testid="drinks-bottom-btn" src={ drinkIcon } alt="Drinks" />
      </Link>
    </div>
  </footer>
);

export default Footer;
