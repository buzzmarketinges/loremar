const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        const images = await prisma.image.findMany();
        console.log("Images found:");
        images.forEach(img => {
            console.log(`- ID: ${img.id}`);
            console.log(`  URL: ${img.url}`);
            console.log(`  linkedDishName: "${img.linkedDishName}"`);
            console.log(`  isFavorite: ${img.isFavorite}`);
            console.log("---");
        });
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
