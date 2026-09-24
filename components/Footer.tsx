import Image from "next/image";
import Link from "next/link";
import { Phone, MessageCircle, Facebook, Instagram } from "lucide-react";
import { contactInfo, buildWhatsappHref } from "@/lib/data";
import { localeHref, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionary";

export default function Footer({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const whatsappHref = buildWhatsappHref(dict.contact.whatsappMessage);

  return (
    <footer className="bg-navy-900 text-white/80">
      <div className="container-brand grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1.2fr] md:gap-8">
        <div>
          <Link href={localeHref(locale, "/")} className="flex items-center gap-3">
            <span className="relative block h-11 w-11 overflow-hidden rounded-lg">
              <Image
                src="/images/logo.png"
                alt="Mohamed International Education Consultancy logo"
                fill
                sizes="44px"
                className="object-cover"
              />
            </span>
            <span className="font-heading font-semibold text-lg text-white">Mohamed</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
            {dict.footer.tagline}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white/45">
            {dict.footer.quickLinks}
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {dict.nav.links.map((link) => (
              <li key={link.path}>
                <Link href={localeHref(locale, link.path)} className="hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white/45">
            {dict.footer.servicesHeading}
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {dict.services.items.slice(0, 4).map((service) => (
              <li key={service.title}>
                <Link href={localeHref(locale, "/services")} className="hover:text-white">
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white/45">
            {dict.footer.contactHeading}
          </h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a
                href={contactInfo.phoneTanzaniaHref}
                className="flex items-center gap-2 hover:text-white"
              >
                <Phone size={16} className="shrink-0 text-gold-300" />
                {dict.contact.labels.phoneTanzania}: {contactInfo.phoneTanzania}
              </a>
            </li>
            <li>
              <a
                href={contactInfo.phoneIndiaHref}
                className="flex items-center gap-2 hover:text-white"
              >
                <Phone size={16} className="shrink-0 text-gold-300" />
                {dict.contact.labels.phoneIndia}: {contactInfo.phoneIndia}
              </a>
            </li>
            <li>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white"
              >
                <MessageCircle size={16} className="shrink-0 text-gold-300" />
                {dict.contact.whatsappTitle}
              </a>
            </li>
          </ul>
          <div className="mt-5 flex gap-3">
            <span
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/40"
              aria-label="Facebook (link not yet provided)"
              title="Social media link not yet provided"
            >
              <Facebook size={16} />
            </span>
            <span
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/40"
              aria-label="Instagram (link not yet provided)"
              title="Social media link not yet provided"
            >
              <Instagram size={16} />
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-brand flex flex-col items-center justify-between gap-2 py-6 text-xs text-white/50 sm:flex-row">
          <p>{dict.footer.copyright}</p>
          <p>{dict.footer.footerTagline}</p>
        </div>
      </div>
    </footer>
  );
}
