import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api"; // 🟢 вместо axios

export default function TaskForm({ isEdit }) {
  const [task, setTask] = useState({ title: "", description: "", completed: false });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (isEdit && id) {
      API.get(`/tasks/${id}`)
        .then(res => setTask(res.data))
        .catch(err => console.error(err));
    }
  }, [isEdit, id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      API.put(`/tasks/${id}`, task)
        .then(() => navigate("/"));
    } else {
      API.post("/tasks", task)
        .then(() => navigate("/"));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="text"
        placeholder="Заглавие"
        value={task.title}
        onChange={e => setTask({ ...task, title: e.target.value })}
        className="border p-2 w-full"
      />
      <textarea
        placeholder="Описание"
        value={task.description}
        onChange={e => setTask({ ...task, description: e.target.value })}
        className="border p-2 w-full"
      />
      <label className="flex items-center">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={e => setTask({ ...task, completed: e.target.checked })}
          className="mr-2"
        />
        Завършена
      </label>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        {isEdit ? "Запази" : "Създай"}
      </button>
    </form>
  );
}
