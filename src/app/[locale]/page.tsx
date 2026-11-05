import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");

  return (
    <section className="bg-linear-to-b from-brand-50 to-white">
      <div className="mx-auto max-w-6xl px-4 py-20 text-center sm:py-28">
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
  );
}