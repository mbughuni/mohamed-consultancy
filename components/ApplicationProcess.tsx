import { processNumbers } from "@/lib/data";
import SectionHeading from "./SectionHeading";
import ProcessStepCard from "./ProcessStepCard";
import type { Dictionary } from "@/lib/i18n/dictionary";

export default function ApplicationProcess({ dict }: { dict: Dictionary }) {
  const t = dict.process;

  return (
    <section className="section-pad bg-navy-900 text-white">
      <div className="container-brand">
        <SectionHeading title={t.title} intro={t.intro} tone="dark" />

        <div className="mt-14 flex flex-col gap-0 md:grid md:grid-cols-6 md:gap-4">
          {t.steps.map((step, index) => (
            <ProcessStepCard
              key={step.title}
              number={processNumbers[index]}
              title={step.title}
              description={step.description}
              isLast={index === t.steps.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
