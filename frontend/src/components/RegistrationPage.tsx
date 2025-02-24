import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/Form.css";

export default function Registration() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
          await api.post('/auth/register', { username, password });
          alert("Registration successful. Please login.");
          navigate("/login");
        }
        catch(err) {
          console.error("Registration error: ", err);
          alert("Registration failed. Please try again with a different username.");
        }
    };
    
    return (
        <div className="form">
            <h1>Registration</h1>
            <form onSubmit={handleSubmit} id="registration-form" method="POST" >
                <label htmlFor="username">Username&nbsp;</label>
                <input 
                  type="text" 
                  id="username" 
                  name="username" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)} 
                  required 
                />
                <br />
                <label htmlFor="password">Password&nbsp;</label>
                <input 
                  type="password" 
                  id="password" 
                  name="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                />
                <br />
                <button type="submit">Register</button>
            </form>
        </div>
    )
}