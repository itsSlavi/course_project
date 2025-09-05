import React from "react";
import TaskForm from "../components/TaskForm";

export default function NewTask() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-3">Нова задача</h2>
      <TaskForm isEdit={false} />
    </div>
  );
}
