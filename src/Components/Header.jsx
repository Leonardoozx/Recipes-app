import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Image from '../images/profileIcon.svg';
import SearchBar from './SearchBar';

function Header({ renderButton, title }) {
  const [searchBarVisibility, setSearchBarVisibility] = useState(false);
  return (
    <header>
      <h1 data-testid="page-title">{ title }</h1>

      <img
        src={ Image }
        alt="#"
        data-testid="profile-top-btn"
      />

      { renderButton
        && (
          <button
            data-testid="search-top-btn"
            type="button"
            onClick={ () => setSearchBarVisibility((xBoolean) => !xBoolean) }
          >
            { !searchBarVisibility ? 'Search Bar' : 'Hide' }
          </button>)}

      { searchBarVisibility
        && <SearchBar />}

    </header>
  );
}

Header.propTypes = {
  renderButton: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
};

export default Header;
