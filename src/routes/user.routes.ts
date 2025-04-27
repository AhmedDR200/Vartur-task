import { FastifyInstance } from 'fastify';
import { getUsers, createUser } from '../controllers/user.controller';

export default async function userRoutes(fastify: FastifyInstance) {
  fastify.get('/users', getUsers);
  fastify.post('/users', createUser);
}
