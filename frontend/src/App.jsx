import React from "react";
import { Routes, Route } from "react-router-dom";

// 🔹 Компоненти
import Navbar from "./components/Navbar";

// 🔹 Страници
import Home from "./pages/Home";
import NewTask from "./pages/NewTask";
import EditTask from "./pages/EditTask";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  return (
    <div>
      {/* Навигация */}
      <Navbar />

      {/* Основна част на страницата */}
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<NewTask />} />
          <Route path="/edit/:id" element={<EditTask />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
