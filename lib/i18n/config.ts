export const locales = ["en", "sw"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "English",
  sw: "Kiswahili",
};

/** Flag emoji shown next to each language in the switcher. English is
 * represented with the UK flag (the conventional flag for the English
 * language itself); Swahili with the Tanzanian flag, matching the site's
 * primary audience. */
export const localeFlags: Record<Locale, string> = {
  en: "🇬🇧",
  sw: "🇹🇿",
};

/** Build a locale-prefixed href from a locale-agnostic path like "/about". */
export function localeHref(locale: Locale, path: string): string {
  if (path === "/") return `/${locale}`;
  return `/${locale}${path}`;
}

/** Strip a known locale prefix off a pathname, returning the bare path. */
export function stripLocale(pathname: string): string {
  const segments = pathname.split("/");
  if (segments.length > 1 && locales.includes(segments[1] as Locale)) {
    const rest = "/" + segments.slice(2).join("/");
    return rest === "/" ? "/" : rest.replace(/\/$/, "") || "/";
  }
  return pathname;
}