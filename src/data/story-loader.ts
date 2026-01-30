/**
 * Story Loader
 * 
 * Loads stories from hardcoded data or WordPress
 * Converts them to unified format for consistent reading experience
 */

import { stories as legacyStories, Story as LegacyStory } from "./stories";
import { UnifiedStory } from "./types";
import { convertLegacyStory } from "@/utils/story-formatter";

/**
 * Loads a story by slug
 * First checks hardcoded stories, then WordPress (future)
 */
export function loadStoryBySlug(slug: string): UnifiedStory | null {
  // Check hardcoded stories first
  const legacyStory = legacyStories.find(s => s.slug === slug);
  
  if (legacyStory) {
    return convertLegacyStory(legacyStory);
  }

  // TODO: Check WordPress API here
  // const wordPressStory = await fetchWordPressStory(slug);
  // if (wordPressStory) {
  //   return convertWordPressStory(wordPressStory);
  // }

  return null;
}

/**
 * Gets all available stories
 */
export function getAllStories(): UnifiedStory[] {
  return legacyStories.map(convertLegacyStory);
}

/**
 * Gets stories by filter (for library/search)
 */
export function getStoriesByFilter(filters: {
  era?: string;
  region?: string;
  topic?: string;
}): UnifiedStory[] {
  let filtered = legacyStories;

  if (filters.era && filters.era !== 'all') {
    filtered = filtered.filter(s => s.era.toLowerCase() === filters.era?.toLowerCase());
  }

  if (filters.region && filters.region !== 'all') {
    filtered = filtered.filter(s => s.region.toLowerCase() === filters.region?.toLowerCase());
  }

  if (filters.topic && filters.topic !== 'all') {
    filtered = filtered.filter(s => s.topic.toLowerCase() === filters.topic?.toLowerCase());
  }

  return filtered.map(convertLegacyStory);
}



