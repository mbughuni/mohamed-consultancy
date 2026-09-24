# Mohamed International Education Consultancy — Website

A Next.js 14 (App Router) + TypeScript + Tailwind CSS website for Mohamed International Education Consultancy, built from the provided logo and flyer as branding reference. Available in **English** and **Swahili**.

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000 — it will redirect to `/en` or `/sw`
depending on your browser's language setting.

To build for production:

```bash
npm run build
npm run start
```

## Languages

The site is available in English and Swahili at `/en` and `/sw`. Visiting
`/` redirects to the visitor's preferred language (browser `Accept-Language`
header, remembered afterwards via a cookie), defaulting to English. A
language switcher (EN / SW) sits in the navbar on every page and preserves
the current page when switching.

All translatable copy lives in `lib/i18n/dictionaries/en.ts` and
`lib/i18n/dictionaries/sw.ts`, both implementing the `Dictionary` type in
`lib/i18n/dictionary.ts`. To edit copy in either language, edit the
matching dictionary file — component and page files never contain
hardcoded text. To add a third language: add the locale code to
`lib/i18n/config.ts`, create a new dictionary file that satisfies
`Dictionary`, and register it in `lib/i18n/get-dictionary.ts`.

Structural, non-text content (icons, image paths, phone numbers,
university logos/slugs) stays in `lib/data.ts` and is shared across
languages — the order of its arrays matches the order of the parallel
arrays in each dictionary (e.g. `serviceIcons[i]` goes with
`dict.services.items[i]`).

## Project structure

```
middleware.ts               Locale detection + redirect (/ → /en or /sw)
app/
  [locale]/                  All routes, per-locale
    layout.tsx                  Root layout: <html lang>, fonts, Navbar/Footer
    page.tsx                    Homepage
    about/                       About page
    services/                    Services page
    universities/                 Universities page
    application-process/          Application process page
    contact/                       Contact page
    destinations/                  Study in India page
  globals.css                Tailwind + theme tokens
  icon.png                   Favicon
  robots.ts / sitemap.ts     SEO files (sitemap includes both locales)

components/                 Reusable UI + section components (take a
                             `locale` and/or `dict` prop for translated text)
lib/
  data.ts                    Structural content shared across languages
  i18n/
    config.ts                   locales, defaultLocale, localeHref() helper
    dictionary.ts                TypeScript shape all dictionaries follow
    get-dictionary.ts             Loads the right dictionary for a locale
    dictionaries/en.ts             English copy
    dictionaries/sw.ts             Swahili copy
public/images/             Logo, cropped flyer photos, university logos
```

## Editing content

- **Text** (headings, buttons, descriptions, form labels, etc.): edit
  `lib/i18n/dictionaries/en.ts` and `lib/i18n/dictionaries/sw.ts`.
- **Structure** (services list, universities, icons, phone numbers):
  edit `lib/data.ts`. Keep dictionary arrays in the same order as the
  matching structural array.

## Known placeholders

The flyer and brief did not include an office email, physical address,
or business hours. These are marked as clearly-labelled placeholders in
both dictionaries (`contact.placeholders`) and rendered in italics on
the Contact page and footer. Replace them with real values once
available, in both `en.ts` and `sw.ts`.

The enquiry form on the Contact page is currently front-end only (it
shows a confirmation state on submit but does not send data anywhere).
Wire `components/ContactForm.tsx`'s `handleSubmit` up to an API route,
email service, or CRM when ready.

## Future expansion

The project is intentionally structured (data-driven content, isolated
components, App Router routes, dictionary-based i18n) so a student
portal, admin dashboard, blog, and other systems mentioned in the brief
can be added later without restructuring what's already here.
