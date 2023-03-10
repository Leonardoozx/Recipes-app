import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Image from '../images/profileIcon.svg';
import SearchBar from './SearchBar';
import searchIcon from '../images/searchIcon.svg';

function Header({ renderButton, title }) {
  const [searchBarVisibility, setSearchBarVisibility] = useState(false);
  return (
    <header className="flex flex-col items-center">
      <div className="flex justify-center">
        <h1
          className="mt-6 font-extrabold text-5xl text-[#9a0000] font-mono"
          data-testid="page-title"
        >
          { title }

        </h1>
      </div>
      <div className="flex flex-row items-start justify-center mb-8">
        <Link to="/profile">
          <button className="mr-4" type="button">
            <img
              src={ Image }
              alt="top button img"
              data-testid="profile-top-btn"
            />
          </button>
        </Link>
        { renderButton
        && (
          <button
            type="button"
            onClick={ () => setSearchBarVisibility((prevState) => !prevState) }
          >
            <img
              data-testid="search-top-btn"
              src={ searchIcon }
              alt="search button img"
            />
          </button>)}
      </div>
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
