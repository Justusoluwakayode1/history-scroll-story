/**
 * WordPress Integration Utilities
 * 
 * Helper functions to handle WordPress REST API data formats,
 * media URLs, and YouTube links that will come from WordPress admin.
 */

/**
 * Normalizes WordPress image URLs.
 * Handles both absolute URLs from WordPress REST API and relative paths.
 * 
 * @param imageUrl - Image URL from WordPress (can be absolute or relative)
 * @param fallback - Fallback URL if image is invalid (default: '/placeholder.svg')
 * @returns Normalized image URL
 */
export function normalizeWordPressImageUrl(
  imageUrl: string | undefined | null,
  fallback: string = '/placeholder.svg'
): string {
  if (!imageUrl || imageUrl.trim() === '') {
    return fallback;
  }

  const trimmed = imageUrl.trim();
  
  // Already a full URL (http/https)
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }
  
  // Relative path starting with /
  if (trimmed.startsWith('/')) {
    return trimmed;
  }
  
  // Relative path without leading slash
  return `/${trimmed}`;
}

/**
 * Extracts YouTube video ID from various URL formats.
 * WordPress can store YouTube links in multiple formats.
 * 
 * Supported formats:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 * - Just the video ID: VIDEO_ID
 * 
 * @param link - YouTube link or video ID from WordPress
 * @returns YouTube video ID or empty string if invalid
 */
export function extractYouTubeVideoId(link: string | undefined | null): string {
  if (!link || link.trim() === '') {
    return '';
  }

  const trimmed = link.trim();

  // Full URL: https://www.youtube.com/watch?v=VIDEO_ID
  if (trimmed.includes('youtube.com/watch?v=')) {
    const match = trimmed.match(/[?&]v=([^&]+)/);
    return match ? match[1] : '';
  }

  // Short URL: https://youtu.be/VIDEO_ID
  if (trimmed.includes('youtu.be/')) {
    const match = trimmed.match(/youtu\.be\/([^?]+)/);
    return match ? match[1] : '';
  }

  // Embed URL: https://www.youtube.com/embed/VIDEO_ID
  if (trimmed.includes('youtube.com/embed/')) {
    const match = trimmed.match(/embed\/([^?]+)/);
    return match ? match[1] : '';
  }

  // Assume it's just the video ID (common in WordPress custom fields)
  return trimmed;
}

/**
 * Converts YouTube link or ID to embed URL.
 * 
 * @param link - YouTube link or video ID
 * @returns YouTube embed URL
 */
export function getYouTubeEmbedUrl(link: string | undefined | null): string {
  const videoId = extractYouTubeVideoId(link);
  if (!videoId) {
    return '';
  }
  return `https://www.youtube.com/embed/${videoId}`;
}

/**
 * Handles WordPress media object from REST API.
 * WordPress REST API can return media in different formats:
 * - Direct URL string
 * - Media object with source_url
 * - Media object with sizes
 * 
 * @param media - Media data from WordPress
 * @returns Image URL string
 */
export function getWordPressMediaUrl(media: any): string {
  if (!media) {
    return '/placeholder.svg';
  }

  // Direct URL string
  if (typeof media === 'string') {
    return normalizeWordPressImageUrl(media);
  }

  // Media object with source_url
  if (media.source_url) {
    return normalizeWordPressImageUrl(media.source_url);
  }

  // Media object with sizes (prefer large or full)
  if (media.sizes) {
    if (media.sizes.full?.source_url) {
      return normalizeWordPressImageUrl(media.sizes.full.source_url);
    }
    if (media.sizes.large?.source_url) {
      return normalizeWordPressImageUrl(media.sizes.large.source_url);
    }
    if (media.sizes.medium?.source_url) {
      return normalizeWordPressImageUrl(media.sizes.medium.source_url);
    }
  }

  // Media object with guid (legacy WordPress)
  if (media.guid?.rendered) {
    return normalizeWordPressImageUrl(media.guid.rendered);
  }

  return '/placeholder.svg';
}


