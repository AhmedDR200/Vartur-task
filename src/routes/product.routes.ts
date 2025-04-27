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
  fastify.get('/products', { schema: getProductsSchema }, productController.getProducts);
  fastify.get('/products/:id', { schema: getProductSchema }, productController.getProduct);
  fastify.post('/products', { schema: createProductSchema }, productController.createProduct);
  fastify.put('/products/:id', { schema: updateProductSchema }, productController.updateProduct);
  fastify.delete('/products/:id', { schema: deleteProductSchema }, productController.deleteProduct);
} 