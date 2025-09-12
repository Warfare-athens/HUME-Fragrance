import { pgTable, text, timestamp, uuid, boolean, decimal } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { z } from 'zod';
import { productImages } from './images';


export const products = pgTable('products', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  subtitle: text('subtitle'),
  description: text('description').notNull(),
  minPrice: decimal('min_price', { precision: 10, scale: 2 }).notNull(),
  maxPrice: decimal('max_price', { precision: 10, scale: 2 }).notNull(),
  isPublished: boolean('is_published').notNull().default(false),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const productsRelations = relations(products, ({ many }) => ({
  images: many(productImages),
}));

export const insertProductSchema = z.object({
  title: z.string().min(1),
  subtitle: z.string().optional(),
  description: z.string().min(1),
  minPrice: z.string(),
  maxPrice: z.string(),
  isPublished: z.boolean().optional(),

  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});
export const selectProductSchema = insertProductSchema.extend({
  id: z.string().uuid(),
});
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type SelectProduct = z.infer<typeof selectProductSchema>;