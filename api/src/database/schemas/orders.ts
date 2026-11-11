import { numeric, pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { customers } from './customers.js';

export const orders = pgTable('orders', {
  id: uuid('id').primaryKey(),
  customerId: uuid('customer_id').references(() => customers.id),
  status: varchar('status'),
  totalAmount: numeric('total_amount'),
  createdAt: timestamp('created_at'),
});

export type Order = typeof orders.$inferSelect;
