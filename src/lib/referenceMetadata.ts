import "server-only";
import ogs from "open-graph-scraper";
import type { BlogPostReference } from "@/types/blog";

export interface ReferenceCard extends BlogPostReference {
  siteName?: string;
  image?: string;
  favicon?: string;
  ogDescription?: string;
}

export async function getReferenceCard(
  reference: BlogPostReference
): Promise<ReferenceCard> {
  try {
    const { error, result } = await ogs({ url: reference.url, timeout: 8000 });
    if (error) return reference;

    return {
      ...reference,
      siteName: result.ogSiteName,
      image: result.ogImage?.[0]?.url,
      favicon: result.favicon,
      ogDescription: result.ogDescription,
    };
  } catch {
    return reference;
  }
}

export function getReferenceCards(
  references: BlogPostReference[]
): Promise<ReferenceCard[]> {
  return Promise.all(references.map(getReferenceCard));
}
