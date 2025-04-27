import { FastifyReply, FastifyRequest } from 'fastify';
import * as categoryService from '../services/category.service';

export async function getCategories(req: FastifyRequest, reply: FastifyReply) {
  const categories = await categoryService.findAll();
  return reply.send(categories);
}

export async function getCategory(req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
  const category = await categoryService.findById(parseInt(req.params.id));
  if (!category) {
    return reply.code(404).send({ message: 'Category not found' });
  }
  return reply.send(category);
}

export async function createCategory(
  req: FastifyRequest<{ Body: { name: string; parentId?: number } }>,
  reply: FastifyReply
) {
  const category = await categoryService.create(req.body);
  return reply.code(201).send(category);
}

export async function updateCategory(
  req: FastifyRequest<{ Params: { id: string }; Body: { name?: string; parentId?: number } }>,
  reply: FastifyReply
) {
  try {
    const category = await categoryService.update(parseInt(req.params.id), req.body);
    return reply.send(category);
  } catch (error) {
    return reply.code(404).send({ message: 'Category not found' });
  }
}

export async function deleteCategory(
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    await categoryService.remove(parseInt(req.params.id));
    return reply.code(204).send();
  } catch (error) {
    return reply.code(404).send({ message: 'Category not found' });
  }
} 