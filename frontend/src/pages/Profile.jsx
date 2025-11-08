import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  // Función para calcular calorías diarias según datos del usuario
  const calcularCaloriasDiarias = (userData) => {
    if (!userData) return 0;

    const { genero, altura_cm, peso_kg, edad, actividad, objetivo } = userData;
    const peso = parseFloat(peso_kg);

    let TMB = genero === "male"
      ? (10 * peso) + (6.25 * altura_cm) - (5 * edad) + 5
      : (10 * peso) + (6.25 * altura_cm) - (5 * edad) - 161;

    const factoresActividad = {
      sedentario: 1.2,
      ligero: 1.375,
      moderado: 1.55,
      intenso: 1.725,
      muy_intenso: 1.9
    };

    let calorias = TMB * (factoresActividad[actividad] || 1.2);

    if (objetivo === "bajar_peso") calorias -= 400;
    if (objetivo === "ganar_musculo") calorias += 400;

    return Math.round(calorias);
  };

  // Función para calcular macros diarias
  const calcularMacrosDiarios = (userData, caloriasDiarias) => {
    if (!userData || !caloriasDiarias) return { proteinas: 0, grasas: 0, carbohidratos: 0 };

    const peso = parseFloat(userData.peso_kg);

    // Proteínas: 2 g por kg de peso
    const proteinas = Math.round(peso * 2); // en gramos

    // Grasas: 25% de las calorías totales, 1g de grasa = 9 kcal
    const grasas = Math.round((caloriasDiarias * 0.25) / 9);

    // Carbohidratos: calorías restantes, 1g carbohidrato = 4 kcal
    const caloriasProteinas = proteinas * 4;
    const caloriasGrasas = grasas * 9;
    const carbohidratos = Math.round((caloriasDiarias - caloriasProteinas - caloriasGrasas) / 4);

    return { proteinas, grasas, carbohidratos };
  };

  // Obtener datos del usuario desde el backend
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/auth/user_data.php`)
      .then(response => {
        console.log("Datos recibidos:", response.data);
        if (response.data.error) {
          setError(response.data.error);
        } else {
          setUserData(response.data);
        }
      })
      .catch(err => {
        console.error("Error al obtener datos:", err);
        setError("No se pudo cargar la información del usuario.");
      });
  }, []);

  if (error) return <div>{error}</div>;
  if (!userData) return <div>Cargando...</div>;

  const caloriasDiarias = calcularCaloriasDiarias(userData);
  const { proteinas, grasas, carbohidratos } = calcularMacrosDiarios(userData, caloriasDiarias);

  return (
    <div>
      <h1>Perfil de Usuario</h1>
      <p><strong>ID:</strong> {userData.id}</p>
      <p><strong>Nombre de usuario:</strong> {userData.nombre_usuario}</p>
      <p><strong>Correo:</strong> {userData.correo}</p>
      <p><strong>Contraseña:</strong> {userData.contrasena}</p>
      <p><strong>Edad:</strong> {userData.edad} años</p>
      <p><strong>Altura:</strong> {userData.altura_cm} cm</p>
      <p><strong>Peso:</strong> {userData.peso_kg} kg</p>
      <p><strong>Actividad:</strong> {userData.actividad}</p>
      <p><strong>Objetivo:</strong> {userData.objetivo}</p>
      <p><strong>Género:</strong> {userData.genero}</p>
      <p><strong>Rol:</strong> {userData.rol}</p>
      <p><strong>Calorías diarias:</strong> {caloriasDiarias} kcal</p>
      <p><strong>Proteínas diarias:</strong> {proteinas} g</p>
      <p><strong>Grasas diarias:</strong> {grasas} g</p>
      <p><strong>Carbohidratos diarios:</strong> {carbohidratos} g</p>
      <p><strong>Fecha de registro:</strong> {userData.fecha_registro}</p>
    </div>
  );
};

export default Profile;
