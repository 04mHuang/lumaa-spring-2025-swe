import { useState } from "react";
import axios from "axios";
export default function Registration() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    // const handleSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault();
    //     try {
    //       const response = await api.post('/auth/register', { username, password });
    //       console.log(response.data);
    //     }
    // };
    
    const test = async () => {
        try {
            const response = await axios.get("/api/test");
            console.log("-----------------------------")
            console.log(response.data.message);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <h1>Registration</h1>
            <button onClick={test}>Test</button>
            {/* <form onSubmit={handleSubmit} id="registration-form" method="POST" >
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" />
                <button type="submit">Register</button>
            </form> */}
        </div>
    )
}