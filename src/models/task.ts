import { query } from "../db/db.config";

// export const getTasks = async (userId : number) => {
//   const text = "SELECT * FROM tasks WHERE user_id = $1";
//   const values = [userId];
//   const result = await query(text, values);
//   return result.rows[0];
// };