import ProductDetails from "@/components/ProductDetails";
import { Suspense } from "react";

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductDetails id={id} />
    </Suspense>
  );
}