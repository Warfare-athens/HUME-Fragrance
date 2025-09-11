"use client";

import Link from "next/link";
import { Card,
  CollapsibleSection,
  ProductGallery,
} from "@/components";
import { useCartStore } from "@/store/cart";
import ProductActions from "@/components/ProductActions";
import { type Review } from "@/lib/actions/product"; // Removed RecommendedProduct

function formatPrice(price: number | null | undefined) {
  if (price === null || price === undefined) return undefined;
  return `$${price.toFixed(2)}`;
}

export default function ProductDetailsClient({
  product,
  images,
  reviews,
}: {
  product: any; // Assuming product now has price directly
  images: any[];
  reviews: Review[];
}) {
  const addToCart = useCartStore((state) => state.addItem);

  // Assuming product has price and salePrice directly
  const basePrice = product.price ? Number(product.price) : null;
  const salePrice = product.salePrice ? Number(product.salePrice) : null;

  const displayPrice =
    salePrice !== null && !Number.isNaN(salePrice) ? salePrice : basePrice;
  const compareAt =
    salePrice !== null && !Number.isNaN(salePrice) ? basePrice : null;

  const discount =
    compareAt && displayPrice && compareAt > displayPrice
      ? Math.round(((compareAt - displayPrice) / compareAt) * 100)
      : null;

  const reviewsCount = reviews.length;
  const reviewsAvg =
    reviewsCount > 0
      ? reviews.reduce((s, r) => s + r.rating, 0) / reviewsCount
      : 0;

  const variants = [{
    color: 'default',
    images: (images || []).map(img => img.url),
  }];

  return (
    <main className="mx-auto h-screen max-w-7xl px-4 sm:px-6 lg:px-8">
      <section className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_480px]">
          <ProductGallery
            productId={product.id}
            variants={variants}
            className="lg:sticky lg:top-6"
          />

        <div className="flex flex-col gap-6 ">
          <header className="flex flex-col lg:mt-10  gap-2">
            <h1 className=" font-clash text-dark-900">{product.title}</h1>
            {product.subtitle && (
              <p className="text-body text-dark-700">{product.subtitle}</p>
            )}
            
          </header>

          <div className="flex items-center gap-3">
            <p className="text-lead text-dark-900">
              {formatPrice(displayPrice)}
            </p>
            {compareAt && (
              <>
                <span className="text-body text-dark-700 line-through">
                  {formatPrice(compareAt)}
                </span>
                {discount !== null && (
                  <span className="rounded-full border border-light-300 px-2 py-1 text-caption text-[--color-green]">
                    {discount}% off
                  </span>
                )}
              </>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <ProductActions
              product={product}
              // No variant prop needed
              // No image prop needed as ProductActions should get image from product or its own logic
            />
          </div>

          <CollapsibleSection title="Product Details" defaultOpen>
            <p>{product.description}</p>
          </CollapsibleSection>

          <CollapsibleSection title="Shipping & Returns">
            <p>
              Free standard shipping and free 30-day returns for Nike Members.
            </p>
          </CollapsibleSection>

          <CollapsibleSection
            title={`Reviews (${reviewsCount})`}
            
          >
            {reviews.length === 0 ? (
              <p>No reviews yet.</p>
            ) : (
              <ul className="space-y-4">
                {reviews.slice(0, 10).map((r) => (
                  <li
                    key={r.id}
                    className="rounded-lg border border-light-300 p-4"
                  >
                    <div className="mb-1 flex items-center justify-between">
                      <p className="text-body-medium text-dark-900">
                        {r.author}
                      </p>
                      <span className="flex items-center gap-1">
                        {/* Removed Star component */}
                      </span>
                    </div>
                    {r.title && (
                      <p className="text-body-medium text-dark-900">
                        {r.title}
                      </p>
                    )}
                    {r.content && (
                      <p className="mt-1 line-clamp-[8] text-body text-dark-700">
                        {r.content}
                      </p>
                    )}
                    <p className="mt-2 text-caption text-dark-700">
                      {new Date(r.createdAt).toLocaleDateString()}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </CollapsibleSection>
        </div>
      </section>
    </main>
  );
}