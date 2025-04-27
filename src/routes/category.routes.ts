import { FastifyInstance } from 'fastify';
import * as categoryController from '../controllers/category.controller';
import {
  getCategoriesSchema,
  getCategorySchema,
  createCategorySchema,
  updateCategorySchema,
  deleteCategorySchema
} from '../schemas/category.schema';

export default async function (fastify: FastifyInstance) {
  fastify.get('/categories', { schema: getCategoriesSchema }, categoryController.getCategories);
  fastify.get('/categories/:id', { schema: getCategorySchema }, categoryController.getCategory);
  fastify.post('/categories', { schema: createCategorySchema }, categoryController.createCategory);
  fastify.put('/categories/:id', { schema: updateCategorySchema }, categoryController.updateCategory);
  fastify.delete('/categories/:id', { schema: deleteCategorySchema }, categoryController.deleteCategory);
} 