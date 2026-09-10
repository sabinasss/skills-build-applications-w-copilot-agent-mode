import { Router } from 'express';
import type { Model } from 'mongoose';

export function createCrudRouter<T>(model: Model<T>, options?: { sort?: Record<string, 1 | -1> }): Router {
  const router = Router();

  router.get('/', async (_request, response, next) => {
    try {
      const documents = await model.find().sort(options?.sort ?? {}).lean();
      response.json(documents);
    } catch (error) {
      next(error);
    }
  });

  router.post('/', async (request, response, next) => {
    try {
      const document = await model.create(request.body);
      response.status(201).json(document);
    } catch (error) {
      next(error);
    }
  });

  return router;
}
