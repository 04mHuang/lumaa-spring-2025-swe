import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../services/api";
import Task from "./Task";
import "../styles/Task.css";

type Task = {
  id: string;
  title: string;
  description: string;
  iscomplete: boolean;
  userId: string;
};

export default function Tasks() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);
  const userId = localStorage.getItem("userId");
  
  const getTaskList = async () => {
    try {
      const response = await api.get(`/tasks?userId=${userId}`);
      setTasks(response.data);
    }
    catch(err) {
      console.error("Error retrieving tasks:", err);
    }
  }; 
  useEffect(() => {
    getTaskList();
  }, []);
  return (
      <div id="task-page">
          <div id="task-header">
            <h1>Tasks</h1>
            <button onClick={() => navigate("/create-task")}>New Task</button>
          </div>
          {tasks.map((task) => (
              <Task key={task.id} task={task} getTaskList={getTaskList} />
          ))}
      </div>
  );
}