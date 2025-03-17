import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { DishInfo, IngredientsContainer, MacroContainer, StepsContainer } from "../sections/Recipe";
import "../assets/styles/recipe.css";

function Recipe() {
  const { id } = useParams(); 
  const [recipeData, setRecipeData] = useState(null); 

  useEffect(() => {
    axios
      .get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=51b42182d1fa49919435b66da6eb1172`)
      .then((response) => {
        setRecipeData(response.data); 
      })
      .catch((error) => console.error("Error al obtener los detalles de la receta:", error));
  }, [id]);

  if (!recipeData) {
    return <p>Cargando datos de la receta...</p>; 
  }

  // Función para extraer macros del summary
  const extractMacros = (summary) => {
    const macros = {
      calories: "N/A",
      protein: "N/A",
      carbs: "N/A",
      fats: "N/A",
    };

    if (!summary) return macros;

    const caloriesMatch = summary.match(/(\d+)\s*calories/i);
    const proteinMatch = summary.match(/(\d+)\s*g\s*of\s*protein/i);
    const carbsMatch = summary.match(/(\d+)\s*g\s*of\s*carbohydrates/i);
    const fatsMatch = summary.match(/(\d+)\s*g\s*of\s*fat/i);

    if (caloriesMatch) macros.calories = `${caloriesMatch[1]} kcal`;
    if (proteinMatch) macros.protein = `${proteinMatch[1]} g`;
    if (carbsMatch) macros.carbs = `${carbsMatch[1]} g`;
    if (fatsMatch) macros.fats = `${fatsMatch[1]} g`;

    return macros;
  };

  const macros = extractMacros(recipeData.summary);

  return (
    <div className="main-container">
      <div className="recipe-container">
        <div className="info-container">
          <DishInfo recipeData={recipeData} />
        </div>
        <div className="ingredients-container">
          <IngredientsContainer recipeData={recipeData} />
        </div>
        <div className="macro-container">
          <MacroContainer macros={macros} />
        </div>
        <div className="steps-container">
          <StepsContainer recipeData={recipeData} /> 
        </div>
      </div>
    </div>
  );
}

export default Recipe;