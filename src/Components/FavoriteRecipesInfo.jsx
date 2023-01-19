import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

function FavoriteRecipesDetails({
  index,
  id,
  type,
  nationality,
  category,
  alcoholicOrNot,
  name,
  image,
}) {
  const [copyUrlRecipe, setCopyUrlRecipe] = useState(false);
  const filterRecipe = type === 'food' ? nationality : alcoholicOrNot;

  function removeRecipe() {
    const node = document.getElementById(id);
    node.parentNode.removeChild(node);

    const storage = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    if (storage.length > 0) {
      const newStorage = storage.filter((x) => x.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newStorage));
    } else {
      localStorage.setItem('favoriteRecipes', '[]');
    }
  }
  return (
    <div key={ id } id={ id }>
      <div className="flex">
        <Link to={ `/${type}s/${id}` }>
          <img
            data-testid={ `${index}-horizontal-image` }
            src={ image }
            alt={ name }
            style={ { width: '200px' } }
          />
          <div
            data-testid={ `${index}-horizontal-top-text` }
          >
            <p>{`${filterRecipe} - ${category}`}</p>
          </div>
          <br />
          <p
            data-testid={ `${index}-horizontal-name` }
          >
            { name }
          </p>
        </Link>
        <div className="flex flex-col justify-center">
          <button
            type="button"
            onClick={ () => {
              copy(`http://localhost:3000/${type}s/${id}`);
              setCopyUrlRecipe(true);
            } }
          >
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              style={ { width: '40px' } }
              alt={ name }
            />
          </button>
          { copyUrlRecipe && <p>Link copied!</p>}
          <button
            type="button"
            onClick={ () => {
              removeRecipe();
            } }
          >
            <img
              data-testid={ `${index}-horizontal-favorite-btn` }
              src={ blackHeartIcon }
              style={ { width: '40px' } }
              alt={ name }
            />
          </button>
        </div>
      </div>
    </div>
  );
}

FavoriteRecipesDetails.propTypes = {
  index: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  nationality: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  alcoholicOrNot: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default FavoriteRecipesDetails;
