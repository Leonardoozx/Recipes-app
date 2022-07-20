import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { connect } from 'react-redux';
import { mealsThunk } from '../Redux/Actions';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import RecipeCard from '../Components/RecipeCard';
import Categories from '../Components/Categories';

function Recipes({ recipes, dispatchMeals, title }) {
  const history = useHistory();
  const location = useLocation();
  const [type, setType] = useState('meals');

  useEffect(() => {
    const newType = location.pathname === '/foods' ? 'meals' : 'drinks';
    setType(newType);
    dispatchMeals('', 'Name', location.pathname);
  }, [location, dispatchMeals]);

  useEffect(() => {
    const captalizedType = type.charAt(0).toUpperCase() + type.slice(1);
    const splitedType = captalizedType.split('');
    splitedType.pop();
    const newType = splitedType.join('');
    const nextLocationType = type === 'meals' ? 'foods' : 'drinks';
    if (recipes[type].length === 1) {
      history.push(`/${nextLocationType}/${recipes[type][0][`id${newType}`]}`);
    }
  }, [history, recipes, type]);
  return (
    <div>
      <Header renderButton title={ title } />
      <Categories />
      <section className="recipes-container">
        {
          recipes[type].map((recipe, index) => (
            <RecipeCard
              key={ recipe.idMeal || recipe.idDrink }
              id={ index }
              thumb={ recipe.strMealThumb || recipe.strDrinkThumb }
              name={ recipe.strMeal || recipe.strDrink }
            />
          ))
        }
      </section>
      <Footer />
    </div>
  );
}

Recipes.propTypes = {
  recipes: PropTypes.instanceOf(Object).isRequired,
  title: PropTypes.string.isRequired,
  dispatchMeals: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchMeals: (...params) => dispatch(mealsThunk(...params)),
});

const mapStateToProps = (state) => ({
  recipes: state.mealsReducer.recipes,
});

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);
