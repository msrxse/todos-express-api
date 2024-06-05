import { Router } from "express";
import * as TodoHandlers from './todos.handlers';
import { Todo } from "./todos.model";
import { validateRequest } from "../../middlewares";
import { ParamsWithId } from "../../interfaces/ParamsWithId";

const router = Router();

// {} means to request has no params, Todo[] is the response
// router.get< {}, Todo[]>('/', (req, res) => {
//   res.json([{
//     content: 'Learn Typescript',
//     done:false,
//   }]);
// });
// another way to write above
router.get('/', TodoHandlers.findAll);
router.get('/:id',
  validateRequest({
    params:ParamsWithId,
  }),
  TodoHandlers.findOne,
);
router.post(
  '/',
  validateRequest({ body: Todo }), // middleware ensures body is of type Todo!
  TodoHandlers.createOne,
);
router.put(
  '/:id',
  validateRequest({
    params: ParamsWithId,
    body: Todo,
  }),
  TodoHandlers.updateOne,
);

export default router;

