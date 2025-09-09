
import React from "react";
import { Card } from "@/components";
import { getCurrentUser } from "@/lib/auth/actions";
import { getAllProducts } from "@/lib/actions/product";



const Home = async () => {
  const user = await getCurrentUser();
  const { products, totalCount } = await getAllProducts({});

  return (
    <main className="mx-auto mt-6 sm:mt-14 max-w-7xl px-0 sm:px-0 lg:px-0">

      {/* Product Cards */}
      <section aria-labelledby="latest" className="pb-12">
        <div className="font-clash grid grid-cols-2 gap-2 md:gap-6 sm:grid-cols-3 lg:grid-cols-4 pb-6">
          {products.map((p) => {
            const price =
              p.minPrice !== null && p.maxPrice !== null && p.minPrice !== p.maxPrice
                ? `$${p.minPrice.toFixed(2)} - $${p.maxPrice.toFixed(2)}`
                : p.minPrice !== null
                ? p.minPrice
                : undefined;
            return (
              <Card
                key={p.id}
                title={p.name}
                subtitle={p.subtitle ?? undefined}
                imageSrc={p.imageUrl ?? "/shoes/shoe-1.jpg"}
                price={price}
                href={`/products/${p.id}`}
              />
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default Home;