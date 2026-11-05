import { getTranslations, setRequestLocale } from "next-intl/server";
import CatalogueGrid from "@/components/CatalogueGrid";
import { getProducts } from "@/lib/products";

export const revalidate = 60;

export default async function CataloguePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("catalogue");
  const products = await getProducts();

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-extrabold text-brand-900 sm:text-4xl">
        {t("title")}
      </h1>
      <p className="mb-10 mt-2 text-slate-600">{t("subtitle")}</p>
      <CatalogueGrid products={products} />
    </section>
  );
}