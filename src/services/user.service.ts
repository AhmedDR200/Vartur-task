import { PrismaClient } from '../../generated/prisma';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function findAll() {
  return prisma.user.findMany({
    select: {
      id: true,
      username: true,
      role: true
    }
  });
}

export async function findById(id: number) {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      username: true,
      role: true
    }
  });

  if (!user) {
    throw new Error('User not found');
  }

  return user;
}

export async function create(data: { username: string; password: string; role?: string }) {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  
  return prisma.user.create({
    data: {
      username: data.username,
      password: hashedPassword,
      role: data.role || 'user'
    },
    select: {
      id: true,
      username: true,
      role: true
    }
  });
}

export async function update(id: number, data: { username?: string; password?: string; role?: string }) {
  const updateData: any = { ...data };
  
  if (data.password) {
    updateData.password = await bcrypt.hash(data.password, 10);
  }

  try {
    return await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        username: true,
        role: true
      }
    });
  } catch (error) {
    throw new Error('User not found');
  }
}

export async function remove(id: number) {
  try {
    await prisma.user.delete({
      where: { id }
    });
  } catch (error) {
    throw new Error('User not found');
  }
}
