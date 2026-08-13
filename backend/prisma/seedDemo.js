import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

// Demo user
const DEMO_EMAIL = "richuser@walletlog.com";
const DEMO_PASSWORD = "demo1234";
const DEMO_NAME = "Arjun Mehta";

function rand(min, max) {
  return Math.round((Math.random() * (max - min) + min) * 100) / 100;
}

function randomDateInMonth(year, month) {
  const day = Math.floor(Math.random() * 27) + 1;
  const hour = Math.floor(Math.random() * 10) + 9;
  const minute = Math.floor(Math.random() * 60);

  return new Date(year, month, day, hour, minute);
}

const NOTES_BY_CATEGORY = {
  Food: [
    "Fine dining",
    "Weekend brunch",
    "Grocery shopping",
    "Business lunch",
    "Dinner",
    "Coffee",
    "Food delivery",
  ],

  Bills: [
    "Electricity bill",
    "Internet bill",
    "Mobile bill",
    "Water bill",
    "Society maintenance",
    "DTH subscription",
  ],

  Travel: [
    "Flight ticket",
    "Hotel stay",
    "Airport cab",
    "Train ticket",
    "Weekend getaway",
    "Cab",
    "Fuel",
  ],

  Shopping: [
    "Clothing",
    "Electronics",
    "Home decor",
    "Gifts",
    "Online shopping",
    "Accessories",
  ],

  Entertainment: [
    "Movie tickets",
    "Concert tickets",
    "Netflix subscription",
    "Prime subscription",
    "Gaming",
    "Event tickets",
  ],

  Health: [
    "Gym membership",
    "Health checkup",
    "Dental care",
    "Medicine",
    "Physiotherapy",
    "Wellness",
  ],

  Others: [
    "Charity donation",
    "Home repair",
    "Pet care",
    "Subscription",
    "Miscellaneous",
  ],
};

const NOTES_INCOME = {
  Salary: [
    "Monthly salary credit",
  ],

  Freelancing: [
    "Freelance project",
    "Consulting payment",
    "Side project payout",
  ],

  Business: [
    "Business revenue",
    "Dividend payout",
    "Business income",
  ],
};

async function main() {
  console.log("🌱 Seeding 1 year of WalletLog demo data...\n");

  // =========================================================
  // 1. CATEGORIES
  // =========================================================

  const expenseCategoryNames = [
    "Food",
    "Bills",
    "Travel",
    "Shopping",
    "Entertainment",
    "Health",
    "Others",
  ];

  const incomeCategoryNames = [
    "Salary",
    "Freelancing",
    "Business",
    "Others",
  ];

  for (const name of expenseCategoryNames) {
    const existing = await prisma.category.findFirst({
      where: {
        name,
        type: "expense",
      },
    });

    if (!existing) {
      await prisma.category.create({
        data: {
          name,
          type: "expense",
          isDefault: true,
        },
      });
    }
  }

  for (const name of incomeCategoryNames) {
    const existing = await prisma.category.findFirst({
      where: {
        name,
        type: "income",
      },
    });

    if (!existing) {
      await prisma.category.create({
        data: {
          name,
          type: "income",
          isDefault: true,
        },
      });
    }
  }

  const expenseCategories = await prisma.category.findMany({
    where: {
      type: "expense",
    },
  });

  const incomeCategories = await prisma.category.findMany({
    where: {
      type: "income",
    },
  });

  // =========================================================
  // 2. DEMO USER
  // =========================================================

  let user = await prisma.user.findUnique({
    where: {
      email: DEMO_EMAIL,
    },
  });

  if (!user) {
    const passwordHash = await bcrypt.hash(DEMO_PASSWORD, 10);

    user = await prisma.user.create({
      data: {
        name: DEMO_NAME,
        email: DEMO_EMAIL,
        passwordHash,
        authProvider: "local",
      },
    });

    console.log(`👤 Created demo user: ${DEMO_EMAIL}`);
  } else {
    console.log(`👤 Demo user already exists: ${DEMO_EMAIL}`);

    await prisma.transaction.deleteMany({
      where: {
        userId: user.id,
      },
    });

    console.log("🧹 Cleared previous demo transactions");
  }

  // =========================================================
  // 3. GENERATE 12 MONTHS
  // =========================================================

  const now = new Date(2026, 7, 13); // Aug 13, 2026

  const monthsBack = 12;

  const transactionsToCreate = [];

  for (let i = monthsBack - 1; i >= 0; i--) {
    const targetDate = new Date(
      now.getFullYear(),
      now.getMonth() - i,
      1
    );

    const year = targetDate.getFullYear();
    const month = targetDate.getMonth();

    // =====================================================
    // INCOME
    // =====================================================

    const salaryCategory = incomeCategories.find(
      (c) => c.name === "Salary"
    );

    // Slight salary variation over time
    const salaryBase = 190000 + (11 - i) * 2500;

    transactionsToCreate.push({
      userId: user.id,
      categoryId: salaryCategory.id,
      type: "income",
      amount: rand(
        salaryBase - 8000,
        salaryBase + 8000
      ),
      date: randomDateInMonth(year, month),
      notes: NOTES_INCOME.Salary[0],
      tags: ["salary", "recurring"],
    });

    // Freelancing
    if (Math.random() > 0.3) {
      const freelanceCategory = incomeCategories.find(
        (c) => c.name === "Freelancing"
      );

      transactionsToCreate.push({
        userId: user.id,
        categoryId: freelanceCategory.id,
        type: "income",
        amount: rand(20000, 70000),
        date: randomDateInMonth(year, month),
        notes:
          NOTES_INCOME.Freelancing[
            Math.floor(
              Math.random() *
                NOTES_INCOME.Freelancing.length
            )
          ],
        tags: ["freelance", "extra-income"],
      });
    }

    // Business income
    if (Math.random() > 0.55) {
      const businessCategory = incomeCategories.find(
        (c) => c.name === "Business"
      );

      transactionsToCreate.push({
        userId: user.id,
        categoryId: businessCategory.id,
        type: "income",
        amount: rand(40000, 150000),
        date: randomDateInMonth(year, month),
        notes:
          NOTES_INCOME.Business[
            Math.floor(
              Math.random() *
                NOTES_INCOME.Business.length
            )
          ],
        tags: ["business", "investment"],
      });
    }

    // =====================================================
    // EXPENSES
    // =====================================================

    // 18-30 expenses every month
    const expenseCount =
      Math.floor(Math.random() * 13) + 18;

    for (let j = 0; j < expenseCount; j++) {
      const category =
        expenseCategories[
          Math.floor(
            Math.random() *
              expenseCategories.length
          )
        ];

      const notesPool =
        NOTES_BY_CATEGORY[category.name] || [
          "Expense",
        ];

      let amount;

      switch (category.name) {
        case "Travel":
          amount = rand(3000, 90000);
          break;

        case "Shopping":
          amount = rand(1500, 50000);
          break;

        case "Bills":
          amount = rand(1500, 15000);
          break;

        case "Health":
          amount = rand(1000, 25000);
          break;

        case "Entertainment":
          amount = rand(500, 12000);
          break;

        case "Food":
          amount = rand(300, 8000);
          break;

        default:
          amount = rand(500, 12000);
      }

      transactionsToCreate.push({
        userId: user.id,
        categoryId: category.id,
        type: "expense",
        amount,
        date: randomDateInMonth(year, month),
        notes:
          notesPool[
            Math.floor(
              Math.random() * notesPool.length
            )
          ],
        tags: [
          category.name.toLowerCase(),
          Math.random() > 0.5
            ? "recurring"
            : "one-time",
        ],
      });
    }

    console.log(
      `📅 ${year}-${String(month + 1).padStart(
        2,
        "0"
      )} → generated`
    );
  }

  // =========================================================
  // 4. INSERT
  // =========================================================

  await prisma.transaction.createMany({
    data: transactionsToCreate,
  });

  // =========================================================
  // 5. RESULT
  // =========================================================

  console.log("\n======================================");
  console.log("✅ WalletLog demo data seeded");
  console.log("======================================");

  console.log(
    `📊 Transactions: ${transactionsToCreate.length}`
  );

  console.log("📅 Period: Sep 2025 → Aug 2026");

  console.log(`📧 Email: ${DEMO_EMAIL}`);
  console.log(`🔑 Password: ${DEMO_PASSWORD}`);

  console.log(
    "\nDashboard and Analytics are now populated."
  );
}

main()
  .catch((error) => {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });