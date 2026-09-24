import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import AboutSection from "@/components/AboutSection";
import Services from "@/components/Services";
import ApplicationProcess from "@/components/ApplicationProcess";
import Universities from "@/components/Universities";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import Destinations from "@/components/Destinations";
import CTA from "@/components/CTA";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/config";

export default async function HomePage({
  params,
}: {
  params: { locale: Locale };
}) {
  const dict = await getDictionary(params.locale);

  return (
    <>
      <Hero locale={params.locale} dict={dict} />
      <TrustStrip dict={dict} />
      <AboutSection locale={params.locale} dict={dict} />
      <Services locale={params.locale} dict={dict} />
      <ApplicationProcess dict={dict} />
      <Universities locale={params.locale} dict={dict} />
      <WhyChooseUs dict={dict} />
      <Testimonials dict={dict} />
      <Destinations locale={params.locale} dict={dict} />
      <CTA locale={params.locale} dict={dict} />
    </>
  );
}
