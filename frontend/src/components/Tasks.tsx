import { useNavigate } from "react-router-dom";
export default function Tasks() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  return (
      <div>
          <h1>Tasks</h1>
          <button onClick={() => navigate("/taskform")}>Create new task</button>
          <h2>user id = {userId}</h2>
      </div>
  );
}