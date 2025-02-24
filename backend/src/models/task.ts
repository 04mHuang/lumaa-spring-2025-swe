import { query } from "../db/db.config";

export const getTasks = async (userId : number) => {
  const text = "SELECT * FROM tasks WHERE user_id = $1";
  const values = [userId];
  const result = await query(text, values);
  return result.rows[0];
};
export const createTask = async (userId: number, title: string, description: string, isComplete: boolean) => {
  const text = "INSERT INTO tasks (userid, title, description, iscomplete) VALUES ($1, $2, $3, $4) RETURNING *";
  const values = [userId, title, description, isComplete];
  const result = await query(text, values);
  return result.rows[0];
};
export const updateTask = async (taskId : number, task : string) => {
  const text = "UPDATE tasks SET task = $1 WHERE id = $2 RETURNING *";
  const values = [task, taskId];
  const result = await query(text, values);
  return result.rows[0];
};
export const deleteTask = async (taskId : number) => {
  const text = "DELETE FROM tasks WHERE id = $1 RETURNING *";
  const values = [taskId];
  const result = await query(text, values);
  return result.rows[0];
};