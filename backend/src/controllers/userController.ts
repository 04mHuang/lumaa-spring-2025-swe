import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { createUser, getLoginCredentials } from "../models/user";
import { Request, Response } from "express";

dotenv.config();

const generateToken = (userId: number) => {
  const jwtSecretKey = process.env.JWT_SECRET_KEY;
  // check if the secret key is valid
  if(jwtSecretKey) {
    return jwt.sign({ userId }, jwtSecretKey, { expiresIn: "1h" });
  }
  throw new Error("JWT_SECRET_KEY is not defined in environment variables. Try source .env");
};

export const userController = {
  registerUser : async (req: Request, res: Response): Promise<any> => {
    try {
      const { username, password } = req.body;
      // check if another user has specified username
      const existingUser = await getLoginCredentials(username);
      if (existingUser) {
        return res.status(400).json({ error: "Username already in use" });
      }
      // hash the password
      const saltRounds : number = 10;
      const salt : string = await bcrypt.genSalt(saltRounds);
      const hashedPassword : string = await bcrypt.hash(password, salt);
      // store the user in the database
      await createUser(username, hashedPassword);
      return res.status(200).json({ message: "Registered successfully" });
    }
    catch(err) {
      console.error("Error registering user: ", err);
      res.status(500).json({ error: "Error registering user" });
    }
  },
  loginUser : async (req: Request, res: Response): Promise<any> => {
    try {
      const { username, password } = req.body;
      const user = await getLoginCredentials(username);
      // check validity of login credentials
      if (!user) {
        return res.status(200).json({ error: "Invalid username or password" });
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(200).json({ error: "Invalid username or password" });
      }
      // generate and provide client JWT token
      const token = generateToken(user.id);
      return res.status(200).json({ message: "Login successful", token, userId: user.id });
    }
    catch(err) {
      console.error("Error logging in user: ", err);
      res.status(500).json({ error: "Error logging in user" });
    }
  }
};

// export default userController;