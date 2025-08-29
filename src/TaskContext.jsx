import React, { createContext, useContext, useState, useEffect } from "react";

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const assignTask = (newTask) => {
    setTasks((prev) => [...prev, newTask]);
  };

  return (
    <TaskContext.Provider value={{ tasks, assignTask }}>
      {children}
    </TaskContext.Provider>
  );
};
