import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';

const RecipeCard = ({ idRecipe, idCard, thumb, name }) => {
  const location = useLocation();
  return (
    <Link to={ `${location.pathname}/${idRecipe}` }>
      <article data-testid={ `${idCard}-recipe-card` } className="recipe-card">
        <img data-testid={ `${idCard}-card-img` } src={ thumb } alt="" />
        <h6 data-testid={ `${idCard}-card-name` }>{ name }</h6>
      </article>
    </Link>
  );
};

RecipeCard.propTypes = {
  idRecipe: PropTypes.string.isRequired,
  idCard: PropTypes.number.isRequired,
  thumb: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default RecipeCard;
