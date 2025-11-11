import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "", remember: false });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const match = document.cookie.split("; ").find(row => row.startsWith("remember_email="));
    if (match) {
      const email = decodeURIComponent(match.split("=")[1]);
      setForm(f => ({ ...f, email, remember: true }));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      setError("Completa ambos campos.");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/auth/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.message);
        return;
      }

      // Redirigir al perfil o página principal
      navigate("/profile"); // o "/" para la página inicial
    } catch (err) {
      console.error(err);
      setError("Error de conexión con el servidor.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1e1e1e] text-white">
      <div className="bg-[#2b2b2b] p-8 rounded-2xl w-[380px] shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center text-orange-500">Log In</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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
          <label className="flex items-center text-sm gap-2">
            <input
              type="checkbox"
              name="remember"
              checked={form.remember}
              onChange={handleChange}
              className="accent-orange-500"
            />
            Recordarme
          </label>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button className="w-full bg-orange-500 hover:bg-orange-600 py-3 rounded text-white font-semibold transition">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}
