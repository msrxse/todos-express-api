import { Request, Response, Router } from "express";
import { Todos, TodoWithId } from './todos.model';

const router = Router();

// {} means to request has no params, Todo[] is the response
// router.get< {}, Todo[]>('/', (req, res) => {
//   res.json([{
//     content: 'Learn Typescript',
//     done:false,
//   }]);
// });
// another way to write above
router.get('/', async (req: Request, res: Response<TodoWithId[]>) => {
  const result = await Todos.find();
  const todos = await result.toArray();
  res.json(todos);

  // res.json([{
  //   content: 'Learn Typescript',
  //   done:false,
  // }]);
});

export default router;

