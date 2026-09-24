"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  locales,
  localeNames,
  localeFlags,
  localeHref,
  stripLocale,
  type Locale,
} from "@/lib/i18n/config";

export default function LanguageSwitcher({
  locale,
  label,
  variant = "light",
}: {
  locale: Locale;
  label: string;
  variant?: "light" | "dark";
}) {
  const pathname = usePathname() || "/";
  const barePath = stripLocale(pathname);

  const isDark = variant === "dark";
  const dividerClass = isDark ? "text-white/25" : "text-navy-100";
  const activeClass = isDark
    ? "bg-white/10 text-white"
    : "bg-navy-50 text-navy-900";
  const inactiveClass = isDark
    ? "text-white/50 hover:bg-white/5 hover:text-white"
    : "text-muted hover:bg-navy-50/60 hover:text-navy-900";

  return (
    <div
      className="flex items-center gap-1.5 text-sm font-medium"
      aria-label={label}
    >
      {locales.map((loc, index) => (
        <span key={loc} className="flex items-center gap-1.5">
          {index > 0 ? <span className={dividerClass}>/</span> : null}
          <Link
            href={localeHref(loc as Locale, barePath)}
            aria-current={loc === locale ? "true" : undefined}
            aria-label={localeNames[loc as Locale]}
            className={`flex items-center gap-1.5 rounded px-1.5 py-0.5 uppercase tracking-wide transition-colors ${
              loc === locale ? activeClass : inactiveClass
            }`}
          >
            <span aria-hidden="true" className="text-base leading-none">
              {localeFlags[loc as Locale]}
            </span>
            {loc}
          </Link>
        </span>
      ))}
      <span className="sr-only">
        {locales.map((loc) => localeNames[loc as Locale]).join(", ")}
      </span>
    </div>
  );
}
