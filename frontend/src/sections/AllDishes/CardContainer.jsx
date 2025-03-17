import React, { useEffect, useState } from "react";
import Card from "../../components/ui/Card";
import "../../assets/styles/cardContainer.css";
import axios from "axios";

function extractMacros(summary) {
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

  if (caloriesMatch) macros.calories = `${caloriesMatch[1]} `;
  if (proteinMatch) macros.protein = `${proteinMatch[1]} g`;
  if (carbsMatch) macros.carbs = `${carbsMatch[1]} g`;
  if (fatsMatch) macros.fats = `${fatsMatch[1]} g`;

  return macros;
}

function CardContainer() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.spoonacular.com/recipes/random?number=25&apiKey=51b42182d1fa49919435b66da6eb1172")
      .then((response) => {
        const recipesWithMacros = response.data.recipes.map((recipe) => ({
          ...recipe,
          macros: extractMacros(recipe.summary), 
        }));
        setRecipes(recipesWithMacros); 
      })
      .catch((error) => console.error("Error al obtener las recetas:", error));
  }, []);

  return (
    <div className="cardContainer">
      {recipes.map((recipe) => (
        <Card
          key={recipe.id}
          id={recipe.id}
          title={recipe.title}
          image={recipe.image}
          macros={recipe.macros} 
        />
      ))}
    </div>
  );
}

export default CardContainer;