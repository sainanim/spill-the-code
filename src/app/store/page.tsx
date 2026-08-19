import Link from "next/link";
import { PRODUCT_OFFERINGS } from "@/lib/products";
import { formatCents } from "@/lib/money";
import ProductImage from "@/components/store/ProductImage";

export const metadata = {
  title: "Store | Spill the Code",
};

export default function StorePage() {
  return (
    <main className="bg-[var(--background-primary)] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-[var(--color-primary)] text-center">
          Store
        </h1>

        {/* Four across on desktop as specced, stepping down on narrower screens
            so the cards never get too cramped to read. */}
        <div className="mt-10 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {PRODUCT_OFFERINGS.map((product) => (
            <Link
              key={product.id}
              href={`/store/${product.slug}`}
              className="group flex flex-col bg-white rounded-xl border border-slate-200 overflow-hidden
                         transition-all duration-200 hover:shadow-lg hover:-translate-y-1
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
            >
              <div className="aspect-square bg-white p-4 flex items-center justify-center">
                <ProductImage
                  src={product.imagePath}
                  alt={product.title}
                  className="max-h-full max-w-full object-contain transition-transform duration-200 group-hover:scale-105"
                />
              </div>
              <div className="p-4 pt-0 mt-auto text-center">
                <h2 className="font-semibold text-[var(--text-primary)] leading-snug">
                  {product.title}
                </h2>
                <p className="mt-1 text-lg font-bold text-[var(--color-primary)]">
                  {formatCents(product.priceCents)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
