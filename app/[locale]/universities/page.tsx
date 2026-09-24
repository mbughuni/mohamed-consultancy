import type { Metadata } from "next";
import { universities } from "@/lib/data";
import UniversityCard from "@/components/UniversityCard";
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
    title: dict.pages.universities.title,
    description: dict.pages.universities.intro,
  };
}

export default async function UniversitiesPage({
  params,
}: {
  params: { locale: Locale };
}) {
  const dict = await getDictionary(params.locale);
  const t = dict.pages.universities;

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
          <SectionHeading title={t.sectionTitle} intro={t.sectionIntro} />
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {universities.map((university, index) => (
              <UniversityCard
                key={university.slug}
                name={university.name}
                location={university.location}
                logo={university.logo}
                description={dict.universities.items[index].description}
              />
            ))}
          </div>
        </div>
      </section>

      <CTA locale={params.locale} dict={dict} />
    </>
  );
}
