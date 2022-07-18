import React from 'react';
import PropTypes from 'prop-types';

const RecipeCard = ({ id, thumb, name }) => (
  <article data-testid={ `${id}-recipe-card` } className="recipe-card">
    <img data-testid={ `${id}-card-img` } src={ thumb } alt="" />
    <h6 data-testid={ `${id}-card-name` }>{ name }</h6>
  </article>
);

RecipeCard.propTypes = {
  id: PropTypes.number.isRequired,
  thumb: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default RecipeCard;
