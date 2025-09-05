import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api"; //

export default function Home() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    API.get("/tasks")
      .then((res) => setTasks(res.data))
      .catch((err) => console.error("❌ Error loading tasks:", err.response?.data || err.message));
  }, []);

  const handleDelete = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      setTasks(tasks.filter((t) => t.id !== id));
    } catch (err) {
      console.error("❌ Error deleting task:", err.response?.data || err.message);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Задачи</h1>
      <Link to="/new" className="bg-green-600 text-white px-4 py-2 rounded">
        ➕ Нова задача
      </Link>
      <ul className="mt-4 space-y-2">
        {tasks.map((task) => (
          <li key={task.id} className="border p-3 flex justify-between items-center">
            <div>
              <h2 className="font-semibold">{task.title}</h2>
              <p>{task.description}</p>
              <p className={task.completed ? "text-green-600" : "text-red-600"}>
                {task.completed ? "Завършена" : "Незавършена"}
              </p>
            </div>
            <div className="flex space-x-2">
              <Link
                to={`/edit/${task.id}`}
                className="bg-blue-600 text-white px-3 py-1 rounded"
              >
                ✏️ Редактирай
              </Link>
              <button
                onClick={() => handleDelete(task.id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                🗑️ Изтрий
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
