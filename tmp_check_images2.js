const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        const images = await prisma.image.findMany();
        const dishes = await prisma.dish.findMany();

        const validDishNames = dishes.map(d => d.name);

        console.log("Images:");
        images.forEach(img => {
            console.log(`- ID: ${img.id}, linkedDishName: "${img.linkedDishName}", url: ${img.url}`);
        });

        console.log("Valid dish names:");
        console.log(validDishNames);

    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
