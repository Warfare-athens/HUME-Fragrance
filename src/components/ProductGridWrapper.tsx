"use client";

import React, { useState } from "react";
import Card, { CardProps } from "@/components/Card"; // Assuming CardProps is exported from Card.tsx

interface ProductGridWrapperProps {
  products: CardProps[];
}

const ProductGridWrapper: React.FC<ProductGridWrapperProps> = ({ products }) => {
  const [isAnyProductHovered, setIsAnyProductHovered] = useState(false);

  const handleMouseEnterGrid = () => {
    setIsAnyProductHovered(true);
  };

  const handleMouseLeaveGrid = () => {
    setIsAnyProductHovered(false);
  };

  return (
    <div
      className="grid grid-cols-2 gap-2 md:gap-6 md:grid-cols-3 lg:grid-cols-4 space-y-8 pb-6"
      onMouseEnter={handleMouseEnterGrid}
      onMouseLeave={handleMouseLeaveGrid}
    >
      {products.map((p) => (
        <Card
          key={p.id}
          title={p.title}
          subtitle={p.subtitle ?? undefined}
          imageSrc={p.imageSrc ?? "/shoes/shoe-1.jpg"}
          imageSrcHover={p.imageSrcHover ?? undefined}
          minPrice={p.minPrice}
          maxPrice={p.maxPrice}
          href={p.href}
          isGlobalHovered={isAnyProductHovered} // Pass the global hover state
        />
      ))}
    </div>
  );
};

export default ProductGridWrapper;
