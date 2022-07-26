import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { actSendCategories, categoriesThunk, mealsThunk } from '../Redux/Actions';

const Categories = ({ filterByCategory, dispatchMeals, dispatchCategory }) => {
  const location = useLocation();
  const [categories, setCategories] = useState([]);
  const [activeCat, setActiveCat] = useState('');
  const [type, setType] = useState(location.pathname === '/foods' ? 'meals' : 'drinks');

  const selectFilterCategory = ({ target: { name } }) => {
    if (name === activeCat) {
      dispatchMeals('', 'Name', location.pathname);
      setActiveCat('');
    } else {
      filterByCategory(name, type);
      setActiveCat(name);
    }
    dispatchCategory();
  };

  useEffect(() => {
    setType(location.pathname === '/foods' ? 'meals' : 'drinks');
    let isMounted = true;
    const getCategories = async () => {
      const LIMIT = 5;
      const URL = type === 'meals'
        ? 'https://www.themealdb.com/api/json/v1/1/list.php?c=list'
        : 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
      const request = await fetch(URL).then((response) => response.json());
      if (isMounted) setCategories(request[type].slice(0, LIMIT));
    };
    getCategories();
    return () => { isMounted = false; };
  }, [location, type]);
  return (
    <section className="flex space-x-1 sm:flex-wrap justify-center mb-3">
      {
        categories.map((recipe, index) => (
          <button
            type="button"
            name={ recipe.strCategory }
            data-testid={ `${recipe.strCategory}-category-filter` }
            key={ index }
            className="bg-[#9a0000] py-1 px-2
             text-white rounded border-2 border-[#302d2d]"
            onClick={ selectFilterCategory }
          >
            { recipe.strCategory }
          </button>
        ))
      }
      <button
        type="button"
        name="All"
        data-testid="All-category-filter"
        className="bg-[#9a0000] py-1 px-2 rounded border-2 border-[#302d2d] text-white"
        onClick={ () => { dispatchMeals('', 'Name', location.pathname); } }
      >
        All
      </button>
    </section>
  );
};

Categories.propTypes = {
  filterByCategory: PropTypes.func.isRequired,
  dispatchMeals: PropTypes.func.isRequired,
  dispatchCategory: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  filterByCategory: (...params) => dispatch(categoriesThunk(...params)),
  dispatchMeals: (...params) => dispatch(mealsThunk(...params)),
  dispatchCategory: () => dispatch(actSendCategories),
});

export default connect(null, mapDispatchToProps)(Categories);
