import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Hacer la solicitud GET al backend
    axios.get('http://localhost/path/to/getUser.php') // Asegúrate de que la URL sea correcta
      .then(response => {
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
      <p><strong>Altura:</strong> {userData.height_cm} cm</p>
      <p><strong>Peso:</strong> {userData.weight_kg} kg</p>
      <p><strong>Edad:</strong> {userData.age} años</p>
      <p><strong>Nivel de actividad:</strong> {userData.activity_level}</p>
      <p><strong>Objetivo:</strong> {userData.goal}</p>
    </div>
  );
};

export default Profile;
