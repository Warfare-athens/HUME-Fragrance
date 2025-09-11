import { Card } from "@/components";
// import Filters from "@/components/Filters";
import Sort from "@/components/Sort";
import { parseFilterParams } from "@/lib/utils/query";
import { getAllProducts } from "@/lib/actions/product";

type SearchParams = Record<string, string | string[] | undefined>;

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;

  const parsed = parseFilterParams(sp);
  const { products, totalCount } = await getAllProducts(parsed);

  const activeBadges: string[] = [];
  
  (sp.size ? (Array.isArray(sp.size) ? sp.size : [sp.size]) : []).forEach((s) => activeBadges.push(`Size: ${s}`));
  (sp.color ? (Array.isArray(sp.color) ? sp.color : [sp.color]) : []).forEach((c) =>
    activeBadges.push(String(c)[0].toUpperCase() + String(c).slice(1))
  );
  (sp.price ? (Array.isArray(sp.price) ? sp.price : [sp.price]) : []).forEach((p) => {
    const [min, max] = String(p).split("-");
    const label = min && max ? `${min} - ${max}` : min && !max ? `Over ${min}` : `$0 - ${max}`;
    activeBadges.push(label);
  });

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <header className="flex items-center justify-between py-6">
        <h1 className="text-heading-3 text-[var(--color-dark-900)]">New ({totalCount})</h1>
        <Sort />
      </header>

      {activeBadges.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {activeBadges.map((b, i) => (
            <span
              key={`${b}-${i}`}
              className="rounded-full border border-[var(--color-light-300)] px-3 py-1 text-caption text-[var(--color-dark-900)]"
            >
              {b}
            </span>
          ))}
        </div>
      )}

      {/* <section className="grid grid-cols-1 gap-6 md:grid-cols-[240px_1fr]"> */}
        <div>
          {products.length === 0 ? (
            <div className="rounded-lg border border-[var(--color-light-300)] p-8 text-center">
              <p className="text-body text-[var(--color-dark-700)]">No products match your filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4   pb-6">
              {products.map((p) => {
                const minPrice = Number(p.minPrice);
                const maxPrice = Number(p.maxPrice);

                return (
                  <Card
                    key={p.id}
                    title={p.title}
                    subtitle={p.subtitle ?? undefined}
                    imageSrc={p.imageUrl ?? "/shoes/shoe-1.jpg"}
                    minPrice={minPrice}
                    maxPrice={maxPrice}
                    href={`/products/${p.id}`}
                  />
                );
              })}
            </div>
          )}
        </div>
      {/* </section> */}
    </main>
  );
}