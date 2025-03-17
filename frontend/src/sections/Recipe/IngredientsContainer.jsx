import React from 'react';

function IngredientsContainer({ recipeData }) {
  return (
    <div>
      <h1>Ingredientes</h1>
      <ul>
        {recipeData.extendedIngredients.map((ingredient) => (
          <li key={ingredient.id}>
            {ingredient.original}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default IngredientsContainer;