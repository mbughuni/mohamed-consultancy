import type { Metadata } from "next";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
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
    title: dict.pages.about.title,
    description: dict.pages.about.intro,
  };
}

export default async function AboutPage({
  params,
}: {
  params: { locale: Locale };
}) {
  const dict = await getDictionary(params.locale);
  const t = dict.pages.about;

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
        <div className="container-brand grid gap-12 md:grid-cols-2 md:items-center md:gap-16">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
            <Image
              src="/images/students-airport-1.jpg"
              alt="African students travelling together to begin their studies in India"
              fill
              sizes="(min-width: 768px) 520px, 90vw"
              className="object-cover"
            />
          </div>
          <div>
            <SectionHeading title={t.sectionTitle} intro={t.sectionIntro} />
          </div>
        </div>
      </section>

      <section className="section-pad bg-surface">
        <div className="container-brand">
          <SectionHeading title={t.supportHeading} align="center" />
          <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-8 sm:grid-cols-2">
            {t.supportPoints.map((point) => (
              <div key={point.title} className="flex gap-3.5">
                <CheckCircle2
                  size={22}
                  className="mt-0.5 shrink-0 text-gold-500"
                />
                <div>
                  <h3 className="font-heading font-semibold text-lg text-navy-900">
                    {point.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">
                    {point.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA locale={params.locale} dict={dict} />
    </>
  );
}
