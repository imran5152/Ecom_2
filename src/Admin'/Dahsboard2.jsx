import React, { useState } from "react";
import { useTasks } from "../TaskContext";

const Dashboard2 = () => {
  const { assignTask, tasks: contextTasks } = useTasks();

  const [email, setEmail] = useState("");
  const [taskText, setTaskText] = useState("");
  const [status, setStatus] = useState("Pending");
  const [dueDate, setDueDate] = useState("");

  const handleAssign = () => {
    if (!email || !taskText || !dueDate) return;

    const newTask = {
      id: contextTasks.length ? contextTasks[contextTasks.length - 1].id + 1 : 1,
      email,
      task: taskText,
      status,
      dueDate,
    };

    assignTask(newTask);

    setEmail("");
    setTaskText("");
    setStatus("Pending");
    setDueDate("");
  };

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white rounded shadow mt-20">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      <input
        type="email"
        placeholder="User Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 rounded mb-2 w-full"
      />
      <input
        type="text"
        placeholder="Task Description"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        className="border p-2 rounded mb-2 w-full"
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border p-2 rounded mb-2 w-full"
      >
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="border p-2 rounded mb-4 w-full"
      />

      <button
        onClick={handleAssign}
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Assign Task
      </button>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">All Tasks</h2>
        {contextTasks.length === 0 && <p>No tasks assigned yet.</p>}
        <ul>
          {contextTasks.map((task) => (
            <li key={task.id} className="mb-2 border p-2 rounded">
              <b>{task.email}</b>: {task.task} -{" "}
              <span>{task.status}</span> (Due: {task.dueDate})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard2;
