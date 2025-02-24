import { useState } from "react";
import api from "../services/api";
export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
          const response = await api.post('/auth/login', { username, password });
          if(response.data.token) {
            localStorage.setItem("token", response.data.token);
            alert("Login successful!");
          }
          else {
            alert("Login failed. Please try again.");
          }
          // console.log(`Token ${localStorage.getItem("token")}`);
          // console.log(`Data ${response.data.token}`);
        }
        catch(err) {
          console.error("Login error: ", err);
          alert("Login failed. Please try again.");
        }
    };
    
    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit} id="login-form" method="POST" >
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
                <button type="submit">Login</button>
            </form>
            <h2>Username: {username}</h2>
        </div>
    )
}