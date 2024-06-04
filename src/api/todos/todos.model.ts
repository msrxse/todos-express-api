// The interface that describes the todos that we are having in this API
import * as z from "zod";
import { db } from '../../db';
import { WithId } from "mongodb";

/**
 * In typescript
 * You are allowed to export 2 things with the same name if:
 *  - one is a type 
 *  - the other is the schema validator
 */
export const Todo = z.object({
  content: z.string().min(1),
  done: z.boolean().default(false),
});

export type Todo = z.infer<typeof Todo>;
export type TodoWithId = WithId<Todo>;
export const Todos = db.collection<Todo>('todos');