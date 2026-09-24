import type { Metadata } from "next";
import { serviceIcons, serviceSlugs } from "@/lib/data";
import SectionHeading from "@/components/SectionHeading";
import CTA from "@/components/CTA";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/config";

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const dict = await getDictionary(params.locale);
  return {
    title: dict.pages.services.title,
    description: dict.pages.services.intro,
  };
}

export default async function ServicesPage({
  params,
}: {
  params: { locale: Locale };
}) {
  const dict = await getDictionary(params.locale);
  const t = dict.pages.services;

  return (
    <>
      <section className="bg-navy-900 text-white">
        <div className="container-brand py-16 md:py-20">
          <p className="text-sm font-medium text-gold-200">{t.eyebrow}</p>
          <h1 className="mt-3 max-w-2xl font-heading font-semibold text-4xl leading-tight md:text-5xl">
            {t.title}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 md:text-lg">
            {t.intro}
          </p>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-brand">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {dict.services.items.map((service, index) => {
              const Icon = serviceIcons[index];
              return (
                <div
                  key={service.title}
                  id={serviceSlugs[index]}
                  className="rounded-xl border border-navy-100 bg-white p-8"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-900 text-gold-300">
                    <Icon size={22} />
                  </span>
                  <h2 className="mt-5 font-heading font-semibold text-xl text-navy-900">
                    {service.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {service.detail}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-pad bg-surface">
        <div className="container-brand">
          <SectionHeading title={t.ctaHeading} intro={t.ctaIntro} align="center" />
        </div>
      </section>

      <CTA locale={params.locale} dict={dict} />
    </>
  );
}
