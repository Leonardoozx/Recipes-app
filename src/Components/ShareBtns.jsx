import copy from 'clipboard-copy';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import buttonImg from '../images/shareIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';

function ShareBtns({
  alcoholicOrNot, category, id, image, name, nationality, type, favoriteBtn, testId }) {
  const props = { alcoholicOrNot, category, id, image, name, nationality, type };
  const [willAppearText, appearText] = useState(false);
  const [imageKey, setImageKey] = useState(0);

  const onFavoriteBtnClick = (ID) => {
    const storage = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    if (storage.some((x) => x.id === ID)) {
      const newStorage = storage.filter((x) => x.id !== ID);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newStorage));
      setImageKey((prevState) => prevState + 1);
      return;
    }
    localStorage.setItem('favoriteRecipes', JSON.stringify([...storage, props]));
    setImageKey((prevState) => prevState + 1);
  };

  const isRecipeSaved = (ID) => {
    const storage = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    return storage.some((x) => x.id === ID);
  };

  return (
    <>
      { willAppearText && <span>Link copied!</span> }

      <button
        data-testid={ testId }
        type="button"
        onClick={ () => {
          copy(`http://localhost:3000/${type}s/${id}`);
          appearText(true);
        } }
        src={ buttonImg }
      >
        <img src={ buttonImg } alt="button img" />
      </button>

      { favoriteBtn
      && (
        <button
          type="button"
          onClick={ () => onFavoriteBtnClick(id) }
        >
          <img
            data-testid="favorite-btn"
            key={ imageKey }
            src={ isRecipeSaved(id) ? blackHeart : whiteHeart }
            alt=""
          />
        </button>
      )}
    </>
  );
}

ShareBtns.propTypes = {
  id: PropTypes.string,
  favoriteBtn: PropTypes.bool,
  alcoholicOrNot: PropTypes.string,
  category: PropTypes.string,
  image: PropTypes.string,
  name: PropTypes.string,
  nationality: PropTypes.string,
  type: PropTypes.string,
  testId: PropTypes.string,

};

ShareBtns.defaultProps = {
  id: '',
  favoriteBtn: false,
  alcoholicOrNot: '',
  category: '',
  image: '',
  name: '',
  nationality: '',
  type: '',
  testId: '',

};

export default ShareBtns;
