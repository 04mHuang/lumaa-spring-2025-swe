import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../services/api";

type TaskForm = {
  mode: "create" | "edit";
}

export default function TaskForm({ mode }: TaskForm) {
  const userId = localStorage.getItem("userId");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const navigate = useNavigate();
  // get task through navigation
  const location = useLocation();
  const task = location.state?.task;
  // pre-fill input fields if editing task
  useEffect(() => {
    if(mode === "edit" && task) {
      setTitle(task.title);
      setDescription(task.description);
      setIsComplete(task.isComplete);
    }
  }, [mode, task]);

  // submission handler executes differently based on mode
  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        if(mode === "edit") {
          const response = await api.put(`/tasks/${task.id}`, { title, description, isComplete });
          if(response.data) {
            alert("Updated task successfully.");
          }
        }
        else {
          const response = await api.post('/tasks', { userId, title, description, isComplete });
          if(response.data) {
            alert("Created task successfully.");
          }
        }
        navigate("/tasks");
      }
      catch(err) {
        console.error(`Task ${mode}: `, err);
        alert(`Task ${mode} failed. Please try again.`);
      }
  };

  return (
    <div>
      <h1>Task Form</h1>
      <form onSubmit={handleSubmit} id="login-form" method="POST" >
          <label htmlFor="title">Title *</label>
          <input 
            type="text" 
            id="title" 
            name="title" 
            value={title}
            onChange={(e) => setTitle(e.target.value)} 
            required 
          />
          <label htmlFor="description">Description</label>
          <textarea
            id="description" 
            name="description" 
            value={description}
            onChange={(e) => setDescription(e.target.value)} 
          />
          <label htmlFor="isComplete">Is this task complete?</label>
          <input 
            type="checkbox" 
            id="isComplete" 
            name="isComplete" 
            onChange={() => setIsComplete(true)} 
          />
          <button type="submit">Save</button>
      </form>
    </div>
  );
}