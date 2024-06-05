import { ObjectId } from "mongodb";
import * as z from "zod";
/**
 * This file export a Zod validator and an interface
 * Validations for params on the getOne todo endpoint
 * are that id is a string and it isnt empty
 */
export const ParamsWithId = z.object({
  id: z.string().min(1).refine(val => {
    try {
      return new ObjectId(val);
    } catch (error) {
      return false;
    }
  }, {
    message: 'Invalid ObjectId',
  }),
});

export type ParamsWithId = z.infer<typeof ParamsWithId>;
