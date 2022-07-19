import copy from 'clipboard-copy';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import buttonImg from '../images/shareIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';

function ShareBtns(props) {
  const { pathname } = useLocation();
  const [willAppearText, appearText] = useState(false);
  const [imageKey, setImageKey] = useState(0);

  const onFavoriteBtnClick = (id) => {
    const storage = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    if (storage.some((x) => x.id === id)) {
      const newStorage = storage.filter((x) => x.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newStorage));
      setImageKey((prevState) => prevState + 1);
      return;
    }
    localStorage.setItem('favoriteRecipes', JSON.stringify([...storage, props]));
    setImageKey((prevState) => prevState + 1);
  };

  const isRecipeSaved = (id) => {
    const storage = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    console.log(storage.some((x) => x.id === id));
    return storage.some((x) => x.id === id);
  };

  const { id } = props;

  return (
    <>
      { willAppearText && <span>Link copied!</span> }

      <button
        data-testid="share-btn"
        type="button"
        onClick={ () => {
          copy(`http://localhost:3000${pathname}`);
          appearText(true);
        } }
      >
        <img src={ buttonImg } alt="button img" />
      </button>

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
    </>
  );
}

export default ShareBtns;
