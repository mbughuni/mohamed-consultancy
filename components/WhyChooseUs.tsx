import { whyChooseIcons } from "@/lib/data";
import SectionHeading from "./SectionHeading";
import type { Dictionary } from "@/lib/i18n/dictionary";

export default function WhyChooseUs({ dict }: { dict: Dictionary }) {
  const t = dict.whyChooseUs;

  return (
    <section className="section-pad bg-surface">
      <div className="container-brand">
        <SectionHeading title={t.title} intro={t.intro} />

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
          {t.reasons.map((reason, index) => {
            const Icon = whyChooseIcons[index];
            return (
              <div key={reason.title} className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-navy-900 shadow-card">
                  <Icon size={20} />
                </span>
                <div>
                  <h3 className="font-heading font-semibold text-lg text-navy-900">
                    {reason.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">
                    {reason.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
