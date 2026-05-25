export type SiteContent = {
  name: string;
  title: string;
  description: string;
  url: string;
  image: string;
  keywords: string[];
};

export type ProfileContent = {
  name: string;
  role: string;
  email: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;
};

export type HeroStat = {
  value: string;
  label: string;
};

export type HeroContent = {
  kicker: string;
  headline: string;
  body: string;
  primaryCta: string;
  secondaryCta: string;
  image: string;
  imageAlt: string;
  stats: HeroStat[];
};

export type SkillGroup = {
  category: string;
  icon: "code" | "database" | "globe" | "palette" | "smartphone" | "zap";
  skills: string[];
};

export type AboutContent = {
  kicker: string;
  headline: string;
  body: string;
  workTitle: string;
  workParagraphs: string[];
  servicesTitle: string;
  services: string[];
  skillsKicker: string;
  skillsHeadline: string;
  skills: SkillGroup[];
};

export type ProjectsSectionContent = {
  kicker: string;
  headline: string;
  body: string;
};

export type ProjectContent = {
  id: number;
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  category: string;
  date: string;
  github: string;
  live: string;
  featured: boolean;
};

export type ContactContent = {
  kicker: string;
  headline: string;
  body: string;
};

export type FooterContent = {
  summary: string;
  copyright: string;
};

export type PortfolioContent = {
  site: SiteContent;
  profile: ProfileContent;
  hero: HeroContent;
  about: AboutContent;
  projectsSection: ProjectsSectionContent;
  projects: ProjectContent[];
  contact: ContactContent;
  footer: FooterContent;
};
