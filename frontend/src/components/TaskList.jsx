import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskItem from "./Taskitem";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/tasks")
      .then(res => setTasks(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-3">Мойте задачи</h2>
      {tasks.length > 0 ? (
        tasks.map(task => <TaskItem key={task.id} task={task} />)
      ) : (
        <p>Няма създадени задачи.</p>
      )}
    </div>
  );
}
