import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

export const categories = pgTable('categories', {
  id: uuid('id').primaryKey(),
  name: varchar('name'),
});

export type Category = typeof categories.$inferSelect;
