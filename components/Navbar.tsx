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

// Entrance stagger timing (ms). Kept subtle and fast — see the explanation
// notes for why these specific numbers were chosen.
const ENTER_BASE_DELAY = 60;
const ENTER_STAGGER = 50;

// How long the mobile menu panel takes to animate closed, in ms. Used to
// delay unmounting so the exit transition can actually be seen, and to
// keep the panel (and its links) out of the tab order once hidden.
const MOBILE_MENU_EXIT_MS = 240;

export default function Navbar({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // `open` is the user's intent (hamburger toggled). `panelMounted` /
  // `panelShown` separately drive the actual DOM presence and the visual
  // enter/exit state, so the mobile menu can animate out instead of
  // disappearing instantly, while still being removed from the DOM (and
  // the tab order) once fully closed.
  const [panelMounted, setPanelMounted] = useState(false);
  const [panelShown, setPanelShown] = useState(false);

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

  useEffect(() => {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (open) {
      setPanelMounted(true);
      // Mount in the closed state first, then flip to "shown" on the next
      // frame so the browser actually paints a starting point to
      // transition from (otherwise it can jump straight to the open
      // state with no visible animation).
      const raf = requestAnimationFrame(() => setPanelShown(true));
      return () => cancelAnimationFrame(raf);
    }

    setPanelShown(false);
    const timeout = setTimeout(
      () => setPanelMounted(false),
      reduceMotion ? 0 : MOBILE_MENU_EXIT_MS
    );
    return () => clearTimeout(timeout);
  }, [open]);

  const homeHref = localeHref(locale, "/");

  return (
    <header
      className={`sticky top-0 z-50 animate-nav-enter bg-white transition-shadow duration-300 ease-premium motion-reduce:animate-none motion-reduce:transition-none ${
        scrolled ? "shadow-nav" : ""
      }`}
    >
      <div className="container-brand flex h-16 items-center justify-between">
        <Link
          href={homeHref}
          className="flex animate-nav-logo-enter items-center gap-3 motion-reduce:animate-none"
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
          {dict.nav.links.map((link, index) => {
            const href = localeHref(locale, link.path);
            const active =
              link.path === "/"
                ? pathname === homeHref
                : pathname?.startsWith(href);
            return (
              <Link
                key={link.path}
                href={href}
                className={`animate-nav-item-enter text-sm font-medium transition-colors motion-reduce:animate-none hover:text-navy-900 ${
                  active ? "text-navy-900" : "text-muted"
                }`}
                style={{ animationDelay: `${ENTER_BASE_DELAY + index * ENTER_STAGGER}ms` }}
                aria-current={active ? "page" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <span
            className="animate-nav-item-enter motion-reduce:animate-none"
            style={{
              animationDelay: `${
                ENTER_BASE_DELAY + dict.nav.links.length * ENTER_STAGGER
              }ms`,
            }}
          >
            <LanguageSwitcher
              locale={locale}
              label={dict.common.languageSwitchLabel}
            />
          </span>
          <span
            className="animate-nav-item-enter motion-reduce:animate-none"
            style={{
              animationDelay: `${
                ENTER_BASE_DELAY + (dict.nav.links.length + 1) * ENTER_STAGGER
              }ms`,
            }}
          >
            <Button
              href={localeHref(locale, "/application-process")}
              className="text-xs"
            >
              {dict.nav.cta}
            </Button>
          </span>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <span
            className="animate-nav-item-enter motion-reduce:animate-none"
            style={{ animationDelay: `${ENTER_BASE_DELAY}ms` }}
          >
            <LanguageSwitcher
              locale={locale}
              label={dict.common.languageSwitchLabel}
            />
          </span>
          <button
            type="button"
            className="animate-nav-item-enter inline-flex items-center justify-center rounded-md p-2 text-navy-900 motion-reduce:animate-none"
            style={{ animationDelay: `${ENTER_BASE_DELAY + ENTER_STAGGER}ms` }}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {panelMounted ? (
        <div
          id="mobile-menu"
          className={`overflow-hidden border-t border-navy-100 bg-white transition-all duration-[240ms] ease-premium motion-reduce:transition-none lg:hidden ${
            panelShown
              ? "translate-y-0 opacity-100"
              : "-translate-y-2 opacity-0"
          }`}
        >
          <nav
            className="container-brand flex flex-col gap-1 py-4"
            aria-label="Mobile"
          >
            {dict.nav.links.map((link, index) => (
              <Link
                key={link.path}
                href={localeHref(locale, link.path)}
                className={`rounded-md px-3 py-3 text-base font-medium text-navy-900 transition-all duration-300 ease-premium motion-reduce:transition-none hover:bg-navy-50 ${
                  panelShown
                    ? "translate-y-0 opacity-100"
                    : "-translate-y-1 opacity-0"
                }`}
                style={{
                  transitionDelay: panelShown ? `${index * 40}ms` : "0ms",
                }}
              >
                {link.label}
              </Link>
            ))}
            <div
              className={`mt-2 px-3 transition-all duration-300 ease-premium motion-reduce:transition-none ${
                panelShown
                  ? "translate-y-0 opacity-100"
                  : "-translate-y-1 opacity-0"
              }`}
              style={{
                transitionDelay: panelShown
                  ? `${dict.nav.links.length * 40}ms`
                  : "0ms",
              }}
            >
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
