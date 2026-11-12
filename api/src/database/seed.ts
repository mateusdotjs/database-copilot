import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import {
  categories,
  customers,
  orderItems,
  orders,
  products,
} from './schema.js';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL is required to run the database seed.');
}

const pool = new Pool({ connectionString: databaseUrl });
const db = drizzle({ client: pool });

const categoryData = [
  {
    id: '10000000-0000-4000-8000-000000000001',
    name: 'Eletrônicos',
  },
  {
    id: '10000000-0000-4000-8000-000000000002',
    name: 'Casa e Cozinha',
  },
  {
    id: '10000000-0000-4000-8000-000000000003',
    name: 'Livros',
  },
  {
    id: '10000000-0000-4000-8000-000000000004',
    name: 'Esportes',
  },
  {
    id: '10000000-0000-4000-8000-000000000005',
    name: 'Papelaria',
  },
] satisfies (typeof categories.$inferInsert)[];

const customerData = [
  {
    id: '20000000-0000-4000-8000-000000000001',
    name: 'Ana Silva',
    email: 'ana.silva@example.com',
    city: 'São Paulo',
    state: 'SP',
  },
  {
    id: '20000000-0000-4000-8000-000000000002',
    name: 'Bruno Almeida',
    email: 'bruno.almeida@example.com',
    city: 'Rio de Janeiro',
    state: 'RJ',
  },
  {
    id: '20000000-0000-4000-8000-000000000003',
    name: 'Carla Souza',
    email: 'carla.souza@example.com',
    city: 'Belo Horizonte',
    state: 'MG',
  },
  {
    id: '20000000-0000-4000-8000-000000000004',
    name: 'Diego Santos',
    email: 'diego.santos@example.com',
    city: 'Curitiba',
    state: 'PR',
  },
  {
    id: '20000000-0000-4000-8000-000000000005',
    name: 'Elisa Oliveira',
    email: 'elisa.oliveira@example.com',
    city: 'Salvador',
    state: 'BA',
  },
  {
    id: '20000000-0000-4000-8000-000000000006',
    name: 'Felipe Costa',
    email: 'felipe.costa@example.com',
    city: 'Recife',
    state: 'PE',
  },
  {
    id: '20000000-0000-4000-8000-000000000007',
    name: 'Gabriela Lima',
    email: 'gabriela.lima@example.com',
    city: 'Florianópolis',
    state: 'SC',
  },
  {
    id: '20000000-0000-4000-8000-000000000008',
    name: 'Henrique Rocha',
    email: 'henrique.rocha@example.com',
    city: 'Goiânia',
    state: 'GO',
  },
] satisfies (typeof customers.$inferInsert)[];

const productData = [
  {
    id: '30000000-0000-4000-8000-000000000001',
    name: 'Notebook Pro 14',
    price: '6499.90',
    costPrice: '4850.00',
    stockQuantity: 12,
    categoryId: categoryData[0].id,
  },
  {
    id: '30000000-0000-4000-8000-000000000002',
    name: 'Fone Bluetooth',
    price: '299.90',
    costPrice: '145.00',
    stockQuantity: 45,
    categoryId: categoryData[0].id,
  },
  {
    id: '30000000-0000-4000-8000-000000000003',
    name: 'Teclado Mecânico',
    price: '449.90',
    costPrice: '270.00',
    stockQuantity: 28,
    categoryId: categoryData[0].id,
  },
  {
    id: '30000000-0000-4000-8000-000000000004',
    name: 'Cafeteira Elétrica',
    price: '239.90',
    costPrice: '130.00',
    stockQuantity: 20,
    categoryId: categoryData[1].id,
  },
  {
    id: '30000000-0000-4000-8000-000000000005',
    name: 'Jogo de Panelas',
    price: '589.90',
    costPrice: '350.00',
    stockQuantity: 8,
    categoryId: categoryData[1].id,
  },
  {
    id: '30000000-0000-4000-8000-000000000006',
    name: 'Clean Code',
    price: '109.90',
    costPrice: '58.00',
    stockQuantity: 35,
    categoryId: categoryData[2].id,
  },
  {
    id: '30000000-0000-4000-8000-000000000007',
    name: 'O Hobbit',
    price: '59.90',
    costPrice: '29.00',
    stockQuantity: 50,
    categoryId: categoryData[2].id,
  },
  {
    id: '30000000-0000-4000-8000-000000000008',
    name: 'Bicicleta Urbana',
    price: '1899.90',
    costPrice: '1250.00',
    stockQuantity: 6,
    categoryId: categoryData[3].id,
  },
  {
    id: '30000000-0000-4000-8000-000000000009',
    name: 'Kit de Halteres',
    price: '349.90',
    costPrice: '210.00',
    stockQuantity: 14,
    categoryId: categoryData[3].id,
  },
  {
    id: '30000000-0000-4000-8000-000000000010',
    name: 'Caderno Executivo',
    price: '39.90',
    costPrice: '16.00',
    stockQuantity: 90,
    categoryId: categoryData[4].id,
  },
  {
    id: '30000000-0000-4000-8000-000000000011',
    name: 'Caneta Tinteiro',
    price: '129.90',
    costPrice: '65.00',
    stockQuantity: 25,
    categoryId: categoryData[4].id,
  },
  {
    id: '30000000-0000-4000-8000-000000000012',
    name: 'Mochila para Notebook',
    price: '279.90',
    costPrice: '155.00',
    stockQuantity: 18,
    categoryId: categoryData[4].id,
  },
] satisfies (typeof products.$inferInsert)[];

const orderData = [
  {
    id: '40000000-0000-4000-8000-000000000001',
    customerId: customerData[0].id,
    status: 'delivered',
    totalAmount: '6799.80',
    createdAt: new Date('2026-01-08T13:25:00.000Z'),
  },
  {
    id: '40000000-0000-4000-8000-000000000002',
    customerId: customerData[1].id,
    status: 'shipped',
    totalAmount: '409.70',
    createdAt: new Date('2026-02-14T17:40:00.000Z'),
  },
  {
    id: '40000000-0000-4000-8000-000000000003',
    customerId: customerData[2].id,
    status: 'paid',
    totalAmount: '829.80',
    createdAt: new Date('2026-03-02T10:10:00.000Z'),
  },
  {
    id: '40000000-0000-4000-8000-000000000004',
    customerId: customerData[3].id,
    status: 'cancelled',
    totalAmount: '1899.90',
    createdAt: new Date('2026-04-19T21:05:00.000Z'),
  },
  {
    id: '40000000-0000-4000-8000-000000000005',
    customerId: customerData[4].id,
    status: 'delivered',
    totalAmount: '329.60',
    createdAt: new Date('2026-05-11T14:30:00.000Z'),
  },
  {
    id: '40000000-0000-4000-8000-000000000006',
    customerId: customerData[5].id,
    status: 'processing',
    totalAmount: '1049.70',
    createdAt: new Date('2026-06-23T09:15:00.000Z'),
  },
  {
    id: '40000000-0000-4000-8000-000000000007',
    customerId: customerData[6].id,
    status: 'pending',
    totalAmount: '699.70',
    createdAt: new Date('2026-07-30T19:50:00.000Z'),
  },
  {
    id: '40000000-0000-4000-8000-000000000008',
    customerId: customerData[7].id,
    status: 'delivered',
    totalAmount: '6299.80',
    createdAt: new Date('2026-08-17T12:00:00.000Z'),
  },
  {
    id: '40000000-0000-4000-8000-000000000009',
    customerId: customerData[0].id,
    status: 'refunded',
    totalAmount: '559.80',
    createdAt: new Date('2026-09-05T16:45:00.000Z'),
  },
  {
    id: '40000000-0000-4000-8000-000000000010',
    customerId: customerData[2].id,
    status: 'shipped',
    totalAmount: '629.70',
    createdAt: new Date('2026-10-21T11:35:00.000Z'),
  },
] satisfies (typeof orders.$inferInsert)[];

const orderItemData = [
  {
    id: '50000000-0000-4000-8000-000000000001',
    orderId: orderData[0].id,
    productId: productData[0].id,
    quantity: 1,
    unitPrice: '6499.90',
  },
  {
    id: '50000000-0000-4000-8000-000000000002',
    orderId: orderData[0].id,
    productId: productData[1].id,
    quantity: 1,
    unitPrice: '299.90',
  },
  {
    id: '50000000-0000-4000-8000-000000000003',
    orderId: orderData[1].id,
    productId: productData[1].id,
    quantity: 1,
    unitPrice: '299.90',
  },
  {
    id: '50000000-0000-4000-8000-000000000004',
    orderId: orderData[1].id,
    productId: productData[5].id,
    quantity: 1,
    unitPrice: '109.90',
  },
  {
    id: '50000000-0000-4000-8000-000000000005',
    orderId: orderData[2].id,
    productId: productData[4].id,
    quantity: 1,
    unitPrice: '589.90',
  },
  {
    id: '50000000-0000-4000-8000-000000000006',
    orderId: orderData[2].id,
    productId: productData[6].id,
    quantity: 4,
    unitPrice: '59.90',
  },
  {
    id: '50000000-0000-4000-8000-000000000007',
    orderId: orderData[3].id,
    productId: productData[7].id,
    quantity: 1,
    unitPrice: '1899.90',
  },
  {
    id: '50000000-0000-4000-8000-000000000008',
    orderId: orderData[4].id,
    productId: productData[9].id,
    quantity: 5,
    unitPrice: '39.90',
  },
  {
    id: '50000000-0000-4000-8000-000000000009',
    orderId: orderData[4].id,
    productId: productData[10].id,
    quantity: 1,
    unitPrice: '129.90',
  },
  {
    id: '50000000-0000-4000-8000-000000000010',
    orderId: orderData[5].id,
    productId: productData[8].id,
    quantity: 3,
    unitPrice: '349.90',
  },
  {
    id: '50000000-0000-4000-8000-000000000011',
    orderId: orderData[6].id,
    productId: productData[3].id,
    quantity: 1,
    unitPrice: '239.90',
  },
  {
    id: '50000000-0000-4000-8000-000000000012',
    orderId: orderData[6].id,
    productId: productData[9].id,
    quantity: 2,
    unitPrice: '39.90',
  },
  {
    id: '50000000-0000-4000-8000-000000000013',
    orderId: orderData[6].id,
    productId: productData[11].id,
    quantity: 1,
    unitPrice: '279.90',
  },
  {
    id: '50000000-0000-4000-8000-000000000014',
    orderId: orderData[6].id,
    productId: productData[5].id,
    quantity: 1,
    unitPrice: '100.10',
  },
  {
    id: '50000000-0000-4000-8000-000000000015',
    orderId: orderData[7].id,
    productId: productData[0].id,
    quantity: 1,
    unitPrice: '5999.90',
  },
  {
    id: '50000000-0000-4000-8000-000000000016',
    orderId: orderData[7].id,
    productId: productData[1].id,
    quantity: 1,
    unitPrice: '299.90',
  },
  {
    id: '50000000-0000-4000-8000-000000000017',
    orderId: orderData[8].id,
    productId: productData[11].id,
    quantity: 2,
    unitPrice: '279.90',
  },
  {
    id: '50000000-0000-4000-8000-000000000018',
    orderId: orderData[9].id,
    productId: productData[2].id,
    quantity: 1,
    unitPrice: '449.90',
  },
  {
    id: '50000000-0000-4000-8000-000000000019',
    orderId: orderData[9].id,
    productId: productData[5].id,
    quantity: 1,
    unitPrice: '109.90',
  },
  {
    id: '50000000-0000-4000-8000-000000000020',
    orderId: orderData[9].id,
    productId: productData[6].id,
    quantity: 1,
    unitPrice: '69.90',
  },
] satisfies (typeof orderItems.$inferInsert)[];

async function seed() {
  await db.transaction(async (tx) => {
    await tx.insert(categories).values(categoryData).onConflictDoNothing();

    await tx.insert(customers).values(customerData).onConflictDoNothing();

    await tx.insert(products).values(productData).onConflictDoNothing();

    await tx.insert(orders).values(orderData).onConflictDoNothing();

    await tx.insert(orderItems).values(orderItemData).onConflictDoNothing();
  });

  console.info('Database seeded successfully.');
}

try {
  await seed();
} finally {
  await pool.end();
}
