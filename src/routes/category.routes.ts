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
  fastify.get('/categories', {
    schema: {
      ...getCategoriesSchema,
      tags: ['Categories'],
      summary: 'Get all categories',
      description: 'Retrieve a list of all categories with their subcategories and product counts',
      security: [{ bearerAuth: [] }]
    }
  }, categoryController.getCategories);

  fastify.get('/categories/:id', {
    schema: {
      ...getCategorySchema,
      tags: ['Categories'],
      summary: 'Get a category by ID',
      description: 'Retrieve a specific category by its ID with its subcategories and product counts',
      security: [{ bearerAuth: [] }]
    }
  }, categoryController.getCategory);

  fastify.post('/categories', {
    schema: {
      ...createCategorySchema,
      tags: ['Categories'],
      summary: 'Create a new category',
      description: 'Create a new category with optional parent category',
      security: [{ bearerAuth: [] }]
    }
  }, categoryController.createCategory);

  fastify.put('/categories/:id', {
    schema: {
      ...updateCategorySchema,
      tags: ['Categories'],
      summary: 'Update a category',
      description: 'Update an existing category by its ID',
      security: [{ bearerAuth: [] }]
    }
  }, categoryController.updateCategory);

  fastify.delete('/categories/:id', {
    schema: {
      ...deleteCategorySchema,
      tags: ['Categories'],
      summary: 'Delete a category',
      description: 'Delete a category by its ID',
      security: [{ bearerAuth: [] }]
    }
  }, categoryController.deleteCategory);
} 