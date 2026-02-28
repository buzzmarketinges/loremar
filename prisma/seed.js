const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    const username = 'admin';
    const password = 'admin-password-123'; // Cambia esto después de entrar
    const passwordHash = await bcrypt.hash(password, 10);

    const admin = await prisma.user.upsert({
        where: { username },
        update: {},
        create: {
            username,
            passwordHash,
            role: 'admin',
        },
    });

    console.log('-----------------------------------');
    console.log('Usuario administrador creado/verificado:');
    console.log(`Usuario: ${username}`);
    console.log(`Password: ${password}`);
    console.log('-----------------------------------');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
