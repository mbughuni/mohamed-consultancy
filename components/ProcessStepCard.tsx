export default function ProcessStepCard({
  number,
  title,
  description,
  isLast,
}: {
  number: string;
  title: string;
  description: string;
  isLast?: boolean;
}) {
  return (
    <div className="relative flex gap-5 md:block md:gap-0">
      <div className="flex flex-col items-center md:mb-5 md:flex-row">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold-500 font-heading font-semibold text-base text-navy-900">
          {number}
        </span>
        {!isLast ? (
          <span
            aria-hidden="true"
            className="mt-1 w-px flex-1 bg-white/15 md:ml-4 md:mt-0 md:h-px md:w-full md:flex-none"
          />
        ) : null}
      </div>
      <div className="pb-10 md:pb-0 md:pr-3">
        <h3 className="font-heading font-semibold text-lg text-white">{title}</h3>
        <p className="mt-2 max-w-[220px] text-sm leading-relaxed text-white/65">
          {description}
        </p>
      </div>
    </div>
  );
}
