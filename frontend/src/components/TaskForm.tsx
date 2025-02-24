import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function TaskForm() {
  const userId = localStorage.getItem("userId");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        const response = await api.post('/tasks', { userId, title, description, isComplete });
        if(response.data.token) {
          alert("Created task successfully.");
        }
        navigate("/tasks");
      }
      catch(err) {
        console.error("Task creation: ", err);
        alert("Task creation failed. Please try again.");
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
          <input 
            type="textarea" 
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
          <button type="submit">Create</button>
      </form>
    </div>
  );
}