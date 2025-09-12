import ProductDetails from "@/components/ProductDetails";
import { Suspense } from "react";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // ✅ Unwrap the params since Next.js is treating them as a Promise
  const { id } = await params;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductDetails id={id} />
    </Suspense>
  );
}
