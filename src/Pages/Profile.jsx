import React from 'react';
import { Link } from 'react-router-dom';

function Profile() {
  const { email } = JSON.parse(localStorage.getItem('user'));
  return (
    <>
      <span data-testid="profile-email">{email}</span>
      <Link to="/done-recipes">
        <button type="button" data-testid="profile-done-btn">Done Recipes</button>

      </Link>
      <Link to="/favorite-recipes">
        <button type="button" data-testid="profile-favorite-btn">Favorite Recipes</button>
      </Link>
      <Link to="/">
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ () => localStorage.clear() }
        >
          Logout

        </button>
      </Link>
    </>
  );
}

export default Profile;
