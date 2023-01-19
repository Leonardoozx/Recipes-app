import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';

const RecipeCard = ({ idRecipe, idCard, thumb, name }) => {
  const location = useLocation();
  return (
    <Link to={ `${location.pathname}/${idRecipe}` }>
      <article
        data-testid={ `${idCard}-recipe-card` }
        className="w-80 h-64 relative lg:mr-6"
      >
        <div>
          <img
            data-testid={ `${idCard}-card-img` }
            src={ thumb }
            alt=""
            className="object-cover opacity-75 h-48 w-96
             rounded-xl shadow-xl"
          />
        </div>
        <h6
          className="opacity-0 md: hover:opacity-100 duration-300 absolute
        inset-0 z-10 flex justify-center shadow-xl items-center text-4xl
         text-[#0e0a36c9] font-semibold"
          data-testid={ `${idCard}-card-name` }
        >
          { name }

        </h6>
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
