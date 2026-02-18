export const CATEGORY_CONFIG = [
  {
    key: "tools",
    label: "Tools",
    description:
      "Global calculators and utilities to help anyone solve practical tasks quickly.",
    href: "/tools",
  },
  {
    key: "prompts",
    label: "Prompts",
    description:
      "Copy-ready prompts for study, business, coding, writing, and productivity.",
    href: "/prompts",
  },
  {
    key: "templates",
    label: "Templates",
    description:
      "Professional templates for CVs, resumes, letters, emails, and messages.",
    href: "/templates",
  },
  {
    key: "guides",
    label: "Guides",
    description:
      "Structured guides for study, routines, productivity, programming, and interviews.",
    href: "/guides",
  },
  {
    key: "code",
    label: "Code",
    description:
      "Production-style code examples with copy support and syntax highlighting.",
    href: "/code",
  },
  {
    key: "build",
    label: "Build",
    description:
      "Original build prompt packs for apps, games, and websites inspired by common product patterns.",
    href: "/build",
  },
] as const;

export type CategoryKey = (typeof CATEGORY_CONFIG)[number]["key"];

export const CATEGORY_KEYS = CATEGORY_CONFIG.map((category) => category.key);

export function getCategoryByKey(category: CategoryKey) {
  return CATEGORY_CONFIG.find((item) => item.key === category);
}

export function isCategoryKey(value: string): value is CategoryKey {
  return CATEGORY_KEYS.includes(value as CategoryKey);
}
