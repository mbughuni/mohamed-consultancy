"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { localeHref, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionary";
import Button from "./Button";
import LanguageSwitcher from "./LanguageSwitcher";

// Entrance stagger timing (ms) for the navbar's own load-in animation.
const ENTER_BASE_DELAY = 60;
const ENTER_STAGGER = 50;

// How long the mobile drawer takes to slide closed, in ms. Used to delay
// unmounting so the exit transition can actually be seen, and to keep the
// drawer (and its links) out of the tab order once hidden.
const DRAWER_EXIT_MS = 280;

export default function Navbar({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // `open` is the user's intent (hamburger toggled). `drawerMounted` /
  // `drawerShown` separately drive DOM presence and the visual open/closed
  // state, so the drawer can slide out instead of disappearing instantly,
  // while still being removed from the DOM (and the tab order) once fully
  // closed.
  const [drawerMounted, setDrawerMounted] = useState(false);
  const [drawerShown, setDrawerShown] = useState(false);

  // Drawer content is rendered through a portal so it always overlays the
  // full page relative to the viewport, regardless of any transform on the
  // sticky header (the header's own entrance animation sets a transform,
  // which would otherwise turn it into a containing block for a
  // fixed-position child). Portals only work client-side, hence this flag.
  const [isBrowser, setIsBrowser] = useState(false);

  const pathname = usePathname();
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Mount/unmount + open/closed visual state for the drawer.
  useEffect(() => {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (open) {
      setDrawerMounted(true);
      // Mount in the closed position first, then flip to "shown" on the
      // next frame so there's an actual starting point to slide in from.
      const raf = requestAnimationFrame(() => setDrawerShown(true));
      return () => cancelAnimationFrame(raf);
    }

    setDrawerShown(false);
    const timeout = setTimeout(
      () => setDrawerMounted(false),
      reduceMotion ? 0 : DRAWER_EXIT_MS
    );
    return () => clearTimeout(timeout);
  }, [open]);

  // Lock page scroll while the drawer is open.
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // Move focus into the drawer when it opens, and back to the hamburger
  // button when it closes (but not on initial mount, when it was never
  // open in the first place).
  useEffect(() => {
    if (open) {
      closeButtonRef.current?.focus();
    } else if (wasOpenRef.current) {
      toggleButtonRef.current?.focus();
    }
    wasOpenRef.current = open;
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

        <div
          className={`flex items-center gap-3 transition-opacity duration-200 ease-premium motion-reduce:transition-none lg:hidden ${
            open ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
          aria-hidden={open}
        >
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
            ref={toggleButtonRef}
            type="button"
            tabIndex={open ? -1 : 0}
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

      {isBrowser && drawerMounted
        ? createPortal(
            <div className="lg:hidden">
              {/* Backdrop — dims and blurs the page behind the drawer.
                  z-[60] sits above the header's own z-50 so nothing in
                  the header (e.g. its now-hidden hamburger button) can
                  ever show through on top of the overlay. */}
              <div
                aria-hidden="true"
                onClick={() => setOpen(false)}
                className={`fixed inset-0 z-[60] bg-navy-950/50 backdrop-blur-[2px] transition-opacity duration-[280ms] ease-premium motion-reduce:transition-none ${
                  drawerShown ? "opacity-100" : "opacity-0"
                }`}
              />

              {/* Drawer — slides in from the left, overlaying the page */}
              <div
                id="mobile-menu"
                role="dialog"
                aria-modal="true"
                aria-label="Mobile navigation"
                className={`fixed inset-y-0 left-0 z-[70] flex h-full w-[82%] max-w-xs flex-col bg-white shadow-2xl transition-transform duration-[280ms] ease-premium motion-reduce:transition-none ${
                  drawerShown ? "translate-x-0" : "-translate-x-full"
                }`}
              >
                <div className="flex h-16 items-center justify-between border-b border-navy-100 pl-5 pr-3">
                  <Link
                    href={homeHref}
                    className="flex items-center gap-3"
                    onClick={() => setOpen(false)}
                  >
                    <span className="relative block h-9 w-9 overflow-hidden rounded-lg">
                      <Image
                        src="/images/logo.png"
                        alt="Mohamed International Education Consultancy logo"
                        fill
                        sizes="36px"
                        className="object-cover"
                      />
                    </span>
                    <span className="font-heading text-base font-semibold text-navy-900">
                      Mohamed
                    </span>
                  </Link>
                  <button
                    ref={closeButtonRef}
                    type="button"
                    className="inline-flex items-center justify-center rounded-md p-2 text-navy-900"
                    aria-label="Close menu"
                    onClick={() => setOpen(false)}
                  >
                    <X size={24} />
                  </button>
                </div>

                <nav
                  className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4"
                  aria-label="Mobile"
                >
                  {dict.nav.links.map((link, index) => (
                    <Link
                      key={link.path}
                      href={localeHref(locale, link.path)}
                      className={`rounded-md px-3 py-3 text-base font-medium text-navy-900 transition-all duration-300 ease-premium motion-reduce:transition-none hover:bg-navy-50 ${
                        drawerShown
                          ? "translate-x-0 opacity-100"
                          : "-translate-x-2 opacity-0"
                      }`}
                      style={{
                        transitionDelay: drawerShown ? `${index * 40}ms` : "0ms",
                      }}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>

                <div
                  className={`space-y-4 border-t border-navy-100 px-5 py-5 transition-all duration-300 ease-premium motion-reduce:transition-none ${
                    drawerShown
                      ? "translate-x-0 opacity-100"
                      : "-translate-x-2 opacity-0"
                  }`}
                  style={{
                    transitionDelay: drawerShown
                      ? `${dict.nav.links.length * 40}ms`
                      : "0ms",
                  }}
                >
                  <LanguageSwitcher
                    locale={locale}
                    label={dict.common.languageSwitchLabel}
                  />
                  <Button
                    href={localeHref(locale, "/application-process")}
                    className="w-full"
                  >
                    {dict.nav.cta}
                  </Button>
                </div>
              </div>
            </div>,
            document.body
          )
        : null}
    </header>
  );
}
