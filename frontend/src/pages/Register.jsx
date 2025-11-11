import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.username || !form.email || !form.password) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/auth/register.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });

      const data = await res.json();
      console.log("Register response:", data);

      if (data.success) {
        setSuccess("Registro exitoso. Redirigiendo al login...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError(data.message || "Error al registrar usuario.");
      }
    } catch (err) {
      console.error(err);
      setError("Error de conexión con el servidor.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1e1e1e] text-white">
      <div className="bg-[#2b2b2b] p-8 rounded-2xl w-[380px] shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center text-orange-500">Registro</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Nombre de usuario"
            value={form.username}
            onChange={handleChange}
            className="w-full p-3 rounded bg-[#1a1a1a] border border-gray-600 focus:border-orange-500 outline-none"
          />
          <input
            type="email"
            name="email"
            placeholder="Correo"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 rounded bg-[#1a1a1a] border border-gray-600 focus:border-orange-500 outline-none"
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 rounded bg-[#1a1a1a] border border-gray-600 focus:border-orange-500 outline-none"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 py-3 rounded text-white font-semibold transition"
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
}
