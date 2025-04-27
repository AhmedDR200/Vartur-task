import { PrismaClient } from '../../generated/prisma';
import bcrypt from 'bcryptjs';
import { FastifyInstance } from 'fastify';

const prisma = new PrismaClient();

export async function login(username: string, password: string, fastify: FastifyInstance) {
  const user = await prisma.user.findUnique({
    where: { username }
  });

  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw new Error('Invalid credentials');
  }

  const token = fastify.jwt.sign({ id: user.id, username: user.username, role: user.role });
  
  // Store token in Redis with expiration (24 hours)
  await fastify.redis.set(`token:${token}`, JSON.stringify({ id: user.id, username: user.username, role: user.role }), 'EX', 86400);

  return {
    token,
    user: {
      id: user.id,
      username: user.username,
      role: user.role
    }
  };
}

export async function verifyToken(token: string, fastify: FastifyInstance) {
  try {
    const decoded = fastify.jwt.verify(token);
    const storedToken = await fastify.redis.get(`token:${token}`);
    
    if (!storedToken) {
      throw new Error('Token not found');
    }

    return decoded;
  } catch (error) {
    throw new Error('Invalid token');
  }
} 