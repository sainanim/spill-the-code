import { PRODUCT_OFFERINGS } from "@/lib/products";
import ShopGrid from "@/components/shop/ShopGrid";

export const metadata = {
  title: "Shop | Spill the Code",
};

export default function ShopPage() {
  return (
    <main className="bg-[var(--background-primary)] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-[var(--color-primary)] text-center">
          Shop
        </h1>
        <h3
          className="text-m sm:text-m text-[var(--color-primary)] text-left mb-4 mt-4"
        >
          Taxes not included in displayed pricing
        </h3>

        <ShopGrid products={PRODUCT_OFFERINGS} />
      </div>
    </main>
  );
}
