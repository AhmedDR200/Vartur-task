import { PrismaClient } from '../../generated/prisma';

const prisma = new PrismaClient();

export async function findAll() {
  return prisma.user.findMany();
}

export async function create(data: { username: string; password: string; role?: string }) {
  return prisma.user.create({ data });
}
