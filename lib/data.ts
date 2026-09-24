import {
  GraduationCap,
  FileCheck2,
  Plane,
  Users,
  Compass,
  Luggage,
  ShieldCheck,
  UserCheck,
  Globe2,
  HeartHandshake,
  type LucideIcon,
} from "lucide-react";

// Text content lives in lib/i18n/dictionaries/*.ts, translated per locale.
// This file holds only locale-independent structure: icons, image paths,
// slugs, and raw contact numbers — kept in a fixed order that matches the
// parallel arrays in each dictionary.

export const site = {
  name: "Mohamed International Education Consultancy",
  shortName: "Mohamed IEC",
  url: "https://www.mohamedconsultancy.example",
};

export const contactInfo = {
  phoneTanzania: "+255 774 889 797",
  phoneTanzaniaHref: "tel:+255774889797",
  phoneIndia: "+91 81466 82534",
  phoneIndiaHref: "tel:+918146682534",
  whatsappNumber: "255774889797",
};

export function buildWhatsappHref(message: string): string {
  return `https://wa.me/${contactInfo.whatsappNumber}?text=${encodeURIComponent(
    message
  )}`;
}

// Order matches dictionary `services.items`
export const serviceSlugs = [
  "university-admission",
  "visa-application",
  "travel-arrangements",
  "arrival-assistance",
  "student-guidance",
  "pre-departure-support",
] as const;

export const serviceIcons: LucideIcon[] = [
  GraduationCap,
  FileCheck2,
  Plane,
  Luggage,
  Users,
  Compass,
];

// Order matches dictionary `trust`
export const trustIcons: LucideIcon[] = [
  GraduationCap,
  FileCheck2,
  Plane,
  Luggage,
];

// Order matches dictionary `process.steps`
export const processNumbers = ["01", "02", "03", "04", "05", "06"];

// Order matches dictionary `universities.items`
export const universities = [
  {
    slug: "ct-university",
    name: "CT University",
    location: "Punjab, India",
    logo: "/images/universities/ct-university.png",
  },
  {
    slug: "cgc-university-mohali",
    name: "CGC University Mohali",
    location: "Mohali, Punjab, India",
    logo: "/images/universities/cgc-university.png",
  },
  {
    slug: "nims-university",
    name: "NIMS University",
    location: "Rajasthan, Jaipur, India",
    logo: "/images/universities/nims-university.png",
  },
  {
    slug: "guru-kashi-university",
    name: "Guru Kashi University",
    location: "Punjab, India",
    logo: "/images/universities/guru-kashi-university.png",
  },
  {
    slug: "parul-university",
    name: "Parul University",
    location: "Gujarat, India",
    logo: "/images/universities/parul-university.jpg",
  },
];

// Order matches dictionary `whyChooseUs.reasons`
export const whyChooseIcons: LucideIcon[] = [
  ShieldCheck,
  UserCheck,
  Globe2,
  HeartHandshake,
];
