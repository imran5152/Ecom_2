import React, { useState } from "react";
import { useTasks } from "../TaskContext";
import UserDashbo from "./Userdah"; 

const UserDashboard = () => {
  const { tasks, updateTaskStatus } = useTasks();
  const [userEmail, setUserEmail] = useState("");

  const userTasks = tasks.filter(
    (task) => task.email.toLowerCase().trim() === userEmail.toLowerCase().trim()
  );

  return (
    <div className="p-8 max-w-4xl mx-auto bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-3xl font-extrabold mb-8 text-indigo-700 border-b pb-2">
        User Dashboard
      </h2>

      <input
        type="email"
        placeholder="Enter your email"
        className="w-full p-3 border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-10"
        value={userEmail}
        onChange={(e) => setUserEmail(e.target.value)}
      />

      {userTasks.length === 0 ? (
        <p className="text-center text-gray-500 italic text-lg mt-10">
          No tasks assigned or email not found.
        </p>
      ) : (
        <ul className="space-y-6">
          {userTasks.map((task) => (
            <li
              key={task.id}
              className="bg-white p-6 border border-gray-200 rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <p className="text-lg font-semibold text-gray-800 mb-2">
                Task: <span className="font-normal">{task.task}</span>
              </p>
              <p className="text-md mb-2">
                Status:{" "}
                <span
                  className={`inline-block px-2 py-1 rounded text-white text-sm font-medium ${
                    task.status === "Pending"
                      ? "bg-yellow-500"
                      : task.status === "In Progress"
                      ? "bg-blue-500"
                      : "bg-green-600"
                  }`}
                >
                  {task.status}
                </span>
              </p>
              <p className="text-md mb-4">
                Due: <span className="font-medium">{task.dueDate}</span>
              </p>

              <select
                className="border border-indigo-300 rounded-md p-2 w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                value={task.status}
                onChange={(e) => updateTaskStatus(task.id, e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </li>
          ))}
        </ul>
      )}
      <UserDashbo />
    </div>
  );
};

export default UserDashboard;
