import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { site, whatsappUrl } from "@/lib/site";

function InfoCard({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-brand-100 bg-white p-6 shadow-sm">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-100 text-brand-700">
        {icon}
      </div>
      <h2 className="font-bold text-brand-900">{label}</h2>
      <div className="mt-2 text-slate-600">{children}</div>
    </div>
  );
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-extrabold text-brand-900 sm:text-4xl">
        {t("title")}
      </h1>
      <p className="mt-2 text-slate-600">{t("subtitle")}</p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {site.whatsapp && (
          <InfoCard icon={<MessageCircle size={24} />} label={t("whatsapp")}>
            <p>{t("whatsappText")}</p>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block rounded-full bg-lime-400 px-6 py-2.5 text-sm font-bold text-slate-900 transition-colors hover:bg-lime-300"
            >
              {t("whatsappCta")}
            </a>
          </InfoCard>
        )}

        {site.phone && (
          <InfoCard icon={<Phone size={24} />} label={t("phone")}>
            <a
              href={`tel:${site.phone.replace(/\s/g, "")}`}
              dir="ltr"
              className="font-semibold text-brand-700 hover:underline"
            >
              {site.phone}
            </a>
          </InfoCard>
        )}

        {site.email && (
          <InfoCard icon={<Mail size={24} />} label={t("email")}>
            <a
              href={`mailto:${site.email}`}
              dir="ltr"
              className="font-semibold text-brand-700 hover:underline"
            >
              {site.email}
            </a>
          </InfoCard>
        )}

        {site.address && (
          <InfoCard icon={<MapPin size={24} />} label={t("address")}>
            <p>{site.address}</p>
          </InfoCard>
        )}
      </div>

      <div className="mt-10 rounded-3xl bg-brand-50 p-8 text-center">
        <h2 className="text-xl font-extrabold text-brand-900">
          {t("quoteTitle")}
        </h2>
        <Link
          href="/cart"
          className="mt-5 inline-block rounded-full bg-brand-600 px-7 py-3 font-semibold text-white transition-colors hover:bg-brand-700"
        >
          {t("quoteCta")}
        </Link>
      </div>
    </section>
  );
}