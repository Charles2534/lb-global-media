export const site = {
  name: "LB Global Media",
  email: "info@lbglobalmedia.com",
  description:
    "LB Global Media is an international film production & distribution company curating, producing and distributing feature-length anthologies for global audiences.",
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/catalogue", label: "Catalogue & Titles" },
  { href: "/production", label: "Production & Partnerships" },
  { href: "/contact", label: "Contact" },
] as const;

export const enquiryTypes = [
  { value: "General", param: "general" },
  { value: "Licensing", param: "licensing" },
  { value: "Filmmaker Submission", param: "filmmaker" },
  { value: "Partnership", param: "partnership" },
] as const;

export const partners = [
  { name: "Amazon Prime Video", file: "amazon.png", size: "lg" },
  { name: "Tubi", file: "tubi.png", size: "default" },
  { name: "Box Brazil Play", file: "boxbrazil.png", size: "lg" },
  { name: "Future Today", file: "futuretoday.png", size: "lg" },
  { name: "Digital Virgo", file: "digitalvirgo.webp", size: "default" },
  { name: "Hoopla", file: "hoopla.png", size: "default" },
  { name: "OTT Studio", file: "ottstudio.png", size: "lg" },
] as const;
