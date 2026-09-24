import { serviceIcons } from "@/lib/data";
import SectionHeading from "./SectionHeading";
import ServiceCard from "./ServiceCard";
import Button from "./Button";
import { localeHref, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionary";

export default function Services({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const t = dict.services;

  return (
    <section className="section-pad bg-surface">
      <div className="container-brand">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading title={t.title} intro={t.intro} />
          <div className="shrink-0">
            <Button href={localeHref(locale, "/services")} variant="ghost">
              {t.viewAll}
            </Button>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {t.items.map((service, index) => (
            <ServiceCard
              key={service.title}
              icon={serviceIcons[index]}
              title={service.title}
              summary={service.summary}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
