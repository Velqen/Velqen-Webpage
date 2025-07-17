// /types/blog.ts
export type BlogContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "bullet"; items: string[] }
  | { type: "image"; src: string; alt?: string };

export interface BlogPostItem {
  id: number;
  slug: string;
  title: string;
  category: string;
  date: string;
  image: string;
  content: BlogContentBlock[];
  hasIcons?: boolean;
}