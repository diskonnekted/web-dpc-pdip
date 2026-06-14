import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const username = 'admin';
  const plainPassword = 'password123'; // Ganti password jika diperlukan

  const existingAdmin = await prisma.user.findUnique({
    where: { username }
  });

  if (existingAdmin) {
    console.log(`User '${username}' sudah ada di database.`);
    return;
  }

  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  const admin = await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
    },
  });

  console.log(`Berhasil membuat user admin!`);
  console.log(`Username: ${admin.username}`);
  console.log(`Password: ${plainPassword}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
