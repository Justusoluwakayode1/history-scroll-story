/**
 * WordPress Content Formatter
 * 
 * Formats WordPress JSON content into clean, readable pages for book-like reading.
 * Handles content extraction, HTML cleaning, and pagination.
 */

export interface FormattedPage {
  content: string;
  wordCount: number;
  pageNumber: number;
  hasImages: boolean;
  hasVideos: boolean;
}

export interface FormattedStory {
  pages: FormattedPage[];
  totalPages: number;
  totalWords: number;
}

/**
 * Cleans WordPress HTML content
 * Keeps only essential tags: <p>, <h1-h4>, <img>, <a>
 * Also handles YouTube embeds
 */
function cleanWordPressHTML(html: string): string {
  // Create a temporary div to parse HTML
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;

  // Convert YouTube links to embeds
  const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/g;
  const links = tempDiv.querySelectorAll('a[href*="youtube"], a[href*="youtu.be"]');
  links.forEach(link => {
    const href = link.getAttribute('href') || '';
    const match = href.match(youtubeRegex);
    if (match) {
      const videoId = match[0].includes('youtu.be/')
        ? match[0].split('youtu.be/')[1]?.split('?')[0]
        : match[0].split('v=')[1]?.split('&')[0];
      if (videoId) {
        const embedDiv = document.createElement('div');
        embedDiv.className = 'my-8';
        embedDiv.innerHTML = `
          <div class="relative w-full" style="padding-bottom: 56.25%">
            <iframe
              class="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
              src="https://www.youtube.com/embed/${videoId}"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        `;
        link.parentNode?.replaceChild(embedDiv, link);
      }
    }
  });

  // Remove unwanted elements
  const unwantedTags = ['script', 'style', 'noscript'];
  unwantedTags.forEach(tag => {
    const elements = tempDiv.querySelectorAll(tag);
    elements.forEach(el => el.remove());
  });

  // Clean up attributes but keep essential ones
  const allowedAttributes: Record<string, string[]> = {
    'img': ['src', 'alt', 'class'],
    'a': ['href', 'class'],
    'h1': ['class'],
    'h2': ['class'],
    'h3': ['class'],
    'h4': ['class'],
    'p': ['class'],
    'iframe': ['src', 'class', 'allow', 'allowfullscreen'],
    'div': ['class', 'style'],
  };

  // Process all elements
  const allElements = tempDiv.querySelectorAll('*');
  allElements.forEach(el => {
    const tagName = el.tagName.toLowerCase();
    const allowedAttrs = allowedAttributes[tagName] || [];
    
    // Remove all attributes not in allowed list
    Array.from(el.attributes).forEach(attr => {
      if (!allowedAttrs.includes(attr.name)) {
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

    // Style headings
    if (['h1', 'h2', 'h3', 'h4'].includes(tagName)) {
      el.classList.add('font-serif', 'font-bold', 'mt-8', 'mb-4');
      if (tagName === 'h1') el.classList.add('text-3xl');
      if (tagName === 'h2') el.classList.add('text-2xl');
      if (tagName === 'h3') el.classList.add('text-xl');
      if (tagName === 'h4') el.classList.add('text-lg');
    }

    // Style paragraphs
    if (tagName === 'p') {
      el.classList.add('leading-relaxed', 'mb-6');
    }
  });

  return tempDiv.innerHTML;
}

/**
 * Extracts plain text and counts words
 */
function getWordCount(text: string): number {
  // Remove HTML tags
  const textOnly = text.replace(/<[^>]*>/g, ' ');
  // Count words (split by whitespace and filter empty)
  return textOnly.trim().split(/\s+/).filter(word => word.length > 0).length;
}

/**
 * Splits content into pages based on word count
 * Tries to break at paragraph boundaries for better readability
 */
function splitIntoPages(
  content: string,
  wordsPerPage: number = 1750
): string[] {
  // Split by HTML paragraphs and headings
  const htmlRegex = /(<(?:p|h[1-4]|div)[^>]*>.*?<\/(?:p|h[1-4]|div)>)/gis;
  const matches = content.match(htmlRegex) || [];
  
  // If no HTML structure, split by double newlines
  const paragraphs = matches.length > 0 
    ? matches
    : content.split(/\n\n+/).filter(p => p.trim().length > 0);
  
  const pages: string[] = [];
  let currentPage = '';
  let currentWordCount = 0;

  for (const paragraph of paragraphs) {
    const paragraphWordCount = getWordCount(paragraph);
    
    // If adding this paragraph would exceed the limit, start a new page
    if (currentWordCount + paragraphWordCount > wordsPerPage && currentPage.length > 0) {
      pages.push(currentPage.trim());
      currentPage = paragraph;
      currentWordCount = paragraphWordCount;
    } else {
      currentPage += (currentPage ? '\n\n' : '') + paragraph;
      currentWordCount += paragraphWordCount;
    }
  }

  // Add the last page
  if (currentPage.trim().length > 0) {
    pages.push(currentPage.trim());
  }

  // Ensure we have at least one page
  if (pages.length === 0) {
    pages.push(content);
  }

  return pages;
}

/**
 * Formats WordPress story content into pages
 */
export function formatWordPressStory(
  storyContent: string,
  wordsPerPage: number = 1750
): FormattedStory {
  // Clean the HTML content
  const cleanedContent = cleanWordPressHTML(storyContent);
  
  // Split into pages
  const pageContents = splitIntoPages(cleanedContent, wordsPerPage);
  
  // Create formatted pages
  const pages: FormattedPage[] = pageContents.map((content, index) => {
    const wordCount = getWordCount(content);
    const hasImages = content.includes('<img');
    const hasVideos = content.includes('youtube.com') || content.includes('youtu.be');
    
    return {
      content,
      wordCount,
      pageNumber: index + 1,
      hasImages,
      hasVideos,
    };
  });

  const totalWords = pages.reduce((sum, page) => sum + page.wordCount, 0);

  return {
    pages,
    totalPages: pages.length,
    totalWords,
  };
}

/**
 * Combines all chapters into a single continuous story
 */
export function combineChaptersIntoStory(chapters: Array<{ content: string; title: string }>): string {
  let combinedContent = '';
  
  for (const chapter of chapters) {
    // Add chapter title as heading
    combinedContent += `<h2>${chapter.title}</h2>\n\n`;
    // Add chapter content
    combinedContent += chapter.content + '\n\n';
  }
  
  return combinedContent;
}

/**
 * Extracts content from WordPress REST API response
 */
export function extractWordPressContent(wordPressData: any): string {
  // Handle different WordPress response formats
  if (typeof wordPressData === 'string') {
    return wordPressData;
  }
  
  if (wordPressData?.content?.rendered) {
    return wordPressData.content.rendered;
  }
  
  if (wordPressData?.content) {
    return wordPressData.content;
  }
  
  return '';
}

