const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        const menu = await prisma.menu.create({
            data: {
                name: "carta",
                type: "MENU",
                price: "14",
                blocks: { create: [] }
            }
        });
        console.log("Success:", menu);
    } catch (e) {
        console.error("Failure:", e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
