import fs from "fs";
import path from "path";
import { cache } from "react";
import { CATEGORY_KEYS, type CategoryKey } from "@/lib/categories";

export type ToolType =
  | "gpa"
  | "ielts"
  | "age"
  | "bmi"
  | "grade"
  | "percentage"
  | "study-time"
  | "salary"
  | "loan"
  | "time-zone"
  | "unit-converter";

export type PromptEntry = {
  title: string;
  description: string;
  text: string;
};

export type BuildPrompts = {
  chatgpt_claude_prompt: string;
  gemini_prompt: string;
  codex_prompt: string;
};

export type CodeEntry = {
  title: string;
  language: string;
  code: string;
};

export type SectionEntry = {
  title: string;
  content: string;
};

export type ContentItem = {
  category?: CategoryKey;
  slug: string;
  title: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  body?: string;
  featured?: boolean;
  updatedAt?: string;
  intro?: string;
  inspiredBy?: string;
  toolType?: ToolType;
  prompts?: PromptEntry[] | BuildPrompts;
  templateText?: string;
  sections?: SectionEntry[];
  codeBlocks?: CodeEntry[];
};

export type ContentRecord = ContentItem & {
  category: CategoryKey;
  href: string;
};

const CONTENT_ROOT = path.join(process.cwd(), "content");

function toContentRecord(category: CategoryKey, item: ContentItem): ContentRecord {
  const resolvedCategory = item.category ?? category;
  return {
    ...item,
    category: resolvedCategory,
    href: `/${resolvedCategory}/${item.slug}`,
  };
}

function readCategoryFiles(category: CategoryKey): ContentRecord[] {
  const categoryPath = path.join(CONTENT_ROOT, category);

  if (!fs.existsSync(categoryPath)) {
    return [];
  }

  const files = fs
    .readdirSync(categoryPath)
    .filter((file) => file.endsWith(".json"))
    .sort((a, b) => a.localeCompare(b));

  return files.map((fileName) => {
    const filePath = path.join(categoryPath, fileName);
    const raw = fs.readFileSync(filePath, "utf8");
    const parsed = JSON.parse(raw) as ContentItem;
    return toContentRecord(category, parsed);
  });
}

export const getCategoryContent = cache((category: CategoryKey): ContentRecord[] => {
  return readCategoryFiles(category);
});

export const getAllContent = cache((): ContentRecord[] => {
  return CATEGORY_KEYS.flatMap((category) => getCategoryContent(category));
});

export function getContentBySlug(
  category: CategoryKey,
  slug: string,
): ContentRecord | null {
  const item = getCategoryContent(category).find((entry) => entry.slug === slug);
  return item ?? null;
}

export function getFeaturedContent(
  category: CategoryKey,
  limit = 6,
): ContentRecord[] {
  return getCategoryContent(category)
    .filter((item) => item.featured)
    .slice(0, limit);
}

export function searchContent(query: string): ContentRecord[] {
  const normalized = query.trim().toLowerCase();

  if (!normalized) {
    return [];
  }

  return getAllContent()
    .filter((item) => {
      const haystack = [
        item.title,
        item.description,
        item.seoTitle,
        item.seoDescription,
        item.body ?? "",
        item.keywords.join(" "),
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(normalized);
    })
    .sort((a, b) => {
      const aStarts = a.title.toLowerCase().startsWith(normalized) ? 1 : 0;
      const bStarts = b.title.toLowerCase().startsWith(normalized) ? 1 : 0;
      if (aStarts !== bStarts) {
        return bStarts - aStarts;
      }
      return a.title.localeCompare(b.title);
    });
}
