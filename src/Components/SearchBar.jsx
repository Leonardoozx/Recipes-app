import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import useGenericState from '../Hooks/useGenericState';
import { mealsThunk } from '../Redux/Actions';

function SearchBar({ dispatchMeals }) {
  const history = useHistory();
  const initialState = {
    searchBarInput: '',
    searchCondition: 'Ingredient',
  };

  const [genericState, updateGenericState] = useGenericState(initialState);

  const { searchBarInput, searchCondition } = genericState;

  const submitSearch = (e) => {
    e.preventDefault();
    if (searchCondition === 'First letter' && searchBarInput.length !== 1) {
      global.alert('Your search must have only 1 (one) character');
    } else if (searchBarInput.length < 1) {
      global.alert('Fill in the search field');
    } else {
      dispatchMeals(searchBarInput, searchCondition, history.location.pathname);
    }
  };

  return (
    <form onSubmit={ submitSearch }>
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
          defaultChecked
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
        type="submit"
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
