import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

export const customers = pgTable('customers', {
  id: uuid('id').primaryKey(),
  name: varchar('name'),
  email: varchar('email'),
  city: varchar('city'),
  state: varchar('state'),
});

export type Customer = typeof customers.$inferSelect;
