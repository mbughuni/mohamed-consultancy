import type { Metadata } from "next";
import Image from "next/image";
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
    title: dict.pages.destinations.title,
    description: dict.pages.destinations.intro,
  };
}

export default async function DestinationsPage({
  params,
}: {
  params: { locale: Locale };
}) {
  const dict = await getDictionary(params.locale);
  const t = dict.pages.destinations;

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
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl md:aspect-[3/4]">
            <Image
              src="/images/student-clinical.jpg"
              alt="A student undertaking practical training as part of a health sciences program in India"
              fill
              sizes="(min-width: 768px) 460px, 90vw"
              className="object-cover"
            />
          </div>
          <div>
            <SectionHeading title={t.whatToExpect} />
            <dl className="mt-8 space-y-7">
              {dict.destinations.reasons.map((reason) => (
                <div key={reason.title}>
                  <dt className="font-heading font-semibold text-lg text-navy-900">
                    {reason.title}
                  </dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-muted">
                    {reason.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <CTA locale={params.locale} dict={dict} />
    </>
  );
}
