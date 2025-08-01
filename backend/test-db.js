import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.$connect();
    console.log("Database connection successful!");
  } catch (error) {
    console.error("Database connection error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
