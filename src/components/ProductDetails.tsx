import Link from "next/link";
import { getProductById, getProductReviews } from "@/lib/actions/product";
import ProductDetailsClient from "./ProductDetailsClient";

function NotFoundBlock() {
  return (
    <section className="mx-auto max-w-3xl rounded-xl border border-light-300 bg-light-100 p-8 text-center">
      <h1 className="text-heading-3 text-dark-900">Product not found</h1>
      <p className="mt-2 text-body text-dark-700">The product you’re looking for doesn’t exist or may have been removed.</p>
      <div className="mt-6">
        <Link
          href="/products"
          className="inline-block rounded-full bg-dark-900 px-6 py-3 text-body-medium text-light-100 transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[--color-dark-500]"
        >
          Browse Products
        </Link>
      </div>
    </section>
  );
}

export default async function ProductDetails({ id }: { id: string }) {
  const productData = await getProductById(id);

  if (!productData) {
    return (
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="py-4 text-caption text-dark-700">
          <Link href="/" className="hover:underline">Home</Link> / <Link href="/products" className="hover:underline">Products</Link> /{" "}
          <span className="text-dark-900">Not found</span>
        </nav>
        <NotFoundBlock />
      </main>
    );
  }

  const { images, ...product } = productData;

  const reviews = await getProductReviews(id);

  return (
    <ProductDetailsClient
      product={product}
      images={images}
      reviews={reviews}
    />
  );
}