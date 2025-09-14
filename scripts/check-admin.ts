import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkAdmin() {
  try {
    const admin = await prisma.admin.findUnique({
      where: { username: 'admin' },
    });

    console.log('Admin user found:', admin ? {
      id: admin.id,
      username: admin.username,
      hasPassword: !!admin.password,
    } : 'No admin user found');
  } catch (error) {
    console.error('Error checking admin:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkAdmin();
