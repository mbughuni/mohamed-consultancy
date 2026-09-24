import Image from "next/image";
import SectionHeading from "./SectionHeading";
import Button from "./Button";
import { localeHref, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionary";

export default function Destinations({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const t = dict.destinations;

  return (
    <section className="section-pad bg-surface">
      <div className="container-brand grid gap-12 md:grid-cols-2 md:items-center md:gap-16">
        <div>
          <SectionHeading title={t.title} intro={t.intro} />
          <dl className="mt-9 space-y-6">
            {t.reasons.map((reason) => (
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
          <div className="mt-8">
            <Button href={localeHref(locale, "/destinations")} variant="ghost">
              {t.learnMore}
            </Button>
          </div>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-xl md:aspect-[3/4]">
          <Image
            src="/images/student-clinical.jpg"
            alt="A student undertaking practical training as part of a health sciences program in India"
            fill
            sizes="(min-width: 768px) 460px, 90vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
