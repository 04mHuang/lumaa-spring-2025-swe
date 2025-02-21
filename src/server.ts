import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { pool } from "./db/db.config";

// setting up server
const app = express();
const router = express.Router();
app.use(cors({
  origin: "http://localhost:3000"
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

router.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello, World!" });
});

// open server on port
const port: string | number = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
// handle graceful exit of server and database
// process.on("SIGINT", () => {
//   server.close(async () => {
//     console.log("Server closed.");
//     try {
//       await pool.end();
//       console.log("Database instance closed.");
//     }
//     catch(e) {
//       console.error("Error disconnecting database instance: ", e);
//     }
//   });
//   process.exit(0);
// });

// database testing
(async () => {
  try {
    await pool.connect();
    console.log('✅ Connected to PostgreSQL');
  } catch (err) {
    console.error('❌ Database connection error:', err);
  }
})();