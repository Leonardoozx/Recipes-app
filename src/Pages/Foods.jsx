import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { mealsThunk } from '../Redux/Actions';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import RecipeCard from '../Components/RecipeCard';

function Foods({ meals, dispatchMeals }) {
  const history = useHistory();
  useEffect(() => {
    dispatchMeals('', 'Name', '/foods');
  }, [dispatchMeals]);

 
  return (
    <div>
      <Header renderButton title="Foods" />
      <section className="recipes-container">
        {
          meals.map((meal, index) => (
            <RecipeCard
              key={ meal.idMeal }
              id={ index }
              thumb={ meal.strMealThumb }
              name={ meal.strMeal }
            />
          ))
        }
      </section>
      <Footer />
    </div>
  );
}

Foods.propTypes = {
  meals: PropTypes.instanceOf(Array).isRequired,
  dispatchMeals: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchMeals: (...params) => dispatch(mealsThunk(...params)),
});

const mapStateToProps = (state) => ({
  meals: state.mealsReducer.recipes.meals,
});

export default connect(mapStateToProps, mapDispatchToProps)(Foods);
