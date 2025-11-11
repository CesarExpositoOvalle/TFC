import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate(); // <-- hook para redireccionar

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.username || !form.email || !form.password) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/auth/register.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        credentials: "include",
      });

      const data = await res.json();

      if (data.success) {
        setSuccess("Cuenta creada correctamente. Redirigiendo...");
        // Redirigir a la página inicial o perfil después de 1 segundo
        setTimeout(() => {
          navigate("/profile"); // o "/" para la página inicial
        }, 1000);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Error de conexión con el servidor.");
      console.error(err);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1e1e1e] text-white">
      <div className="bg-[#2b2b2b] p-8 rounded-2xl w-[380px] shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center text-orange-500">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full p-3 rounded bg-[#1a1a1a] border border-gray-600 focus:border-orange-500 outline-none"
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
          />
          <input
            className="w-full p-3 rounded bg-[#1a1a1a] border border-gray-600 focus:border-orange-500 outline-none"
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
          <input
            className="w-full p-3 rounded bg-[#1a1a1a] border border-gray-600 focus:border-orange-500 outline-none"
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}
          <button className="w-full bg-orange-500 hover:bg-orange-600 py-3 rounded text-white font-semibold transition">
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}
