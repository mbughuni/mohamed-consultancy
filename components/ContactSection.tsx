import { Phone, MessageCircle, Mail, MapPin, Clock } from "lucide-react";
import SectionHeading from "./SectionHeading";
import ContactForm from "./ContactForm";
import { contactInfo, buildWhatsappHref } from "@/lib/data";
import type { Dictionary } from "@/lib/i18n/dictionary";

export default function ContactSection({ dict }: { dict: Dictionary }) {
  const t = dict.contact;
  const whatsappHref = buildWhatsappHref(t.whatsappMessage);

  const infoItems = [
    {
      icon: Phone,
      label: t.labels.phoneTanzania,
      value: contactInfo.phoneTanzania,
      href: contactInfo.phoneTanzaniaHref,
    },
    {
      icon: Phone,
      label: t.labels.phoneIndia,
      value: contactInfo.phoneIndia,
      href: contactInfo.phoneIndiaHref,
    },
    {
      icon: Mail,
      label: t.labels.email,
      value: t.placeholders.email,
      href: undefined,
    },
    {
      icon: MapPin,
      label: t.labels.address,
      value: t.placeholders.address,
      href: undefined,
    },
    {
      icon: Clock,
      label: t.labels.hours,
      value: t.placeholders.hours,
      href: undefined,
    },
  ];

  return (
    <section className="section-pad">
      <div className="container-brand">
        <SectionHeading title={t.title} intro={t.intro} />

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-14">
          <div>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-xl bg-navy-900 p-6 text-white transition-colors hover:bg-navy-800"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold-500 text-navy-900">
                <MessageCircle size={22} />
              </span>
              <span>
                <span className="block font-heading font-semibold text-lg">
                  {t.whatsappTitle}
                </span>
                <span className="block text-sm text-white/70">
                  {t.whatsappSub}
                </span>
              </span>
            </a>

            <ul className="mt-6 space-y-5">
              {infoItems.map((item) => {
                const Icon = item.icon;
                const looksPlaceholder =
                  item.value.toUpperCase().includes("PLACEHOLDER") ||
                  item.value.toUpperCase().includes("NAFASI WAZI");
                const content = (
                  <>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface text-navy-900">
                      <Icon size={18} />
                    </span>
                    <span>
                      <span className="block text-xs font-medium uppercase tracking-wide text-muted">
                        {item.label}
                      </span>
                      <span
                        className={`block text-sm ${
                          looksPlaceholder
                            ? "italic text-muted/80"
                            : "font-medium text-navy-900"
                        }`}
                      >
                        {item.value}
                      </span>
                    </span>
                  </>
                );
                return (
                  <li key={item.label} className="flex items-start gap-4">
                    {item.href ? (
                      <a href={item.href} className="flex items-start gap-4">
                        {content}
                      </a>
                    ) : (
                      content
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <ContactForm dict={dict} />
        </div>
      </div>
    </section>
  );
}
