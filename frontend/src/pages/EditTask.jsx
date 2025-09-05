import React from "react";
import { useParams } from "react-router-dom";
import TaskForm from "../components/TaskForm";

export default function EditTask() {
  const { id } = useParams();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">✏️ Редактиране на задача</h1>
      <TaskForm isEdit={true} id={id} />
    </div>
  );
}
