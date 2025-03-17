import React from 'react';

function DishInfo({ recipeData }) {
  return (
    <div>
      <img src={recipeData.image} alt={recipeData.title} />
      <h1>{recipeData.title}</h1>
      <p dangerouslySetInnerHTML={{ __html: recipeData.summary }}></p>
    </div>
  );
}

export default DishInfo;