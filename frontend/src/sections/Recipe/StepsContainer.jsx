import React from 'react';

function StepsContainer({ recipeData }) {
  return (
    <div>
      <h1>Pasos</h1>
      {recipeData.analyzedInstructions.length > 0 ? (
        recipeData.analyzedInstructions[0].steps.map((step) => (
          <div key={step.number}>
            <h2>Paso {step.number}</h2>
            <p>{step.step}</p>
          </div>
        ))
      ) : (
        <p>No hay pasos disponibles para esta receta.</p>
      )}
    </div>
  );
}

export default StepsContainer;