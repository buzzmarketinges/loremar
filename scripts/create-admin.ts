import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    const username = "LoremarRestaurante";
    const password = "Loremar2026!"; // Contraseña segura

    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    // Upsert user (create or update if exists)
    const user = await prisma.user.upsert({
        where: { username },
        update: {
            passwordHash,
            role: 'admin'
        },
        create: {
            username,
            passwordHash,
            role: 'admin'
        }
    });

    console.log(`Usuario creado correctamente: ${user.username}`);
    console.log(`Contraseña: ${password}`);
}

main()
    .catch((e) => {
        console.error("Error creating user:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
