import type { Metadata } from "next";
import { processNumbers } from "@/lib/data";
import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/Button";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { localeHref, type Locale } from "@/lib/i18n/config";

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const dict = await getDictionary(params.locale);
  return {
    title: dict.pages.process.title,
    description: dict.pages.process.intro,
  };
}

export default async function ApplicationProcessPage({
  params,
}: {
  params: { locale: Locale };
}) {
  const dict = await getDictionary(params.locale);
  const t = dict.pages.process;

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
          <div className="mx-auto max-w-2xl space-y-10">
            {dict.process.steps.map((step, index) => (
              <div key={step.title} className="flex gap-6">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-navy-900 font-heading font-semibold text-lg text-gold-300">
                  {processNumbers[index]}
                </span>
                <div className="border-b border-navy-100 pb-8">
                  <h2 className="font-heading font-semibold text-xl text-navy-900">
                    {step.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-surface">
        <div className="container-brand text-center">
          <SectionHeading title={t.readyTitle} intro={t.readyIntro} align="center" />
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href={localeHref(params.locale, "/contact")}>
              {t.ctaPrimary}
            </Button>
            <Button href={localeHref(params.locale, "/services")} variant="ghost">
              {t.ctaSecondary}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
