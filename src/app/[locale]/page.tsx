import Image from "next/image";
import {
  ArrowRight,
  Boxes,
  Mail,
  MapPin,
  Package,
  Phone,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/products";
import { site, whatsappUrl } from "@/lib/site";
import WhatsAppIcon from "@/components/WhatsAppIcon";

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

function InfoCard({
  icon,
  label,
  children,
  tile = "bg-brand-100 text-brand-700",
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
  tile?: string;
}) {
  return (
    <div className="flex w-full flex-col items-center rounded-3xl border border-brand-100 bg-white p-6 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-brand-100 sm:w-72 lg:w-64">
      <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl ${tile}`}>
        {icon}
      </div>
      <h3 className="font-bold text-brand-900">{label}</h3>
      <div className="mt-3 flex w-full flex-1 flex-col items-center gap-4 text-slate-600">{children}</div>
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
  const a = await getTranslations("about");
  const c = await getTranslations("contact");

  const values = [
    { icon: ShieldCheck, title: a("v1Title"), text: a("v1Text") },
    { icon: Boxes, title: a("v2Title"), text: a("v2Text") },
    { icon: Zap, title: a("v3Title"), text: a("v3Text") },
  ];

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
        <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:grid sm:snap-none sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0">
          <div className="w-[85%] shrink-0 snap-center rounded-3xl border border-brand-100 bg-white p-7 shadow-sm sm:w-auto">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-100 text-brand-700">
              <Boxes size={24} />
            </div>
            <h3 className="text-lg font-bold text-brand-900">
              {t("wholesaleTitle")}
            </h3>
            <p className="mt-2 text-slate-600">{t("wholesaleText")}</p>
          </div>
          <div className="w-[85%] shrink-0 snap-center rounded-3xl border border-lime-200 bg-white p-7 shadow-sm sm:w-auto">
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

      <section
        id="about"
        className="scroll-mt-20 border-y border-brand-100 bg-brand-50/60"
      >
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-extrabold text-brand-900 sm:text-3xl">
              {a("title")}
            </h2>
            <p className="mt-4 text-lg text-slate-600">{a("intro")}</p>
          </div>
          <div className="mt-10 -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:snap-none md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0 md:pb-0">
            {values.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="w-[85%] shrink-0 snap-center rounded-3xl border border-brand-100 bg-white p-7 shadow-sm md:w-auto"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-100 text-brand-700">
                  <Icon size={24} />
                </div>
                <h3 className="text-lg font-bold text-brand-900">{title}</h3>
                <p className="mt-2 text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-extrabold text-brand-900 sm:text-3xl">
            {c("title")}
          </h2>
          <p className="mt-4 text-slate-600">{c("subtitle")}</p>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-5">
          {site.whatsapp && (
            <InfoCard
              icon={<WhatsAppIcon size={26} />}
              tile="bg-[#25D366] text-white"
              label={c("whatsapp")}
            >
              <p>{c("whatsappText")}</p>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#1fb957]"
              >
                <WhatsAppIcon size={18} />
                {c("whatsappCta")}
              </a>
            </InfoCard>
          )}

          {site.phone && (
            <InfoCard icon={<Phone size={24} />} label={c("phone")}>
              <a
                href={`tel:${site.phone.replace(/\s/g, "")}`}
                dir="ltr"
                className="mt-auto inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-700"
              >
                <Phone size={16} />{site.phone}
              </a>
            </InfoCard>
          )}

          {site.email && (
            <InfoCard icon={<Mail size={24} />} label={c("email")}>
              <a
                href={`mailto:${site.email}`}
                dir="ltr"
                className="break-all font-semibold text-brand-700 hover:underline"
              >
                {site.email}
              </a>
            </InfoCard>
          )}

          {site.address && (
            <InfoCard icon={<MapPin size={24} />} label={c("address")}>
              <p>{site.address}</p>
            </InfoCard>
          )}
        </div>

        <div className="mt-8 rounded-3xl bg-brand-50 p-8 text-center">
          <h3 className="text-xl font-extrabold text-brand-900">
            {c("quoteTitle")}
          </h3>
          <Link
            href="/cart"
            className="mt-5 inline-block rounded-full bg-brand-600 px-7 py-3 font-semibold text-white transition-colors hover:bg-brand-700"
          >
            {c("quoteCta")}
          </Link>
        </div>
      </section>

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