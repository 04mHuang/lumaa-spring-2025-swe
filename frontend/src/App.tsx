import { createBrowserRouter, RouterProvider, Link, Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "./services/api";
import Registration from "./components/Registration";
import Login from "./components/Login";
import Tasks from "./components/Tasks";
import TaskForm from "./components/TaskForm";
import "./App.css";

type LoginProps = {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}
const logout =  () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  delete api.defaults.headers.common["Authorization"];
  alert("You have been logged out.");
};

const NavLayout = ({ isLoggedIn, setIsLoggedIn } : LoginProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    if(!isLoggedIn) {
      navigate("/login");
    }
    else {
      navigate("/tasks");
    }
  },[isLoggedIn, navigate]);
  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <div>
      <nav>
        {!isLoggedIn ? (
          <>
            <Link to="/registration">Register</Link>
            <Link to="/login">Login</Link>
          </>
        ) : (
          <>
            <Link to="/tasks">Tasks</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </nav>
      <Outlet />
    </div>
  );
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // if a user is logged in and reloads the page, keeps them logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    
    if (token && userId) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setIsLoggedIn(true);
    }
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <NavLayout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />,
      children: [
        {
          path: "/registration",
          element: <Registration />,
        },
        {
          path: "/login",
          element: <Login setIsLoggedIn={setIsLoggedIn} />,
        },
        {
          path: "/tasks",
          element: <Tasks />,
        },
        {
          path: "/taskform",
          element: <TaskForm />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}