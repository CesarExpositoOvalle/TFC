import React, { useEffect, useState } from 'react';
import axios from 'axios';



const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  const calcularCaloriasDiarias = (userData) => {
    if (!userData) return 0;
  
    const { sex, height_cm, weight_kg, age, activity_level, goal } = userData;
  
    const peso = parseFloat(weight_kg);
  
    let TMB = sex === "male"
      ? (10 * peso) + (6.25 * height_cm) - (5 * age) + 5
      : (10 * peso) + (6.25 * height_cm) - (5 * age) - 161;
  
    const factoresActividad = {
      sedentary: 1.2,
      low: 1.375,
      moderate: 1.55,
      high: 1.725,
      very_high: 1.9
    };
  
    let calorias = TMB * (factoresActividad[activity_level] || 1.2);
  
    if (goal === "weight_loss") calorias -= 400; 
    if (goal === "muscle_gain") calorias += 400; 
  
    return Math.round(calorias);
  };
  
  
  
  const caloriasDiarias = calcularCaloriasDiarias(userData);
  

  useEffect(() => {
    axios.get('http://localhost:8000/auth/user_data.php')
      .then(response => {
        console.log("Datos recibidos:", response.data);
        if (response.data.error) {
          setError(response.data.error);
        } else {
          setUserData(response.data);
        }
      })
      .catch(err => {
        console.error("Hubo un error al obtener los datos:", err);
        setError("No se pudo cargar la información.");
      });
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!userData) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h1>Perfil de Usuario</h1>
      <p><strong>Nombre:</strong> {userData.name}</p>
      <p><strong>Usuario:</strong> {userData.username}</p>
      <p><strong>Email:</strong> {userData.email}</p>
      <p><strong>Contraseña:</strong> {userData.password}</p>
      <p><strong>Género:</strong> {userData.sex}</p>
      <p><strong>Altura:</strong> {userData.height_cm} cm</p>
      <p><strong>Peso:</strong> {userData.weight_kg} kg</p>
      <p><strong>Edad:</strong> {userData.age} años</p>
      <p><strong>Nivel de actividad:</strong> {userData.activity_level}</p>
      <p><strong>Objetivo:</strong> {userData.goal}</p>
      <p><strong>Rol:</strong> {userData.role}</p>
      <p><strong>Calorias diarias:</strong> {caloriasDiarias}</p>

      
    </div>
  );
};

export default Profile;