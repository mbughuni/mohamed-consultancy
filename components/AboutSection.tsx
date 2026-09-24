import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Button from "./Button";
import { localeHref, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionary";

export default function AboutSection({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const t = dict.about;

  return (
    <section className="section-pad">
      <div className="container-brand grid gap-12 md:grid-cols-2 md:items-center md:gap-16">
        <div className="relative order-2 md:order-1">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
            <Image
              src="/images/students-airport-2.jpg"
              alt="Students preparing for their study journey to India"
              fill
              sizes="(min-width: 768px) 520px, 90vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-4 rounded-xl border border-navy-100 bg-white p-5 shadow-card sm:right-6 sm:-bottom-8">
            <p className="font-heading font-semibold text-xl text-navy-900">
              {t.badgeTitle}
            </p>
            <p className="mt-1 max-w-[220px] text-xs text-muted">
              {t.badgeSub}
            </p>
          </div>
        </div>

        <div className="order-1 md:order-2">
          <SectionHeading title={t.title} intro={t.intro} />
          <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {t.points.map((point) => (
              <li key={point} className="flex items-center gap-2.5 text-sm text-ink">
                <CheckCircle2 size={18} className="shrink-0 text-gold-500" />
                {point}
              </li>
            ))}
          </ul>
          <div className="mt-9">
            <Button href={localeHref(locale, "/about")} variant="ghost">
              {t.cta}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
