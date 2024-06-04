import { NextFunction, Request, Response } from "express";
import { Todo, Todos, TodoWithId } from "./todos.model";
import { ZodError } from "zod";

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
    const validateResult = await Todo.parseAsync(req.body);
    const insertResult = await Todos.insertOne(validateResult);
    if (!insertResult.acknowledged) throw new Error('Error inserting todo!');
    res.status(201);
    res.json({
      _id: insertResult.insertedId,
      ...validateResult,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(422);
    }
    next(error);
  }
}