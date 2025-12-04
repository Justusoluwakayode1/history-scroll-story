/**
 * Story Formatter
 * 
 * Converts any story format (chapters, WordPress, continuous) into paginated pages
 * for continuous book-like reading experience
 */

import { UnifiedStory, StoryContent, PageContent, LegacyStory } from "@/data/types";

export interface FormattedPages {
  pages: PageContent[];
  totalPages: number;
  totalWords: number;
}

/**
 * Counts words in text (handles HTML)
 */
function countWords(text: string): number {
  // Remove HTML tags
  const textOnly = text.replace(/<[^>]*>/g, ' ');
  // Count words (split by whitespace and filter empty)
  return textOnly.trim().split(/\s+/).filter(word => word.length > 0).length;
}

/**
 * Merges all chapters into one continuous text
 * Chapter titles are included as headings in the flow
 */
function mergeChaptersToText(chapters: Array<{ title: string; content: string }>): string {
  let fullText = '';
  
  for (const chapter of chapters) {
    // Add chapter title as heading (but it's part of the continuous flow)
    if (chapter.title) {
      fullText += `<h2>${chapter.title}</h2>\n\n`;
    }
    // Add chapter content
    fullText += chapter.content + '\n\n';
  }
  
  return fullText.trim();
}

/**
 * Cleans WordPress HTML - keeps only essential tags
 */
function cleanWordPressHTML(html: string): string {
  // Create temporary div to parse HTML
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;

  // Remove unwanted elements
  const unwantedTags = ['script', 'style', 'noscript', 'iframe', 'embed'];
  unwantedTags.forEach(tag => {
    const elements = tempDiv.querySelectorAll(tag);
    elements.forEach(el => el.remove());
  });

  // Clean attributes but keep essential ones
  const allElements = tempDiv.querySelectorAll('*');
  allElements.forEach(el => {
    const tagName = el.tagName.toLowerCase();
    
    // Keep only essential attributes
    const allowedAttrs: Record<string, string[]> = {
      'img': ['src', 'alt', 'class'],
      'a': ['href', 'class'],
      'h1': ['class'],
      'h2': ['class'],
      'h3': ['class'],
      'h4': ['class'],
      'p': ['class'],
    };

    const allowed = allowedAttrs[tagName] || [];
    Array.from(el.attributes).forEach(attr => {
      if (!allowed.includes(attr.name)) {
        el.removeAttribute(attr.name);
      }
    });

    // Add responsive classes to images
    if (tagName === 'img') {
      el.classList.add('w-full', 'max-w-2xl', 'mx-auto', 'my-8', 'rounded-lg', 'shadow-lg');
      if (!el.getAttribute('alt')) {
        el.setAttribute('alt', 'Story illustration');
      }
    }
  });

  return tempDiv.innerHTML;
}

/**
 * Splits text into pages based on word count
 * Tries to break at paragraph boundaries for better readability
 */
function splitTextToPages(text: string, wordsPerPage: number = 2000): PageContent[] {
  // Split by HTML paragraphs and headings
  const htmlRegex = /(<(?:p|h[1-4]|div)[^>]*>.*?<\/(?:p|h[1-4]|div)>)/gis;
  const matches = text.match(htmlRegex) || [];
  
  // If no HTML structure, split by double newlines
  const paragraphs = matches.length > 0 
    ? matches
    : text.split(/\n\n+/).filter(p => p.trim().length > 0);
  
  const pages: PageContent[] = [];
  let currentPage = '';
  let currentWordCount = 0;
  let pageNumber = 1;

  for (const paragraph of paragraphs) {
    const paragraphWordCount = countWords(paragraph);
    
    // If adding this paragraph would exceed the limit, start a new page
    if (currentWordCount + paragraphWordCount > wordsPerPage && currentPage.length > 0) {
      pages.push({
        content: currentPage.trim(),
        pageNumber: pageNumber++,
        wordCount: currentWordCount,
      });
      currentPage = paragraph;
      currentWordCount = paragraphWordCount;
    } else {
      currentPage += (currentPage ? '\n\n' : '') + paragraph;
      currentWordCount += paragraphWordCount;
    }
  }

  // Add the last page
  if (currentPage.trim().length > 0) {
    pages.push({
      content: currentPage.trim(),
      pageNumber: pageNumber,
      wordCount: currentWordCount,
    });
  }

  // Ensure we have at least one page
  if (pages.length === 0) {
    pages.push({
      content: text,
      pageNumber: 1,
      wordCount: countWords(text),
    });
  }

  return pages;
}

/**
 * Prepares any story format for reading by converting to pages
 */
export function prepareForReading(story: UnifiedStory, wordsPerPage: number = 2000): FormattedPages {
  let fullText = '';

  if (story.content.type === 'chapters') {
    // Merge all chapters into one continuous text
    fullText = mergeChaptersToText(
      story.content.chapters.map(ch => ({
        title: ch.title,
        content: ch.content
      }))
    );
  } else if (story.content.type === 'wordpress-raw') {
    // Clean WordPress HTML and extract text
    fullText = cleanWordPressHTML(story.content.rawHtml);
  } else if (story.content.type === 'continuous') {
    // Already in page format, just return it
    return {
      pages: story.content.pages,
      totalPages: story.content.pages.length,
      totalWords: story.content.pages.reduce((sum, page) => sum + page.wordCount, 0),
    };
  }

  // Split into pages
  const pages = splitTextToPages(fullText, wordsPerPage);
  const totalWords = pages.reduce((sum, page) => sum + page.wordCount, 0);

  return {
    pages,
    totalPages: pages.length,
    totalWords,
  };
}

/**
 * Converts legacy chapter-based story to unified format
 */
export function convertLegacyStory(legacyStory: LegacyStory): UnifiedStory {
  return {
    ...legacyStory,
    content: {
      type: 'chapters',
      chapters: legacyStory.chapters.map(ch => ({
        id: ch.id,
        title: ch.title,
        content: ch.content,
        readTime: ch.readTime,
        images: ch.images,
        youtubeLinks: ch.youtubeLinks,
      })),
    },
  };
}


