/**
 * Offline Storage Utilities
 * 
 * Provides caching functionality for stories, images, and content
 * to enable offline reading support.
 */

import { UnifiedStory } from "@/data/types";

const CACHE_NAME = 'history-hub-stories-v1';
const STORY_CACHE_PREFIX = '/api/stories/';

/**
 * Cache a story for offline reading
 */
export async function cacheStoryForOffline(story: UnifiedStory): Promise<void> {
  if (!('caches' in window)) {
    console.warn('Cache API not supported');
    return;
  }

  try {
    const cache = await caches.open(CACHE_NAME);

    // Cache story data as JSON
    const storyUrl = `${STORY_CACHE_PREFIX}${story.id}`;
    await cache.put(
      storyUrl,
      new Response(JSON.stringify(story), {
        headers: {
          'Content-Type': 'application/json',
        },
      })
    );

    // Collect all images to cache
    const imagesToCache: string[] = [];

    // Cover and hero images
    if (story.coverImage && !story.coverImage.startsWith('data:')) {
      imagesToCache.push(story.coverImage);
    }
    if (story.heroImage && !story.heroImage.startsWith('data:')) {
      imagesToCache.push(story.heroImage);
    }

    // Chapter images (if content type is chapters)
    if (story.content.type === 'chapters') {
      for (const chapter of story.content.chapters) {
        if (chapter.images) {
          for (const imageUrl of chapter.images) {
            if (imageUrl && !imageUrl.startsWith('data:')) {
              imagesToCache.push(imageUrl);
            }
          }
        }
      }
    }

    // Cache images (with error handling)
    for (const imageUrl of imagesToCache) {
      try {
        // Only cache if it's a valid URL
        if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
          await cache.add(imageUrl);
        } else if (imageUrl.startsWith('/')) {
          // Relative URL - cache from same origin
          await cache.add(new Request(imageUrl, { mode: 'same-origin' }));
        }
      } catch (error) {
        // Silently fail for individual images
        console.debug(`Failed to cache image: ${imageUrl}`, error);
      }
    }

    console.log(`Cached story: ${story.title}`);
  } catch (error) {
    console.error('Error caching story:', error);
  }
}

/**
 * Get cached story from offline storage
 */
export async function getCachedStory(storyId: string): Promise<UnifiedStory | null> {
  if (!('caches' in window)) {
    return null;
  }

  try {
    const cache = await caches.open(CACHE_NAME);
    const storyUrl = `${STORY_CACHE_PREFIX}${storyId}`;
    const response = await cache.match(storyUrl);

    if (response) {
      const story = await response.json();
      return story as UnifiedStory;
    }
  } catch (error) {
    console.error('Error retrieving cached story:', error);
  }

  return null;
}

/**
 * Check if a story is cached
 */
export async function isStoryCached(storyId: string): Promise<boolean> {
  if (!('caches' in window)) {
    return false;
  }

  try {
    const cache = await caches.open(CACHE_NAME);
    const storyUrl = `${STORY_CACHE_PREFIX}${storyId}`;
    const response = await cache.match(storyUrl);
    return !!response;
  } catch (error) {
    return false;
  }
}

/**
 * Get all cached story IDs
 */
export async function getCachedStoryIds(): Promise<string[]> {
  if (!('caches' in window)) {
    return [];
  }

  try {
    const cache = await caches.open(CACHE_NAME);
    const keys = await cache.keys();
    
    return keys
      .filter(key => key.url.includes(STORY_CACHE_PREFIX))
      .map(key => {
        const url = key.url;
        const id = url.substring(url.lastIndexOf('/') + 1);
        return id;
      });
  } catch (error) {
    console.error('Error getting cached story IDs:', error);
    return [];
  }
}

/**
 * Clear all cached stories
 */
export async function clearStoryCache(): Promise<void> {
  if (!('caches' in window)) {
    return;
  }

  try {
    await caches.delete(CACHE_NAME);
    console.log('Story cache cleared');
  } catch (error) {
    console.error('Error clearing cache:', error);
  }
}

/**
 * Get cache size estimate (approximate)
 */
export async function getCacheSize(): Promise<number> {
  if (!('caches' in window) || !('storage' in navigator && 'estimate' in navigator.storage)) {
    return 0;
  }

  try {
    const estimate = await navigator.storage.estimate();
    return estimate.usage || 0;
  } catch (error) {
    console.error('Error getting cache size:', error);
    return 0;
  }
}

/**
 * Pre-cache multiple stories
 */
export async function preCacheStories(stories: UnifiedStory[]): Promise<void> {
  for (const story of stories) {
    await cacheStoryForOffline(story);
  }
}

