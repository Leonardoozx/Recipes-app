import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
// import RecipeCard from '../Components/RecipeCard';

function RecipeDetails() {
  // Referência: https://stackoverflow.com/questions/68892625/how-to-use-props-match-params
  const { id } = useParams();
  return (
    <h1>nothing</h1>
  );
}

const mapStateToProps = ({ mealsReducer: { recipes } }) => ({ recipes });
export default connect(mapStateToProps)(RecipeDetails);
