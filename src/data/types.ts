/**
 * Unified Story Types
 * 
 * Supports both hardcoded chapter-based stories and WordPress raw HTML stories
 * All stories are converted to continuous pages for reading
 */

export interface UnifiedStory {
  id: string;
  slug: string;
  title: string;
  era: string;
  eraIcon: string;
  region: string;
  topic: string;
  subCategory: string;
  coverImage: string;
  heroImage: string;
  description: string;
  author: string;
  readTime: number;
  rating: number;
  tags: string[];
  publishedDate: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  length: 'quick' | 'standard' | 'deep';
  
  // Content can be in different formats
  content: StoryContent;
}

export type StoryContent =
  | { type: 'chapters'; chapters: ChapterContent[] }
  | { type: 'wordpress-raw'; rawHtml: string }
  | { type: 'continuous'; pages: PageContent[] };

export interface ChapterContent {
  id: string;
  title: string;
  content: string;
  readTime: number;
  images?: string[];
  youtubeLinks?: string[];
}

export interface PageContent {
  content: string;
  pageNumber: number;
  wordCount: number;
}

// Legacy Story type (for existing hardcoded stories)
export interface LegacyStory {
  id: string;
  slug: string;
  title: string;
  era: string;
  eraIcon: string;
  region: string;
  topic: string;
  subCategory: string;
  coverImage: string;
  heroImage: string;
  description: string;
  author: string;
  readTime: number;
  rating: number;
  chapters: ChapterContent[];
  tags: string[];
  publishedDate: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  length: 'quick' | 'standard' | 'deep';
}



