"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { localeHref, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionary";
import Button from "./Button";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const homeHref = localeHref(locale, "/");

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${
        scrolled ? "shadow-nav" : ""
      }`}
    >
      <div className="container-brand flex h-16 items-center justify-between">
        <Link
          href={homeHref}
          className="flex items-center gap-3"
          aria-label="Mohamed International Education Consultancy — home"
        >
          <span className="relative block h-10 w-10 overflow-hidden rounded-lg">
            <Image
              src="/images/logo.png"
              alt="Mohamed International Education Consultancy logo"
              fill
              sizes="40px"
              className="object-cover"
              priority
            />
          </span>
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="font-heading text-lg font-semibold text-navy-900">
              Mohamed
            </span>
            <span className="text-[11px] font-medium tracking-wide text-muted">
              International Education Consultancy
            </span>
          </span>
        </Link>

        <nav
          className="hidden items-center gap-8 lg:flex"
          aria-label="Primary"
        >
          {dict.nav.links.map((link) => {
            const href = localeHref(locale, link.path);
            const active =
              link.path === "/"
                ? pathname === homeHref
                : pathname?.startsWith(href);
            return (
              <Link
                key={link.path}
                href={href}
                className={`text-sm font-medium transition-colors hover:text-navy-900 ${
                  active ? "text-navy-900" : "text-muted"
                }`}
                aria-current={active ? "page" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <LanguageSwitcher
            locale={locale}
            label={dict.common.languageSwitchLabel}
          />
          <Button href={localeHref(locale, "/application-process")} className="text-xs">
            {dict.nav.cta}
          </Button>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <LanguageSwitcher
            locale={locale}
            label={dict.common.languageSwitchLabel}
          />
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-navy-900"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {open ? (
        <div
          id="mobile-menu"
          className="border-t border-navy-100 bg-white lg:hidden"
        >
          <nav
            className="container-brand flex flex-col gap-1 py-4"
            aria-label="Mobile"
          >
            {dict.nav.links.map((link) => (
              <Link
                key={link.path}
                href={localeHref(locale, link.path)}
                className="rounded-md px-3 py-3 text-base font-medium text-navy-900 hover:bg-navy-50"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 px-3">
              <Button
                href={localeHref(locale, "/application-process")}
                className="w-full"
              >
                {dict.nav.cta}
              </Button>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
