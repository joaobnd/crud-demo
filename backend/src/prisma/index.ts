import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

async function main() {

}

main()

    .catch((err) => {
        throw err
    })
    .then(async () => {
        await prismaClient.$disconnect()
    })

export default prismaClient;