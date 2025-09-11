"use client";

import { useCartStore } from "@/store/cart";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import {
  updateCartItemQuantity as updateCartItemQuantityAction,
  removeCartItem as removeCartItemAction,
} from "@/lib/actions/cart";
import { useState } from "react";

export default function CartPage() {
  const { items, total, setCart } = useCartStore();
  const [isUpdating, setIsUpdating] = useState(false);
  console.log("Cart items:", items);
  console.log("Cart total:", total);


  const handleUpdateQuantity = async (itemId: string, newQuantity: number) => {
    setIsUpdating(true);
    try {
      const cart = await updateCartItemQuantityAction(itemId, newQuantity);
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
    } catch (error) {
      console.error("Failed to update quantity", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    setIsUpdating(true);
    try {
      const cart = await removeCartItemAction(itemId);
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
      } else {
        setCart({ items: [], total: 0 });
      }
    } catch (error) {
      console.error("Failed to remove item", error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-dark-900 sm:text-4xl">
        Your Cart
      </h1>

      {items.length === 0 ? (
        <div className="mt-12 text-center">
          <p className="text-lg text-dark-700">Your cart is empty.</p>
          <Link href="/products" className="mt-4 inline-block rounded-md bg-dark-900 px-6 py-3 text-base font-medium text-light-100 hover:bg-dark-700">
              Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="mt-2 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <section className={`lg:col-span-7 ${isUpdating ? "opacity-50" : ""}`}>
            <ul
              role="list"
              className="divide-y divide-light-300 border-b border-t border-light-300"
            >
              {items.map((item) => (
                <li key={item.id} className="flex py-2 ">
                  <div className="flex-shrink-0">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={100}
                      height={100}
                      className="rounded-md object-cover object-center sm:h-20 sm:w-20"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                    <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                      <div>
                        <div className="flex justify-between">
                          <h3 className="text-sm">
                            <Link
                              href={`/products/${item.id}`}
                              className="font-medium text-lg text-dark-900 hover:text-dark-700"
                            >
                              {item.name}
                            </Link>
                          </h3>
                        </div>
                        <p className="mt-1 text-sm font-medium text-dark-900">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>

                      <div className="mt-4 sm:mt-0 sm:pr-9">
                        <div className="flex items-center">
                          <button
                            type="button"
                            onClick={() =>
                              handleUpdateQuantity(item.id, item.quantity - 1)
                            }
                            disabled={isUpdating}
                            className="p-1.5 text-dark-700 hover:text-dark-900 disabled:opacity-50"
                          >
                            <Minus className="h-5 w-5" />
                          </button>
                          <span className="w-10 text-center text-sm font-medium text-dark-900">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              handleUpdateQuantity(item.id, item.quantity + 1)
                            }
                            disabled={isUpdating}
                            className="p-1.5 text-dark-700 hover:text-dark-900 disabled:opacity-50"
                          >
                            <Plus className="h-5 w-5" />
                          </button>
                        </div>

                        <div className="absolute right-10 top-10">
                          <button
                            type="button"
                            onClick={() => handleRemoveItem(item.id)}
                            disabled={isUpdating}
                            className="-m-2 inline-flex p-2 text-amber-50 rounded-md bg-black hover:bg-dark-700 disabled:opacity-50"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Order summary */}
          <section className="mt-16 rounded-lg bg-neutral-200 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
            <h2
              id="summary-heading"
              className="text-lg font-medium text-dark-900"
            >
              Order summary
            </h2>

            <dl className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <dt className="text-sm text-dark-700">Subtotal</dt>
                <dd className="text-sm font-medium text-dark-900">
                  ${total.toFixed(2)}
                </dd>
              </div>
              <div className="flex items-center justify-between border-t border-light-300 pt-4">
                <dt className="text-base font-medium text-dark-900">
                  Order total
                </dt>
                <dd className="text-base font-medium text-dark-900">
                  ${total.toFixed(2)}
                </dd>
              </div>
            </dl>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full rounded-md border border-transparent bg-dark-900 px-4 py-3 text-base font-medium text-light-100 shadow-sm hover:bg-dark-700 focus:outline-none focus:ring-2 focus:ring-dark-500 focus:ring-offset-2 focus:ring-offset-light-100"
              >
                Checkout
              </button>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
