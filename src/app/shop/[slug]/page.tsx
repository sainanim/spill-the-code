import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { PRODUCT_OFFERINGS, getProductBySlug } from "@/lib/products";
import { formatCents } from "@/lib/money";
import ProductGallery from "@/components/shop/ProductGallery";
import AddToCartControls from "@/components/shop/AddToCartControls";

// The catalogue is static, so every product page is prerendered at build time.
export function generateStaticParams() {
  return PRODUCT_OFFERINGS.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  return { title: product ? `${product.title} | Spill the Code` : "Product not found" };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  return (
    <main className="bg-[var(--background-primary)] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <Link
          href="/shop"
          className="inline-flex items-center gap-1 text-sm font-medium text-[var(--color-primary)] hover:underline"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Shop
        </Link>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Image on the left */}
          <div>
            <ProductGallery images={product.images} alt={product.title} />
          </div>

          {/* Price, add to cart, description, parts — top to bottom on the right */}
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)]">
              {product.title}
            </h1>

            <p className="mt-3 text-3xl font-bold text-[var(--color-primary)]">
              {formatCents(product.priceCents)}
            </p>

            <div className="mt-6">
              <AddToCartControls offeringId={product.id} />
            </div>

            <section className="mt-10">
              <h2 className="text-xl font-bold text-[var(--text-primary)]">Description</h2>
              <p className="mt-3 text-[var(--text-secondary)] leading-relaxed">
                {product.description}
              </p>
            </section>

            {product.parts.length > 0 && (
              <section className="mt-8">
                <h2 className="text-xl font-bold text-[var(--text-primary)]">What&apos;s Inside?</h2>
                <ul className="mt-3 list-disc list-outside pl-5 space-y-1.5 text-[var(--text-secondary)]">
                  {product.parts.map((part) => (
                    <li key={part}>{part}</li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
