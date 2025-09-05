import React from "react";
import { Link } from "react-router-dom";

export default function TaskItem({ task }) {
  return (
    <div className="border p-3 mb-2 rounded-lg shadow-sm">
      <h3 className="font-semibold">{task.title}</h3>
      <p>{task.description}</p>
      <span className={task.completed ? "text-green-600" : "text-red-600"}>
        {task.completed ? "Завършена" : "В процес"}
      </span>
      <div className="mt-2">
        <Link to={`/edit/${task.id}`} className="text-blue-500 hover:underline">
          Редактирай
        </Link>
      </div>
    </div>
  );
}
