"use client";

import React from "react";
import Card from "@/components/Card"; // Assuming Card accepts these props

// Define a Product type that matches the props used in Card
export type Product = {
  id: string;
  title: string;
  subtitle?: string;
  imageSrc?: string;
  imageSrcHover?: string;
  minPrice?: string | number;
  maxPrice?: string | number;
  href?: string;
};

interface ProductGridWrapperProps {
  products: Product[];
}

const ProductGridWrapper: React.FC<ProductGridWrapperProps> = ({ products }) => {
  

  return (
    <div
      className="grid grid-cols-2 gap-2 md:gap-6 md:grid-cols-3 lg:grid-cols-4 space-y-8 pb-6"
      
    >
      {products.map((p) => (
        <Card
          key={p.id}
          title={p.title}
          subtitle={p.subtitle}
          imageSrc={p.imageSrc ?? "/shoes/shoe-1.jpg"}
          imageSrcHover={p.imageSrcHover}
          minPrice={p.minPrice}
          maxPrice={p.maxPrice}
          href={p.href}
        />
      ))}
    </div>
  );
};

export default ProductGridWrapper;
