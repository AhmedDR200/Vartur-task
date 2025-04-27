import { PrismaClient } from '../../generated/prisma';

const prisma = new PrismaClient();

export async function findAll() {
  const categories = await prisma.category.findMany({
    include: {
      subcategories: {
        include: {
          _count: {
            select: { products: true }
          }
        }
      },
      _count: {
        select: { products: true }
      }
    },
    where: {
      parentId: null // Only get top-level categories
    }
  });

  return categories;
}

export async function findById(id: number) {
  return prisma.category.findUnique({
    where: { id },
    include: {
      subcategories: {
        include: {
          _count: {
            select: { products: true }
          }
        }
      },
      _count: {
        select: { products: true }
      }
    }
  });
}

export async function create(data: { name: string; parentId?: number }) {
  return prisma.category.create({
    data,
    include: {
      _count: {
        select: { products: true }
      }
    }
  });
}

export async function update(id: number, data: { name?: string; parentId?: number }) {
  return prisma.category.update({
    where: { id },
    data,
    include: {
      _count: {
        select: { products: true }
      }
    }
  });
}

export async function remove(id: number) {
  return prisma.category.delete({
    where: { id }
  });
} 