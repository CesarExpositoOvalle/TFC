import React, { useEffect, useState } from "react";
import axios from "axios";
import TarjetaReceta from "../components/ui/TarjetaReceta"; // Importa el componente
import './Recetas.css'; // Importa el archivo CSS para la página

function Recetas() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/recipes.php?query=pizza&_=${new Date().getTime()}`, {
        headers: { "Cache-Control": "no-cache" },
      })
      .then((response) => {
        console.log("Datos recibidos del backend:", response.data);
        setRecipes(response.data.results || []); // Asegura que no sea undefined
      })
      .catch((error) => console.log("Error:", error));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-white">Recetas de Pizza</h1>
      <div className="grid">
        {recipes.length > 0 ? (
          recipes.map((recipe) => <TarjetaReceta key={recipe.id} receta={recipe} />)
        ) : (
          <p className="text-white">Cargando recetas...</p>
        )}
      </div>
    </div>
  );
}

export default Recetas;