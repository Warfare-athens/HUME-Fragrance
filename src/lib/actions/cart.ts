'use server';

import { and, eq, inArray } from 'drizzle-orm';
import { cookies } from 'next/headers';
import { db } from '@/lib/db';
import {
  carts,
  cartItems,
  products,
  guests,
} from '@/lib/db/schema';
import { getCurrentUser } from '@/lib/auth/actions';
import { randomUUID } from 'crypto';

export async function getCart() {
  const user = await getCurrentUser();
  const guestSessionToken = (await cookies().get('guest_session'))?.value;

  let cart;

  if (user) {
    [cart] = await db.select().from(carts).where(eq(carts.userId, user.id));
  } else if (guestSessionToken) {
    const [guest] = await db
      .select()
      .from(guests)
      .where(eq(guests.sessionToken, guestSessionToken));
    if (guest) {
      [cart] = await db.select().from(carts).where(eq(carts.guestId, guest.id));
    }
  }

  if (!cart) {
    return null;
  }

  const cartItemsWithDetails = await db
    .select({
      id: cartItems.id,
      quantity: cartItems.quantity,
      product: products,
    })
    .from(cartItems)
    .where(eq(cartItems.cartId, cart.id))
    .innerJoin(products, eq(cartItems.productId, products.id));

  return {
    ...cart,
    items: cartItemsWithDetails,
  };
}

async function createCart(userId?: string, guestId?: string) {
  const [newCart] = await db
    .insert(carts)
    .values({
      id: randomUUID(),
      userId,
      guestId,
    })
    .returning();
  return newCart;
}

async function getOrCreateCart() {
  let cart = await getCart();

  if (!cart) {
    const user = await getCurrentUser();
    const guestSessionToken = (await cookies().get('guest_session'))?.value;

    if (user) {
      cart = await createCart(user.id);
    } else if (guestSessionToken) {
      const [guest] = await db
        .select()
        .from(guests)
        .where(eq(guests.sessionToken, guestSessionToken));
      if (guest) {
        cart = await createCart(undefined, guest.id);
      }
    } else {
        // Create a guest session and cart
        const sessionToken = randomUUID();
        const now = new Date();
        const expiresAt = new Date(now.getTime() + 1000 * 60 * 60 * 24 * 7); // 7 days
        const [newGuest] = await db.insert(guests).values({ sessionToken, expiresAt }).returning();
        cookies().set('guest_session', sessionToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            path: '/',
            expires: expiresAt,
        });
        cart = await createCart(undefined, newGuest.id);
    }
  }

  return cart;
}

export async function addToCart(productId: string, quantity: number) { // Changed from variantId
  const cart = await getOrCreateCart();
  if (!cart) {
    throw new Error('Could not create or find a cart');
  }

  const [existingItem] = await db
    .select()
    .from(cartItems)
    .where(
      and(
        eq(cartItems.cartId, cart.id),
        eq(cartItems.productId, productId) // Changed from productVariantId
      )
    );

  if (existingItem) {
    await db
      .update(cartItems)
      .set({ quantity: existingItem.quantity + quantity })
      .where(eq(cartItems.id, existingItem.id));
  } else {
    await db.insert(cartItems).values({
      cartId: cart.id,
      productId: productId, // Changed from productVariantId
      quantity,
    });
  }

  return await getCart();
}

export async function updateCartItemQuantity(productId: string, quantity: number) { // Changed from variantId
    const cart = await getCart();
    if (!cart) {
        throw new Error('Cart not found');
    }

    if (quantity <= 0) {
        return await removeCartItem(productId);
    }

    const [itemToUpdate] = await db.select().from(cartItems).where(and(eq(cartItems.cartId, cart.id), eq(cartItems.productId, productId))); // Changed from productVariantId

    if (itemToUpdate) {
        await db.update(cartItems).set({ quantity }).where(eq(cartItems.id, itemToUpdate.id));
    }

    return await getCart();
}


export async function removeCartItem(productId: string) { // Changed from variantId
    const cart = await getCart();
    if (!cart) {
        throw new Error('Cart not found');
    }

    const [itemToRemove] = await db.select().from(cartItems).where(and(eq(cartItems.cartId, cart.id), eq(cartItems.productId, productId))); // Changed from productVariantId

    if (itemToRemove) {
        await db.delete(cartItems).where(eq(cartItems.id, itemToRemove.id));
    }

    return await getCart();
}