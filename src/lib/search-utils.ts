/**
 * Smart Search Utilities
 * 
 * Provides intelligent search across stories with relevance scoring.
 * Searches across titles, content, chapters, tags, categories, and more.
 */

import { Story, Chapter } from "@/data/stories";

export interface SearchResult {
  story: Story;
  matchedChapter?: Chapter;
  matchedText?: string;
  score: number;
  matchType: 'title' | 'content' | 'chapter' | 'tag' | 'category' | 'description';
}

/**
 * Calculates relevance score for a search result
 */
function calculateRelevanceScore(
  result: Omit<SearchResult, 'score'>,
  query: string
): number {
  const lowerQuery = query.toLowerCase();
  let score = 0;

  // Title match (highest weight)
  if (result.story.title.toLowerCase().includes(lowerQuery)) {
    score += 100;
    // Exact title match gets bonus
    if (result.story.title.toLowerCase() === lowerQuery) {
      score += 50;
    }
  }

  // Description match
  if (result.story.description.toLowerCase().includes(lowerQuery)) {
    score += 30;
  }

  // Tag match
  const tagMatches = result.story.tags.filter(tag =>
    tag.toLowerCase().includes(lowerQuery)
  ).length;
  score += tagMatches * 25;

  // Category/Era/Region/Topic match
  if (result.story.era.toLowerCase().includes(lowerQuery)) score += 20;
  if (result.story.region.toLowerCase().includes(lowerQuery)) score += 20;
  if (result.story.topic.toLowerCase().includes(lowerQuery)) score += 20;
  if (result.story.subCategory.toLowerCase().includes(lowerQuery)) score += 20;

  // Chapter title match
  if (result.matchedChapter) {
    score += 40;
    if (result.matchedChapter.title.toLowerCase() === lowerQuery) {
      score += 20;
    }
  }

  // Content match (lower weight, but still important)
  if (result.matchedText) {
    const contentMatches = (result.matchedText.match(
      new RegExp(lowerQuery, 'gi')
    ) || []).length;
    score += contentMatches * 5;
  }

  // Word boundary matches get bonus
  const wordBoundaryRegex = new RegExp(`\\b${lowerQuery}\\b`, 'gi');
  if (wordBoundaryRegex.test(result.story.title)) score += 30;
  if (result.story.description.match(wordBoundaryRegex)) score += 15;

  // Author match
  if (result.story.author.toLowerCase().includes(lowerQuery)) {
    score += 15;
  }

  return score;
}

/**
 * Searches across all stories with intelligent matching
 */
export function searchStories(query: string, stories: Story[]): SearchResult[] {
  if (!query || query.trim() === '') {
    return [];
  }

  const lowerQuery = query.toLowerCase().trim();
  const queryWords = lowerQuery.split(/\s+/).filter(w => w.length > 0);
  const results: Omit<SearchResult, 'score'>[] = [];

  for (const story of stories) {
    // Check title
    if (story.title.toLowerCase().includes(lowerQuery)) {
      results.push({
        story,
        matchType: 'title',
      });
      continue;
    }

    // Check description
    if (story.description.toLowerCase().includes(lowerQuery)) {
      results.push({
        story,
        matchType: 'description',
      });
      continue;
    }

    // Check tags
    const matchingTags = story.tags.filter(tag =>
      tag.toLowerCase().includes(lowerQuery)
    );
    if (matchingTags.length > 0) {
      results.push({
        story,
        matchType: 'tag',
      });
      continue;
    }

    // Check categories
    const categoryMatch =
      story.era.toLowerCase().includes(lowerQuery) ||
      story.region.toLowerCase().includes(lowerQuery) ||
      story.topic.toLowerCase().includes(lowerQuery) ||
      story.subCategory.toLowerCase().includes(lowerQuery);
    
    if (categoryMatch) {
      results.push({
        story,
        matchType: 'category',
      });
      continue;
    }

    // Check chapters
    for (const chapter of story.chapters) {
      // Chapter title match
      if (chapter.title.toLowerCase().includes(lowerQuery)) {
        results.push({
          story,
          matchedChapter: chapter,
          matchedText: chapter.title,
          matchType: 'chapter',
        });
        break;
      }

      // Chapter content match
      if (chapter.content.toLowerCase().includes(lowerQuery)) {
        // Extract matching snippet
        const contentLower = chapter.content.toLowerCase();
        const index = contentLower.indexOf(lowerQuery);
        const start = Math.max(0, index - 50);
        const end = Math.min(
          chapter.content.length,
          index + lowerQuery.length + 50
        );
        const snippet = chapter.content.substring(start, end);

        results.push({
          story,
          matchedChapter: chapter,
          matchedText: snippet,
          matchType: 'content',
        });
        break;
      }
    }
  }

  // Calculate scores and sort
  const scoredResults: SearchResult[] = results.map(result => ({
    ...result,
    score: calculateRelevanceScore(result, query),
  }));

  // Remove duplicates (same story can match multiple criteria)
  const uniqueResults = new Map<string, SearchResult>();
  for (const result of scoredResults) {
    const existing = uniqueResults.get(result.story.id);
    if (!existing || result.score > existing.score) {
      uniqueResults.set(result.story.id, result);
    }
  }

  return Array.from(uniqueResults.values())
    .sort((a, b) => b.score - a.score);
}

/**
 * Search with multi-word support
 * Returns results that match any of the words
 */
export function searchStoriesMultiWord(
  query: string,
  stories: Story[]
): SearchResult[] {
  const words = query
    .toLowerCase()
    .trim()
    .split(/\s+/)
    .filter(w => w.length > 0);

  if (words.length === 0) {
    return [];
  }

  // Search for each word and combine results
  const allResults = new Map<string, SearchResult>();

  for (const word of words) {
    const wordResults = searchStories(word, stories);
    for (const result of wordResults) {
      const existing = allResults.get(result.story.id);
      if (!existing || result.score > existing.score) {
        allResults.set(result.story.id, result);
      } else if (existing) {
        // Combine scores for multi-word matches
        existing.score += result.score * 0.5;
      }
    }
  }

  return Array.from(allResults.values())
    .sort((a, b) => b.score - a.score);
}



