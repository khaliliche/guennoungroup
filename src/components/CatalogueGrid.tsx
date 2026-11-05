"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { useTranslations } from "next-intl";
import ProductCard from "./ProductCard";
import type { Product } from "@/lib/types";

export default function CatalogueGrid({ products }: { products: Product[] }) {
  const t = useTranslations("catalogue");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return products;
    return products.filter((p) =>
      [p.title_fr, p.title_en, p.title_ar].some((x) =>
        x.toLowerCase().includes(s)
      )
    );
  }, [q, products]);

  if (products.length === 0) {
    return (
      <div className="rounded-3xl border-2 border-dashed border-brand-200 bg-brand-50/50 p-14 text-center text-slate-500">
        {t("empty")}
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="relative w-full sm:max-w-sm">
          <Search
            size={18}
            className="pointer-events-none absolute start-4 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t("search")}
            className="w-full rounded-full border border-brand-200 bg-white py-3 pe-4 ps-11 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
          />
        </div>
        <p className="text-sm font-semibold text-slate-500">
          {t("count", { count: filtered.length })}
        </p>
      </div>

      {filtered.length === 0 ? (
        <p className="py-12 text-center text-slate-500">{t("noResults")}</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}