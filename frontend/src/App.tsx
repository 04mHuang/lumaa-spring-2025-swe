import { createBrowserRouter, RouterProvider, Link, Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { logout } from "./services/api";
import Registration from "./components/Registration";
import Login from "./components/Login";
import Tasks from "./components/Tasks";
import TaskForm from "./components/TaskForm";
import "./App.css";

type LoginProps = {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}

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