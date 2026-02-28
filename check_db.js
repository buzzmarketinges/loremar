const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        const tableInfo = await prisma.$queryRaw`PRAGMA table_info(Menu)`;
        console.log("Columns in Menu table:");
        tableInfo.forEach(col => {
            console.log(`- ${col.name} (${col.type})`);
        });
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
