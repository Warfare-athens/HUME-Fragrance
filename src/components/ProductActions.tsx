"use client";

import { ShoppingBag, Heart } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { addToCart as addToCartAction } from "@/lib/actions/cart";
import { useState } from "react";

export default function ProductActions({ product }) { // Removed variant and image
  const [isAdding, setIsAdding] = useState(false);
  const setCart = useCartStore((state) => state.setCart);

  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      // Assuming addToCartAction now takes productId and quantity
      const cart = await addToCartAction(product.id, 1);
      if (cart) {
        const items = cart.items.map((item) => ({
          id: item.product.id, // Changed from item.variant.id
          name: item.product.name,
          price: Number(item.product.price), // Changed from item.variant.price
          quantity: item.quantity,
          image: item.product.imageUrl, // Changed from item.product.images?.[0]?.url
        }));
        const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setCart({ items, total });
      }
    } catch (error) {
      console.error("Failed to add to cart", error);
      // Optionally, show an error message to the user
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <button
        className="flex items-center justify-center gap-2 rounded-full bg-[var(--color-dark-900)] px-6 py-4 text-body-medium text-[var(--color-light-100)] transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[--color-dark-500] disabled:opacity-50"
        onClick={handleAddToCart}
        disabled={isAdding}
      >
        {isAdding ? (
          "Adding..."
        ) : (
          <>
            <ShoppingBag className="h-5 w-5" />
            Add to Bag
          </>
        )}
      </button>
      <button className="flex items-center justify-center gap-2 rounded-full border border-[var(--color-light-300)] px-6 py-4 text-body-medium text-[var(--color-dark-900)] transition hover:border-[var(--color-dark-500)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[--color-dark-500]">
        <Heart className="h-5 w-5" />
        Favorite
      </button>
    </div>
  );
}