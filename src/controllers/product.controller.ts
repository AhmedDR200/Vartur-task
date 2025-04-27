import { FastifyReply, FastifyRequest } from 'fastify';
import * as productService from '../services/product.service';

export async function getProducts(req: FastifyRequest, reply: FastifyReply) {
  const products = await productService.findAll();
  return reply.send(products);
}

export async function getProduct(req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
  const product = await productService.findById(parseInt(req.params.id));
  if (!product) {
    return reply.code(404).send({ message: 'Product not found' });
  }
  return reply.send(product);
}

export async function createProduct(
  req: FastifyRequest<{ Body: { name: string; price: number; categoryId: number } }>,
  reply: FastifyReply
) {
  const product = await productService.create(req.body);
  return reply.code(201).send(product);
}

export async function updateProduct(
  req: FastifyRequest<{ Params: { id: string }; Body: { name?: string; price?: number; categoryId?: number } }>,
  reply: FastifyReply
) {
  try {
    const product = await productService.update(parseInt(req.params.id), req.body);
    return reply.send(product);
  } catch (error) {
    return reply.code(404).send({ message: 'Product not found' });
  }
}

export async function deleteProduct(
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    await productService.remove(parseInt(req.params.id));
    return reply.code(204).send();
  } catch (error) {
    return reply.code(404).send({ message: 'Product not found' });
  }
} 