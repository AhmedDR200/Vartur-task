import { FastifyInstance } from 'fastify';
import * as productController from '../controllers/product.controller';
import {
  getProductsSchema,
  getProductSchema,
  createProductSchema,
  updateProductSchema,
  deleteProductSchema
} from '../schemas/product.schema';

export default async function (fastify: FastifyInstance) {
  fastify.get('/products', {
    schema: {
      ...getProductsSchema,
      tags: ['Products'],
      summary: 'Get all products',
      description: 'Retrieve a list of all products with their category information',
      security: [{ bearerAuth: [] }]
    }
  }, productController.getProducts);

  fastify.get('/products/:id', {
    schema: {
      ...getProductSchema,
      tags: ['Products'],
      summary: 'Get a product by ID',
      description: 'Retrieve a specific product by its ID with its category information',
      security: [{ bearerAuth: [] }]
    }
  }, productController.getProduct);

  fastify.post('/products', {
    schema: {
      ...createProductSchema,
      tags: ['Products'],
      summary: 'Create a new product',
      description: 'Create a new product with category assignment',
      security: [{ bearerAuth: [] }]
    }
  }, productController.createProduct);

  fastify.put('/products/:id', {
    schema: {
      ...updateProductSchema,
      tags: ['Products'],
      summary: 'Update a product',
      description: 'Update an existing product by its ID',
      security: [{ bearerAuth: [] }]
    }
  }, productController.updateProduct);

  fastify.delete('/products/:id', {
    schema: {
      ...deleteProductSchema,
      tags: ['Products'],
      summary: 'Delete a product',
      description: 'Delete a product by its ID',
      security: [{ bearerAuth: [] }]
    }
  }, productController.deleteProduct);
} 