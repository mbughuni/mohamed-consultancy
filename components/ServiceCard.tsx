import type { LucideIcon } from "lucide-react";

export default function ServiceCard({
  icon: Icon,
  title,
  summary,
}: {
  icon: LucideIcon;
  title: string;
  summary: string;
}) {
  return (
    <div className="group rounded-xl border border-navy-100 bg-white p-7 transition-all duration-200 hover:-translate-y-0.5 hover:border-navy-200 hover:shadow-card-hover">
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-900 text-gold-300 transition-colors group-hover:bg-gold-500 group-hover:text-navy-900">
        <Icon size={22} />
      </span>
      <h3 className="mt-5 font-heading font-semibold text-xl text-navy-900">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{summary}</p>
    </div>
  );
}
