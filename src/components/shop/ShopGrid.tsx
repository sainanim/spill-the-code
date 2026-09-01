"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ProductOffering } from "@/lib/products";
import { formatCents } from "@/lib/money";
import ProductImage from "@/components/shop/ProductImage";

// The shop page stays a server component so it keeps its metadata and stays
// prerendered; only the grid needs the client boundary that framer-motion wants.
export default function ShopGrid({ products }: { products: ProductOffering[] }) {
  return (
    /* Four across on desktop, stepping down on narrower screens
       so the cards never get too cramped to read. */
    <div className="mt-10 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product, i) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          // Capped so a full catalogue doesn't leave the last row waiting
          // seconds for its turn. The stagger reads per row, not per card.
          transition={{ duration: 0.5, delay: Math.min(i * 0.08, 0.4) }}
          className="h-full"
        >
          <Link
            href={`/shop/${product.slug}`}
            className="group h-full flex flex-col bg-white rounded-xl border border-slate-200 overflow-hidden
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
        </motion.div>
      ))}
    </div>
  );
}
