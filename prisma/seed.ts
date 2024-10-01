import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Ajout des catégories
  const category1 = await prisma.category.create({
    data: {
      name: 'Boissons',
    },
  });

  const category2 = await prisma.category.create({
    data: {
      name: 'Pâtisseries',
    },
  });

  // Ajout des produits
  const product1 = await prisma.product.create({
    data: {
      name: 'Café',
      description: 'Un café noir traditionnel',
      price: 2.5,
      stock: 100,
      categoryId: category1.id,
    },
  });

  const product2 = await prisma.product.create({
    data: {
      name: 'Croissant',
      description: 'Croissant au beurre frais',
      price: 1.5,
      stock: 50,
      categoryId: category2.id,
    },
  });

  // Ajout des tables
  const table1 = await prisma.table.create({
    data: {
      number: 1,
      status: 'AVAILABLE',
    },
  });

  const table2 = await prisma.table.create({
    data: {
      number: 2,
      status: 'OCCUPIED',
    },
  });

  // Ajout d'une commande avec un produit et une table
  const order1 = await prisma.order.create({
    data: {
      productId: product1.id,
      quantity: 2,
      status: 'PENDING',
      tableId: table1.id,
    },
  });

  const order2 = await prisma.order.create({
    data: {
      productId: product2.id,
      quantity: 1,
      status: 'COMPLETED',
      tableId: table2.id,
    },
  });

  // Ajout d'un paiement pour la commande
  await prisma.payment.create({
    data: {
      amount: 5.0,
      paymentType: 'CARD',
      status: 'COMPLETED',
      orderId: order1.id,
    },
  });

  console.log('Database has been seeded.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
