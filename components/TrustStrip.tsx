import { trustIcons } from "@/lib/data";
import type { Dictionary } from "@/lib/i18n/dictionary";

export default function TrustStrip({ dict }: { dict: Dictionary }) {
  return (
    <section className="border-b border-navy-100 bg-surface">
      <div className="container-brand grid grid-cols-2 gap-8 py-10 md:grid-cols-4 md:py-12">
        {dict.trust.map((point, index) => {
          const Icon = trustIcons[index];
          return (
            <div key={point.title} className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-navy-900/5 text-navy-900">
                <Icon size={20} />
              </span>
              <div>
                <p className="text-sm font-semibold text-navy-900">
                  {point.title}
                </p>
                <p className="mt-0.5 text-xs leading-relaxed text-muted">
                  {point.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
