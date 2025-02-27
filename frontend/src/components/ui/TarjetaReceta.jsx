import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './TarjetaReceta.css'; // Importa el archivo CSS para la tarjeta

const TarjetaReceta = ({ receta }) => {
  const [expandida, setExpandida] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className={`tarjeta-receta ${expandida ? "expanded" : ""}`}
      onClick={() => setExpandida(!expandida)}
      style={{ cursor: "pointer", backgroundColor: "#333", borderRadius: "10px", border: "1px solid #555" }}
    >
      {expandida && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setExpandida(false);
          }}
          className="close-button"
        >
          &times;
        </button>
      )}
      <img src={receta.image} alt={receta.title} className="w-full h-40 object-cover rounded-lg" />
      <h3 className="text-lg font-semibold mt-2 text-white">{receta.title}</h3>

      {expandida && (
        <div className="expanded-content mt-2">
          <p className="text-gray-300">{receta.summary?.slice(0, 100)}...</p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/receta/${receta.id}`);
            }}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Ver receta completa
          </button>
        </div>
      )}
    </div>
  );
};

export default TarjetaReceta;