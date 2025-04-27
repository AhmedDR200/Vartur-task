import { FastifyInstance } from 'fastify';
import { getUsers, getUser, createUser, updateUser, deleteUser } from '../controllers/user.controller';
import {
  getUsersSchema,
  getUserSchema,
  createUserSchema,
  updateUserSchema,
  deleteUserSchema
} from '../schemas/user.schema';

export default async function userRoutes(fastify: FastifyInstance) {
  fastify.get('/users', {
    schema: {
      ...getUsersSchema,
      tags: ['Users'],
      summary: 'Get all users',
      description: 'Retrieve a list of all users',
      security: [{ bearerAuth: [] }]
    }
  }, getUsers);

  fastify.get('/users/:id', {
    schema: {
      ...getUserSchema,
      tags: ['Users'],
      summary: 'Get a user by ID',
      description: 'Retrieve a specific user by their ID',
      security: [{ bearerAuth: [] }]
    }
  }, getUser);

  fastify.post('/users', {
    schema: {
      ...createUserSchema,
      tags: ['Users'],
      summary: 'Create a new user',
      description: 'Create a new user with the provided details',
      security: [{ bearerAuth: [] }]
    }
  }, createUser);

  fastify.put('/users/:id', {
    schema: {
      ...updateUserSchema,
      tags: ['Users'],
      summary: 'Update a user',
      description: 'Update an existing user by their ID',
      security: [{ bearerAuth: [] }]
    }
  }, updateUser);

  fastify.delete('/users/:id', {
    schema: {
      ...deleteUserSchema,
      tags: ['Users'],
      summary: 'Delete a user',
      description: 'Delete a user by their ID',
      security: [{ bearerAuth: [] }]
    }
  }, deleteUser);
}
