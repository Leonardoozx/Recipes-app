import React from 'react';
import { useParams } from 'react-router-dom';
// import RecipeCard from '../Components/RecipeCard';

function RecipeDetails() {
  // Referência: https://stackoverflow.com/questions/68892625/how-to-use-props-match-params
  const { id } = useParams();
  console.log(id);
  return (
    <h1>nothing</h1>
  );
}

export default RecipeDetails;
