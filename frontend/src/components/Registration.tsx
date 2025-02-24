import { useState } from "react";
// import axios from "axios";
import api from "../services/api";
export default function Registration() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
          const response = await api.post('/auth/register', { username, password });
          // console.log(response.data);
          localStorage.setItem("token", response.data.token);
          alert("Registration successful. Please login.");
        }
        catch(err) {
          console.error("Registration error: ", err);
          alert("Registration failed. Please try again with a different username.");
        }
    };
    
    return (
        <div>
            <h1>Registration</h1>
            <form onSubmit={handleSubmit} id="registration-form" method="POST" >
                <label htmlFor="username">Username</label>
                <input 
                  type="text" 
                  id="username" 
                  name="username" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)} 
                  required 
                />
                <label htmlFor="password">Password</label>
                <input 
                  type="password" 
                  id="password" 
                  name="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                />
                <button type="submit">Register</button>
            </form>
        </div>
    )
}