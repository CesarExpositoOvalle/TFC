import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Recetas() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // Llamada al backend en PHP usando axios
    axios.get('http://localhost:8000/api/recipes.php')
      .then(response => {
        console.log(response.data); // Agrega esto para verificar la estructura de la respuesta
        setRecipes(response.data.results);
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

export default Recetas;