import React, { useEffect, useState } from 'react';

function App() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // Llamada al backend en PHP
    fetch('http://localhost:8800/api/recipes.php?query=pasta')
      .then(response => response.json())
      .then(data => {
        console.log(data); // Agrega esto para verificar la estructura de la respuesta
        setRecipes(data.results);
      })
      .catch(error => console.log("Error:", error));
  }, []);

  return (
    <div>
      <h1>Recetas de Pasta</h1>
      <ul>
        {recipes.map((recipe, index) => (
          <li key={index}>
            <h2>{recipe.title}</h2>
            <img src={recipe.image} alt={recipe.title} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;