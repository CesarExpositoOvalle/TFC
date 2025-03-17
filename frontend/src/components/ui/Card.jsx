import React from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/card.css";
import noImage from "../../assets/images/noImg.png";

function Card({ id, title, image, macros }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/recipe/${id}`);
  };

  return (
    <div className="card" onClick={handleClick}>
      <img 
        src={image || noImage} 
        alt={title} 
        className="card-img" 
        onError={(e) => { e.target.onerror = null; e.target.src = noImage; }} 
      />
      <h1 className="card-title">{title}</h1>
      <div className="card-info">
        <div>
          <span>🔥</span>
          <span>{macros.calories}</span>
        </div>
        <div>
          <span>🍖</span>
          <span>{macros.protein}</span>
        </div>
        <div>
          <span>🥬</span>
          <span>{macros.carbs}</span>
        </div>
        <div>
          <span>🧈</span>
          <span>{macros.fats}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;