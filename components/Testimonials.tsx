import { Quote } from "lucide-react";
import SectionHeading from "./SectionHeading";
import type { Dictionary } from "@/lib/i18n/dictionary";

export default function Testimonials({ dict }: { dict: Dictionary }) {
  const t = dict.testimonials;

  return (
    <section className="section-pad">
      <div className="container-brand">
        <SectionHeading title={t.title} intro={t.intro} />

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {t.items.map((journey, index) => (
            <figure
              key={index}
              className="flex flex-col rounded-xl border border-navy-100 bg-white p-7"
            >
              <Quote className="text-gold-400" size={26} aria-hidden="true" />
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ink">
                “{journey.quote}”
              </blockquote>
              <figcaption className="mt-5 border-t border-navy-100 pt-4 text-sm">
                <span className="font-medium text-navy-900">
                  {journey.name}
                </span>
                <span className="block text-xs text-muted">
                  {journey.origin}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
