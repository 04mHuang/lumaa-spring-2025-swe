import * as dotenv from "dotenv";
dotenv.config();
import { Client, Pool } from "pg";

export const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT) || 5432
});

// export const query = async (text: string, values?: any[]) => {
//   try {
//     const res = await pool.query(text, values);
//     return res;
//   }
//   catch(err) {
//     console.error("Database error: ", err);
//     throw err;
//   }
// };