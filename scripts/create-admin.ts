import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function createAdmin() {
  try {
    const username = 'admin';
    const password = 'admin123'; // Change this to a secure password

    // Hash the password
    const hashedPassword = await hash(password, 10);

    // Create admin user
    const admin = await prisma.admin.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    console.log('Admin user created successfully:', admin.username);
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
