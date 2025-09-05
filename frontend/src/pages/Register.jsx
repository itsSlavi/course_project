import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/register", form);
      navigate("/login"); // след регистрация → логин
    } catch (err) {
      setError(err.response?.data?.message || "❌ Регистрацията неуспешна");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded">
      <h1 className="text-xl font-bold mb-4">Регистрация</h1>
      {error && <p className="text-red-600">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="username"
          placeholder="Потребителско име"
          value={form.username}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          type="email"
          name="email"
          placeholder="Имейл"
          value={form.email}
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
          className="bg-green-600 text-white px-4 py-2 rounded w-full"
        >
          Регистрация
        </button>
      </form>
    </div>
  );
}
