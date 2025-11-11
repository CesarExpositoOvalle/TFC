import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Navigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [editData, setEditData] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  // ==== CARGAR DATOS DEL USUARIO ====
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/auth/user_data.php`,
          { withCredentials: true }
        );

        if (res.data && res.data.error) {
          // Marca para redirigir de forma declarativa
          setRedirectToLogin(true);
        } else {
          setUserData(res.data);
          setEditData(res.data);
        }
      } catch {
        setRedirectToLogin(true); // Redirige si falla la conexión
      }
    };

    fetchUser();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
    setSuccess("");
    setError("");
  };

  const handleSave = async () => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/auth/update_user.php`,
        editData,
        { withCredentials: true }
      );
      if (res.data.success) {
        setSuccess("Datos actualizados correctamente ✅");
        setUserData(editData);
      } else setError(res.data.message);
    } catch {
      setError("Error al guardar los cambios.");
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/logout.php`,
        {},
        { withCredentials: true }
      );
    } catch {}
    navigate("/login"); // Redirige al login tras cerrar sesión
  };

  // Si detectamos que no hay sesión, redirigimos al login de forma declarativa
  if (redirectToLogin) return <Navigate to="/login" replace />;

  if (error) return <div className="text-red-500 p-6">{error}</div>;
  if (!userData) return <div className="text-gray-300 p-6">Cargando...</div>;

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-white flex justify-center py-10">
      <div className="bg-[#2b2b2b] p-8 rounded-2xl shadow-xl w-[500px]">
        <h2 className="text-3xl font-bold text-center text-orange-500 mb-6">
          Perfil de Usuario
        </h2>

        {/* Formulario editable */}
        <div className="space-y-4">
          {["nombre_usuario", "correo", "edad", "altura_cm", "peso_kg"].map(
            (f) => (
              <div key={f}>
                <label className="block text-sm mb-1">{f.replace("_", " ")}</label>
                <input
                  type={f.includes("edad") || f.includes("altura") || f.includes("peso") ? "number" : "text"}
                  name={f}
                  value={editData[f] ?? ""}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-[#1a1a1a] border border-gray-600 focus:border-orange-500 outline-none"
                />
              </div>
            )
          )}

          {/* Selects para actividad, objetivo y género */}
          {[
            { name: "actividad", options: ["sedentario","ligero","moderado","intenso","muy_intenso"] },
            { name: "objetivo", options: ["mantener_peso","bajar_peso","ganar_musculo"] },
            { name: "genero", options: ["male","female"] }
          ].map((s) => (
            <div key={s.name}>
              <label className="block text-sm mb-1">{s.name}</label>
              <select
                name={s.name}
                value={editData[s.name] || ""}
                onChange={handleChange}
                className="w-full p-2 rounded bg-[#1a1a1a] border border-gray-600 focus:border-orange-500 outline-none"
              >
                <option value="">Seleccionar...</option>
                {s.options.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </div>
          ))}
        </div>

        {/* Mensajes */}
        {error && <p className="text-red-500 mt-3">{error}</p>}
        {success && <p className="text-green-500 mt-3">{success}</p>}

        {/* Botones */}
        <div className="flex justify-between mt-6">
          <button
            onClick={handleSave}
            className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded font-semibold transition"
          >
            Guardar Cambios
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded font-semibold transition"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
}
