import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function PaginaReceta() {
  const { id } = useParams();
  const [receta, setReceta] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/recipe.php?id=${id}`)
      .then(response => {
        setReceta(response.data);
      })
      .catch(error => console.log("Error:", error));
  }, [id]);

  if (!receta) {
    return <p>Cargando receta...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{receta.title}</h1>
      <img src={receta.image} alt={receta.title} className="w-full h-40 object-cover rounded-lg" />
      <p className="mt-4">{receta.summary}</p>
    </div>
  );
}

export default PaginaReceta;