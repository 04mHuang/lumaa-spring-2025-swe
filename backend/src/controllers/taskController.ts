import { Request, Response } from "express";
import { createTask, getTasks, updateTask, deleteTask } from "../models/task";

export const taskController = {
  createTask: async (req: Request, res: Response): Promise<any> => {
    const { userId, title, description, isComplete } = req.body;
    try {
      const response = await createTask(userId, title, description, isComplete);
      if(response) {
        return res.status(200).json({ message: "Task creation successful" });
      }
    }
    catch(err) {
      console.error("Error creating task: ", err);
      return res.status(500).json({ error: "Error creating task" });
    }
  },  
  getTasks: async (req: Request, res: Response): Promise<any> => {
    const userId = req.query.userId as string;
    if(!userId) {
      return res.status(400).json({ error: "Missing userId" });
    }
    try {
      const tasks = await getTasks(parseInt(userId));
      if(tasks) {
        return res.status(200).json(tasks);
      }
    }
    catch(err) {
      console.error("Error getting tasks: ", err);
      return res.status(500).json({ error: "Error getting tasks" });
    }
  },
  updateTask: async (req: Request, res: Response): Promise<any> => {
      const taskId = req.params.id as string;
      const parsedTaskId = parseInt(taskId);
      const { userId, title, description, isComplete } = req.body;
      const isCompleteBoolean = isComplete === true;

      if(!taskId || isNaN(parsedTaskId)) {
        return res.status(400).json({ error: "Missing taskId" });
      }
      try {
        const task = await updateTask(parsedTaskId, title, description, isCompleteBoolean);
        if(task) {
          return res.status(200);
        }
      }
      catch(err) {
        console.error("Error updating task: ", err);
        return res.status(500).json({ error: "Error updating task" });
      }
  },
  deleteTask: async (req: Request, res: Response): Promise<any> => {
      res.send('deleteTask');
  }
}