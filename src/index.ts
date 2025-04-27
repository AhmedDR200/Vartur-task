import Fastify from 'fastify';
import dotenv from 'dotenv';
import prismaPlugin from './plugins/prisma';
import userRoutes from './routes/user.routes';
import categoryRoutes from './routes/category.routes';
import productRoutes from './routes/product.routes';
import authRoutes from './routes/auth.routes';
import { authHook } from './hooks/auth.hook';
import fastifyJwt from '@fastify/jwt';
import fastifyRedis from 'fastify-redis';

dotenv.config();

const server = Fastify({ logger: true });

// Register plugins
server.register(prismaPlugin);
server.register(fastifyJwt, { secret: process.env.JWT_SECRET || 'your-secret-key' });
server.register(fastifyRedis, { host: process.env.REDIS_HOST || 'localhost' });

// Register public routes (no auth required)
server.register(authRoutes, { prefix: '/api' });

// Register protected routes with auth hook
server.register(async (fastify) => {
  fastify.addHook('preHandler', authHook);
  fastify.register(userRoutes, { prefix: '/api' });
  fastify.register(categoryRoutes, { prefix: '/api' });
  fastify.register(productRoutes, { prefix: '/api' });
});

const start = async () => {
  try {
    await server.listen({ port: Number(process.env.PORT), host: '0.0.0.0' });
    const address = server.server.address();
    console.log(`Server listening on ${typeof address === 'string' ? address : address?.port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
start();
