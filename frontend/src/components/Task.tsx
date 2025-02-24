import { useNavigate } from "react-router-dom";

type Task = {
  task: {
    _id: string;
    title: string;
    description: string;
  }
}

export default function Task({ task }: Task) {
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate('/edit-task', { state: { task } });
  };

  return (
    <div>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <button onClick={handleEdit}>Edit</button>
      <button>Delete</button>
    </div>
  );
}