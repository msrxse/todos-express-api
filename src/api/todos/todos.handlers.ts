import { NextFunction, Request, Response } from "express";
import { Todo, Todos, TodoWithId } from "./todos.model";

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

export async function createOne(req: Request<{}, TodoWithId, Todo>, res: Response<TodoWithId>, next: NextFunction)  {
  try {   
    // it is save to use req.body because our validator ensured it was correct
    const insertResult = await Todos.insertOne(req.body);
    if (!insertResult.acknowledged) throw new Error('Error inserting todo!');
    res.status(201);
    res.json({
      _id: insertResult.insertedId,
      ...req.body,
    });
  } catch (error) {
    next(error);
  }
}