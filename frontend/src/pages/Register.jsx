import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

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
      setError("Completa todos los campos.");
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
      if (data.success) {
        setSuccess(data.message);
        setTimeout(() => navigate("/login"), 1500); // redirige al login
      } else {
        setError(data.message || "Error al registrar usuario.");
      }
    } catch {
      setError("Error de conexión con el servidor.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1e1e1e] text-white">
      <div className="bg-[#2b2b2b] p-8 rounded-2xl w-[380px] shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center text-orange-500">Register</h2>
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
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 rounded bg-[#1a1a1a] border border-gray-600 focus:border-orange-500 outline-none"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 rounded bg-[#1a1a1a] border border-gray-600 focus:border-orange-500 outline-none"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}
          <button className="w-full bg-orange-500 hover:bg-orange-600 py-3 rounded text-white font-semibold transition">
            Register
          </button>
        </form>

        {/* Enlace a Login */}
        <p className="text-center text-sm mt-4 text-gray-300">
          Ya tienes cuenta?{" "}
          <Link to="/login" className="text-orange-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
