"use client";

import { useEffect } from "react";
import { useCartStore } from "@/store/cart";
import { getCart as getCartAction } from "@/lib/actions/cart";

export default function CartProvider({ children }: { children: React.ReactNode }) {
  const { setCart } = useCartStore();

  useEffect(() => {
    const getCart = async () => {
      const cart = await getCartAction();
      if (cart) {
        const items = cart.items.map((item) => ({
          id: item.variant.id,
          name: item.product.name,
          price: Number(item.variant.price),
          quantity: item.quantity,
          image: item.product.images?.[0]?.url,
        }));
        const total = items.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
        setCart({ items, total });
      }
    };

    getCart();
  }, [setCart]);

  return <>{children}</>;
}
