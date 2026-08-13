import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const categories = [
    { name: "Food", type: "expense" },
    { name: "Bills", type: "expense" },
    { name: "Travel", type: "expense" },
    { name: "Shopping", type: "expense" },
    { name: "Entertainment", type: "expense" },
    { name: "Health", type: "expense" },
    { name: "Salary", type: "income" },
    { name: "Freelancing", type: "income" },
    { name: "Business", type: "income" },
    { name: "Others", type: "expense" }
  ];

  await prisma.category.createMany({
    data: categories,
    skipDuplicates: true
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });