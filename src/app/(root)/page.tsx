
import React from "react";
import { getCurrentUser } from "@/lib/auth/actions";
import { getAllProducts } from "@/lib/actions/product";
import Categories from "@/components/Categories";
import Showcase from "@/components/Showcase";
import ProductGridWrapper from "@/components/ProductGridWrapper";

const Home = async () => {
  const user = await getCurrentUser();
  const { products, totalCount } = await getAllProducts({});

  return (
    <main className="mx-auto mt-6  max-w-7xl px-0 sm:px-0 lg:px-0">
      <Showcase />
      <Categories />
      {/* Product Cards */}
      <section aria-labelledby="latest" className="pb-12">
        <ProductGridWrapper products={products.map(p => ({
          id: p.id,
          title: p.title,
          subtitle: p.subtitle ?? undefined,
          imageSrc: p.imageUrl ?? "/shoes/shoe-1.jpg",
          imageSrcHover: p.imageUrlHover ?? undefined,
          minPrice: p.minPrice,
          maxPrice: p.maxPrice,
          href: `/products/${p.id}`,
        }))} />
      </section>
    </main>
  );
};

export default Home;