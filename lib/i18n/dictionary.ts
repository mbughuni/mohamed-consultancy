export interface Dictionary {
  meta: {
    titleDefault: string;
    titleTemplate: string;
    description: string;
  };
  common: {
    skipToContent: string;
    languageSwitchLabel: string;
  };
  nav: {
    links: { label: string; path: string }[];
    cta: string;
  };
  hero: {
    trustLine: string;
    headline: string;
    sub: string;
    ctaPrimary: string;
    ctaSecondary: string;
    locationNote: string;
    badgeTitle: string;
    badgeSub: string;
  };
  trust: { title: string; description: string }[];
  about: {
    title: string;
    intro: string;
    points: string[];
    cta: string;
    badgeTitle: string;
    badgeSub: string;
  };
  services: {
    title: string;
    intro: string;
    viewAll: string;
    items: { title: string; summary: string; detail: string }[];
  };
  process: {
    title: string;
    intro: string;
    steps: { title: string; description: string }[];
  };
  universities: {
    title: string;
    intro: string;
    exploreCta: string;
    note: string;
    items: { description: string }[];
  };
  whyChooseUs: {
    title: string;
    intro: string;
    reasons: { title: string; description: string }[];
  };
  testimonials: {
    title: string;
    intro: string;
    items: { quote: string; name: string; origin: string }[];
  };
  destinations: {
    title: string;
    intro: string;
    reasons: { title: string; description: string }[];
    learnMore: string;
  };
  cta: {
    title: string;
    text: string;
    primary: string;
    secondary: string;
  };
  contact: {
    heroTitle: string;
    heroIntro: string;
    title: string;
    intro: string;
    whatsappTitle: string;
    whatsappSub: string;
    whatsappMessage: string;
    labels: {
      phoneTanzania: string;
      phoneIndia: string;
      email: string;
      address: string;
      hours: string;
    };
    placeholders: {
      email: string;
      address: string;
      hours: string;
    };
    form: {
      fullName: string;
      phone: string;
      email: string;
      country: string;
      countryPlaceholder: string;
      studyLevel: string;
      studyLevelSelect: string;
      studyLevels: string[];
      course: string;
      coursePlaceholder: string;
      message: string;
      submit: string;
      thankYouTitle: string;
      thankYouBody: string;
    };
  };
  footer: {
    tagline: string;
    quickLinks: string;
    servicesHeading: string;
    contactHeading: string;
    copyright: string;
    footerTagline: string;
  };
  pages: {
    about: {
      eyebrow: string;
      title: string;
      intro: string;
      sectionTitle: string;
      sectionIntro: string;
      supportHeading: string;
      supportPoints: { title: string; description: string }[];
    };
    services: {
      eyebrow: string;
      title: string;
      intro: string;
      ctaHeading: string;
      ctaIntro: string;
    };
    universities: {
      eyebrow: string;
      title: string;
      intro: string;
      sectionTitle: string;
      sectionIntro: string;
      note: string;
    };
    process: {
      eyebrow: string;
      title: string;
      intro: string;
      readyTitle: string;
      readyIntro: string;
      ctaPrimary: string;
      ctaSecondary: string;
    };
    contact: {
      eyebrow: string;
      title: string;
      intro: string;
    };
    destinations: {
      eyebrow: string;
      title: string;
      intro: string;
      whatToExpect: string;
    };
  };
}
