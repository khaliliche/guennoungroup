import Image from "next/image";
import { ArrowRight, Boxes, Package } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/products";

function HeroPhoto({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div
      className={`relative aspect-[4/5] w-40 overflow-hidden rounded-2xl border-4 border-white shadow-xl shadow-brand-900/15 2xl:w-52 ${className}`}
    >
      <Image src={src} alt={alt} fill sizes="208px" className="object-cover" />
    </div>
  );
}

export const revalidate = 60;

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");

  const all = await getProducts(12);
  const featured = all.filter((p) => p.is_featured);
  const shown = (featured.length > 0 ? featured : all).slice(0, 4);

  return (
    <>
      <section className="relative overflow-hidden bg-linear-to-b from-brand-50 to-white">
        <div className="pointer-events-none absolute -end-16 -top-24 h-72 w-72 rounded-full bg-brand-200/50 blur-3xl" />
        <div className="pointer-events-none absolute -start-20 top-40 h-64 w-64 rounded-full bg-lime-200/50 blur-3xl" />
        {/* Product photos on the sides (shown from 1280px up) */}
        <div className="pointer-events-none absolute start-[3%] top-1/2 hidden -translate-y-1/2 flex-col items-start gap-5 xl:flex 2xl:start-[6%]">
          <HeroPhoto src="/hero/hero-1.webp" alt="Sile Chemicals Carpet" className="-rotate-3" />
          <HeroPhoto src="/hero/hero-2.webp" alt="Ricci Ecoreflex" className="ms-10 rotate-2" />
        </div>
        <div className="pointer-events-none absolute end-[3%] top-1/2 hidden -translate-y-1/2 flex-col items-end gap-5 xl:flex 2xl:end-[6%]">
          <HeroPhoto src="/hero/hero-3.webp" alt="Ricci Car Care wet and dry extractor" className="rotate-3" />
          <HeroPhoto src="/hero/hero-4.webp" alt="Ricci Car Care foam tank" className="me-10 -rotate-2" />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 py-20 text-center sm:py-28">
          {/* Logo above the title */}
          <Image
            src="/logo.png"
            alt="GuennounGroup"
            width={557}
            height={321}
            priority
            className="mx-auto mb-8 w-40 sm:w-48"
          />
          <h1 className="mx-auto max-w-3xl text-4xl font-extrabold tracking-tight text-brand-900 sm:text-5xl">
            {t("title")}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">
            {t("subtitle")}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/catalogue"
              className="rounded-full bg-brand-600 px-7 py-3 font-semibold text-white transition-colors hover:bg-brand-700"
            >
              {t("ctaCatalogue")}
            </Link>
            <Link
              href="/cart"
              className="rounded-full bg-lime-400 px-7 py-3 font-semibold text-slate-900 transition-colors hover:bg-lime-300"
            >
              {t("ctaQuote")}
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="mb-8 text-center text-2xl font-extrabold text-brand-900 sm:text-3xl">
          {t("modesTitle")}
        </h2>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="rounded-3xl border border-brand-100 bg-white p-7 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-100 text-brand-700">
              <Boxes size={24} />
            </div>
            <h3 className="text-lg font-bold text-brand-900">
              {t("wholesaleTitle")}
            </h3>
            <p className="mt-2 text-slate-600">{t("wholesaleText")}</p>
          </div>
          <div className="rounded-3xl border border-lime-200 bg-white p-7 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-lime-100 text-lime-700">
              <Package size={24} />
            </div>
            <h3 className="text-lg font-bold text-brand-900">
              {t("pieceTitle")}
            </h3>
            <p className="mt-2 text-slate-600">{t("pieceText")}</p>
          </div>
        </div>
      </section>

      {shown.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 pb-14">
          <div className="mb-8 flex items-end justify-between gap-4">
            <h2 className="text-2xl font-extrabold text-brand-900 sm:text-3xl">
              {t("featuredTitle")}
            </h2>
            <Link
              href="/catalogue"
              className="flex items-center gap-1.5 text-sm font-bold text-brand-600 hover:underline"
            >
              {t("viewAll")}
              <ArrowRight size={16} className="rtl:rotate-180" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {shown.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-6xl px-4 pb-20">
        <div className="rounded-3xl bg-linear-to-br from-brand-600 to-brand-500 px-6 py-12 text-center text-white sm:px-12">
          <h2 className="text-2xl font-extrabold sm:text-3xl">
            {t("ctaBannerTitle")}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-brand-50">
            {t("ctaBannerText")}
          </p>
          <Link
            href="/catalogue"
            className="mt-7 inline-block rounded-full bg-lime-400 px-8 py-3 font-bold text-slate-900 transition-colors hover:bg-lime-300"
          >
            {t("ctaCatalogue")}
          </Link>
        </div>
      </section>
    </>
  );
}