import React from 'react';

function MacroContainer({ macros }) {
  return (
    <div>
      <h1>Macros</h1>
      <ul>
        <li>🔥: {macros.calories}</li>
        <li>🍖: {macros.protein}</li>
        <li>🥬: {macros.carbs}</li>
        <li>🧈: {macros.fats}</li>
      </ul>
    </div>
  );
}

export default MacroContainer;