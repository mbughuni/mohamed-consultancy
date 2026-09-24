import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { site } from "@/lib/data";
import { locales, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const dict = await getDictionary(params.locale);

  const languages: Record<string, string> = {};
  for (const locale of locales) {
    languages[locale] = `${site.url}/${locale}`;
  }

  return {
    metadataBase: new URL(site.url),
    title: {
      default: dict.meta.titleDefault,
      template: dict.meta.titleTemplate,
    },
    description: dict.meta.description,
    alternates: {
      languages,
    },
    openGraph: {
      title: dict.meta.titleDefault,
      description: dict.meta.description,
      url: `${site.url}/${params.locale}`,
      siteName: site.name,
      locale: params.locale === "sw" ? "sw_TZ" : "en_US",
      type: "website",
      images: [
        {
          url: "/images/logo.png",
          width: 764,
          height: 760,
          alt: "Mohamed International Education Consultancy logo",
        },
      ],
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  const dict = await getDictionary(params.locale);

  return (
    <html
      lang={params.locale}
      className={`${manrope.variable} ${inter.variable}`}
    >
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-navy focus:px-4 focus:py-2 focus:text-white"
        >
          {dict.common.skipToContent}
        </a>
        <Navbar locale={params.locale} dict={dict} />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer locale={params.locale} dict={dict} />
      </body>
    </html>
  );
}
