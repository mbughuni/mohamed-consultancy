import Image from "next/image";
import { MapPin } from "lucide-react";

export default function UniversityCard({
  name,
  location,
  logo,
  description,
}: {
  name: string;
  location: string;
  logo: string;
  description: string;
}) {
  return (
    <div className="flex flex-col rounded-xl border border-navy-100 bg-white p-6 transition-shadow duration-200 hover:shadow-card">
      <div className="relative flex h-16 items-center">
        <Image
          src={logo}
          alt={`${name} logo`}
          width={160}
          height={64}
          className="max-h-16 w-auto object-contain"
        />
      </div>
      <h3 className="mt-5 font-heading font-semibold text-lg text-navy-900">
        {name}
      </h3>
      <p className="mt-1 flex items-center gap-1.5 text-xs font-medium text-gold-600">
        <MapPin size={14} />
        {location}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-muted">{description}</p>
    </div>
  );
}
