import { integer, numeric, pgTable, uuid } from 'drizzle-orm/pg-core';
import { orders } from './orders.js';
import { products } from './products.js';

export const orderItems = pgTable('order_items', {
  id: uuid('id').primaryKey(),
  orderId: uuid('order_id').references(() => orders.id),
  productId: uuid('product_id').references(() => products.id),
  quantity: integer('quantity'),
  unitPrice: numeric('unit_price'),
});

export type OrderItem = typeof orderItems.$inferSelect;
