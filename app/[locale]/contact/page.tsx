import type { Metadata } from "next";
import ContactSection from "@/components/ContactSection";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/config";

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const dict = await getDictionary(params.locale);
  return {
    title: dict.pages.contact.title,
    description: dict.pages.contact.intro,
  };
}

export default async function ContactPage({
  params,
}: {
  params: { locale: Locale };
}) {
  const dict = await getDictionary(params.locale);
  const t = dict.pages.contact;

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

      <ContactSection dict={dict} />
    </>
  );
}
