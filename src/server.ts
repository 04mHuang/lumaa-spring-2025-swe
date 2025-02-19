import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";

// setting up app
const app = express();
const router = express.Router();
app.use(cors({
  origin: "http://localhost:3000"
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello, World!" });
});

const port: string | number = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});