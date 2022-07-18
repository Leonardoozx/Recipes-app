import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { mealsThunk } from '../Redux/Actions';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import RecipeCard from '../Components/RecipeCard';

const Drinks = ({ drinks, dispatchMeals }) => {
  const history = useHistory();
  useEffect(() => {
    dispatchMeals('', 'Name', '/drinks');
  }, [dispatchMeals]);

  useEffect(() => {
    if (drinks.length === 1) history.push(`/drinks/${drinks[0].idDrink}`);
  }, [history, drinks]);

  return (
    <div>
      <Header renderButton title="Drinks" />
      <section className="recipes-container">
        {
          drinks.map((drink, index) => (
            <Link
              key={ drink.idDrink }
              to={ `/drinks/${drink.idDrink}/in-progress` }
            >
              <RecipeCard
                id={ index }
                thumb={ drink.strDrinkThumb }
                name={ drink.strDrink }
              />
            </Link>
          ))
        }
      </section>
      <Footer />
    </div>
  );
};

Drinks.propTypes = {
  drinks: PropTypes.instanceOf(Array).isRequired,
  dispatchMeals: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchMeals: (...params) => dispatch(mealsThunk(...params)),
});

const mapStateToProps = (state) => ({
  drinks: state.mealsReducer.recipes.drinks,
});

export default connect(mapStateToProps, mapDispatchToProps)(Drinks);
