import { useNavigate } from "react-router-dom";
import api from "../services/api";

type Task = {
  task: {
    id: string;
    title: string;
    description: string;
  },
  getTaskList: () => Promise<void>;
}

export default function Task({ task, getTaskList }: Task) {
  const navigate = useNavigate();
  
  const handleEdit = () => {
    navigate("/edit-task", { state: { task } });
  };
  const handleDelete = async () => {
    try {
      const response = await api.delete(`/tasks/${task.id}`);
      if (response.data) {
        alert("Deleted task successfully.");
        getTaskList();
      }
    }
    catch(err) {
      console.error("Error deleting task:", err);
    }
    
  }; 

  return (
    <div>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}