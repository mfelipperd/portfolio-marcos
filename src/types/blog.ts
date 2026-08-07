export interface BlogPostReference {
  title: string;
  url: string;
}

export interface BlogPostFrontmatter {
  title: string;
  description: string;
  date: string;
  tags: string[];
  coverImage?: string;
  references?: BlogPostReference[];
}

export interface BlogPostMeta extends BlogPostFrontmatter {
  slug: string;
  readingTime: string;
}

export interface BlogPost extends BlogPostMeta {
  content: string;
}
