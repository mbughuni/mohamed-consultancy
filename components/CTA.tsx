import Button from "./Button";
import { localeHref, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionary";

export default function CTA({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const t = dict.cta;

  return (
    <section className="bg-navy-900">
      <div className="container-brand flex flex-col items-center gap-6 py-16 text-center text-white md:py-20">
        <h2 className="max-w-xl font-heading font-semibold text-3xl leading-tight md:text-4xl">
          {t.title}
        </h2>
        <p className="max-w-md text-base text-white/70">{t.text}</p>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <Button href={localeHref(locale, "/application-process")}>
            {t.primary}
          </Button>
          <Button href={localeHref(locale, "/contact")} variant="secondary">
            {t.secondary}
          </Button>
        </div>
      </div>
    </section>
  );
}
