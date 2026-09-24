import { universities } from "@/lib/data";
import SectionHeading from "./SectionHeading";
import UniversityCard from "./UniversityCard";
import Button from "./Button";
import { localeHref, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionary";

export default function Universities({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const t = dict.universities;

  return (
    <section className="section-pad">
      <div className="container-brand">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading title={t.title} intro={t.intro} />
          <div className="shrink-0">
            <Button href={localeHref(locale, "/universities")} variant="ghost">
              {t.exploreCta}
            </Button>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {universities.map((university, index) => (
            <UniversityCard
              key={university.slug}
              name={university.name}
              location={university.location}
              logo={university.logo}
              description={t.items[index].description}
            />
          ))}
        </div>

        <p className="mt-8 text-sm text-muted">{t.note}</p>
      </div>
    </section>
  );
}
