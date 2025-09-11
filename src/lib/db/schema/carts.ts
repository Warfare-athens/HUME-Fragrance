import { pgTable, uuid, timestamp, integer } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { z } from 'zod';
import { users } from './user';
import { guests } from './guest';
import { products } from './products';

export const carts = pgTable('carts', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'set null' }),
  guestId: uuid('guest_id').references(() => guests.id, { onDelete: 'set null' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const cartItems = pgTable('cart_items', {
  id: uuid('id').primaryKey().defaultRandom(),
  cartId: uuid('cart_id').references(() => carts.id, { onDelete: 'cascade' }).notNull(),
  productId: uuid('product_id').references(() => products.id, { onDelete: 'cascade' }).notNull(), // Added productId
  quantity: integer('quantity').notNull().default(1),
});

export const cartsRelations = relations(carts, ({ many, one }) => ({
  user: one(users, {
    fields: [carts.userId],
    references: [users.id],
  }),
  guest: one(guests, {
    fields: [carts.guestId],
    references: [guests.id],
  }),
  items: many(cartItems),
}));

export const cartItemsRelations = relations(cartItems, ({ one }) => ({
  cart: one(carts, {
    fields: [cartItems.cartId],
    references: [carts.id],
  }),
  product: one(products, { // Added product relation
    fields: [cartItems.productId],
    references: [products.id],
  }),
}));

export const insertCartSchema = z.object({
  userId: z.string().uuid().optional().nullable(),
  guestId: z.string().uuid().optional().nullable(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});
export const selectCartSchema = insertCartSchema.extend({
  id: z.string().uuid(),
});
export type InsertCart = z.infer<typeof insertCartSchema>;
export type SelectCart = z.infer<typeof selectCartSchema>;

export const insertCartItemSchema = z.object({
  cartId: z.string().uuid(),
  productId: z.string().uuid(), // Added productId
  quantity: z.number().int().min(1),
});
export const selectCartItemSchema = insertCartItemSchema.extend({
  id: z.string().uuid(),
});
export type InsertCartItem = z.infer<typeof insertCartItemSchema>;
export type SelectCartItem = z.infer<typeof selectCartItemSchema>;