import { integer, numeric, pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { categories } from './categories.js';

export const products = pgTable('products', {
  id: uuid('id').primaryKey(),
  name: varchar('name'),
  price: numeric('price'),
  costPrice: numeric('cost_price'),
  stockQuantity: integer('stock_quantity'),
  categoryId: uuid('category_id').references(() => categories.id),
});

export type Product = typeof products.$inferSelect;
