import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import useGenericState from '../Hooks/useGenericState';
import { mealsThunk } from '../Redux/Actions';

function SearchBar({ dispatchMeals }) {
  const initialState = {
    searchBarInput: '',
    searchCondition: '',
  };

  const [genericState, updateGenericState] = useGenericState(initialState);

  const { searchBarInput, searchCondition } = genericState;

  return (
    <form>
      <input
        data-testid="search-input"
        name="searchBarInput"
        type="text"
        value={ searchBarInput }
        onChange={ updateGenericState }
      />

      <label htmlFor="ingredient">
        Ingredient
        <input
          data-testid="ingredient-search-radio"
          type="radio"
          name="searchCondition"
          id="ingredient"
          value="Ingredient"
          onClick={ updateGenericState }
        />
      </label>

      <label htmlFor="name">
        Name
        <input
          data-testid="name-search-radio"
          type="radio"
          name="searchCondition"
          id="name"
          value="Name"
          onClick={ updateGenericState }
        />
      </label>

      <label htmlFor="firstLetter">
        First letter
        <input
          data-testid="first-letter-search-radio"
          type="radio"
          name="searchCondition"
          value="First letter"
          id="firstLetter"
          onClick={ updateGenericState }
        />
      </label>

      <button
        data-testid="exec-search-btn"
        type="button"
        onClick={ () => dispatchMeals(searchBarInput, searchCondition) }
      >
        Search
      </button>
    </form>
  );
}

const mapDispatchToProps = (dispatch) => ({
  dispatchMeals: (...params) => dispatch(mealsThunk(...params)),
});

SearchBar.propTypes = {
  dispatchMeals: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(SearchBar);
