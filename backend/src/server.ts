import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { pool } from "./db/db.config";
import { userController } from "./controllers/userController";

// setting up server
const app = express();
const router = express.Router();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);

router.get("/", (req: Request, res: Response) => {
  res.json({ message: "Connected to server" });
});

// open server on port
const port: string | number = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`⭐ Server running on port ${port}`);
});

// check database connection
(async () => {
  try {
    await pool.connect();
    console.log("✅ Connected to PostgreSQL");
  } catch(err) {
    console.error("❌ Database connection error:", err);
  }
})();

// handle graceful exit of server and database
process.on("SIGINT", () => {
  server.close(async () => {
    console.log("Server closed.");
    try {
      await pool.end();
      console.log("Database instance closed.");
    }
    catch(err) {
      console.error("Error disconnecting database instance: ", err);
    }
  });
  process.exit(0);
});

// router handlers for user
router.post("/auth/register", userController.registerUser);
router.post("/auth/login", userController.loginUser);

// router handlers for tasks
// router.get("/tasks", auth, taskController.getTasks);