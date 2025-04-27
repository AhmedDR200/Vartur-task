import { PrismaClient } from '../../generated/prisma';

const prisma = new PrismaClient();

export async function findAll() {
  return prisma.product.findMany({
    include: {
      category: true
    }
  });
}

export async function findById(id: number) {
  return prisma.product.findUnique({
    where: { id },
    include: {
      category: true
    }
  });
}

export async function create(data: { name: string; price: number; categoryId: number }) {
  return prisma.product.create({
    data,
    include: {
      category: true
    }
  });
}

export async function update(id: number, data: { name?: string; price?: number; categoryId?: number }) {
  return prisma.product.update({
    where: { id },
    data,
    include: {
      category: true
    }
  });
}

export async function remove(id: number) {
  return prisma.product.delete({
    where: { id }
  });
} 