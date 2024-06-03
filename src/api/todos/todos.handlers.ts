import { NextFunction, Request, Response } from "express";
import { Todos, TodoWithId } from "./todos.model";

export async function findAll(req: Request, res: Response<TodoWithId[]>, next: NextFunction)  {
  try {
    const result = Todos.find();
    const todos = await result.toArray();
    res.json(todos);
  } catch (error) {
    // this gets catch by the error handler
    // here: `src/middlewares.ts
    next(error);
  }
}
