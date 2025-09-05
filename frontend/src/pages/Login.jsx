import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/login", form);
      localStorage.setItem("token", res.data.token); // 🟢 запазваме токена
      navigate("/"); // към Home след логин
    } catch (err) {
      setError(err.response?.data?.message || "❌ Грешен имейл или парола");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded">
      <h1 className="text-xl font-bold mb-4">Вход</h1>
      {error && <p className="text-red-600">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="username"
          name="username"
          placeholder="Имейл"
          value={form.username}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          type="password"
          name="password"
          placeholder="Парола"
          value={form.password}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          Вход
        </button>
      </form>
    </div>
  );
}
