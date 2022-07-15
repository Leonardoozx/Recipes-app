import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Image from '../images/profileIcon.svg';
import SearchBar from './SearchBar';
import searchIcon from '../images/searchIcon.svg';

function Header({ renderButton, title }) {
  const [searchBarVisibility, setSearchBarVisibility] = useState(false);
  return (
    <header>
      <h1 data-testid="page-title">{ title }</h1>

      <Link to="/profile">
        <button type="button">
          <img
            src={ Image }
            alt="#"
            data-testid="profile-top-btn"
          />
        </button>
      </Link>

      { renderButton
        && (
          <button
            type="button"
            onClick={ () => setSearchBarVisibility((xBoolean) => !xBoolean) }
          >
            <img data-testid="search-top-btn" src={ searchIcon } alt="" />
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
