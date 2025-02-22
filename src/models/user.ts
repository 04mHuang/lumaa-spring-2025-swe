import { query } from "../db/db.config";

export const createUser = async (username: string, password: string) => {
  const text = "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *";
  const values = [username, password];
  const result = await query(text, values);
  return result.rows[0];
};
export const getLoginCredentials = async (username: string) => {
  const text = "SELECT * FROM users WHERE username = $1";
  const values = [username];
  const result = await query(text, values);
  return result.rows[0];
};