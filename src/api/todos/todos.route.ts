import { Router } from "express";
import * as TodoHandlers from './todos.handlers';

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
router.post('/', TodoHandlers.createOne);

export default router;

