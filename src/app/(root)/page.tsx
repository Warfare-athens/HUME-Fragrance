
import React from "react";
import { Card } from "@/components";
import { getCurrentUser } from "@/lib/auth/actions";
import { getAllProducts } from "@/lib/actions/product";
import Categories from "@/components/Categories";
import Showcase from "@/components/Showcase";



const Home = async () => {
  const user = await getCurrentUser();
  const { products, totalCount } = await getAllProducts({});

  return (
    <main className="mx-auto mt-6  max-w-7xl px-0 sm:px-0 lg:px-0">

      <Showcase />

      <Categories />

      {/* Product Cards */}
      <section aria-labelledby="latest" className="pb-12">
        <div className="  grid grid-cols-2 gap-2 md:gap-6 md:grid-cols-3  space-y-8 pb-6">
          {products.map((p) => {
            return (
              <Card
                key={p.id}
                title={p.title}
                subtitle={p.subtitle ?? undefined}
                imageSrc={p.imageUrl ?? "/shoes/shoe-1.jpg"}
                price={p.price}
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