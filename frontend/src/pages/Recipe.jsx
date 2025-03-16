import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Recipe() {
  const { id } = useParams(); // Obtén la ID de la receta desde la URL
  const [recipeData, setRecipeData] = useState(null); // Estado para almacenar los datos de la receta

  useEffect(() => {
    // Llama a la API de Spoonacular para obtener los detalles de la receta
    axios
      .get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=51b42182d1fa49919435b66da6eb1172`)
      .then((response) => {
        setRecipeData(response.data); // Guarda los datos de la receta en el estado
      })
      .catch((error) => console.error("Error al obtener los detalles de la receta:", error));
  }, [id]);

  if (!recipeData) {
    return <p>Cargando datos de la receta...</p>; // Muestra un mensaje mientras se cargan los datos
  }

  return (
    <div>
      <h1>Detalles de la Receta</h1>
      <pre>{JSON.stringify(recipeData, null, 2)}</pre> {/* Muestra los datos en formato JSON */}
    </div>
  );
}

export default Recipe;