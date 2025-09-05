import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // true ако има токен
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 text-white px-6 py-3 flex justify-between items-center">
      <Link to="/" className="text-lg font-bold">
        📔 My Diary
      </Link>
      <div className="space-x-4">
        {isLoggedIn ? (
          <>
            <Link to="/new" className="hover:underline">
              ➕ Нова задача
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
            >
              🚪 Изход
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">
              Вход
            </Link>
            <Link to="/register" className="hover:underline">
              Регистрация
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
