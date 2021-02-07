import React, { createContext, useState } from "react";

//Global state


export const TasksContext= createContext();

export const Tasks = ({ children }) => {
  const [tasks, setTasks] = useState(
[
    {
      task: "Übersicht",
      lastTask: "",
      id:0
    },
    {
      task: "Aufgabe 1",
      difficulty: "easy",
      completed: false,
      stage: 0,
      id: 1
    },{
      task: "Aufgabe 1",
      difficulty: "medium",
      completed: false,
      stage: 0,
      id: 2
    }
  ]);

  return <TasksContext.Provider value={[tasks, setTasks]}>{children}</TasksContext.Provider>;
};
