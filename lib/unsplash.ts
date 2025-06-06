const UNSPLASH_API_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;
const UNSPLASH_BASE_URL = 'https://api.unsplash.com';

export interface UnsplashImage {
  id: string;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  alt_description: string;
  width: number;
  height: number;
}

export async function searchUnsplashImages(
  query: string, 
  count: number = 1,
  orientation?: 'landscape' | 'portrait' | 'squarish'
): Promise<UnsplashImage[]> {
  const params = new URLSearchParams({
    query,
    per_page: count.toString(),
    client_id: UNSPLASH_API_KEY,
  });

  if (orientation) {
    params.append('orientation', orientation);
  }

  try {
    const response = await fetch(`${UNSPLASH_BASE_URL}/search/photos?${params}`);
    
    if (!response.ok) {
      throw new Error(`Unsplash API error: ${response.status}`);
    }

    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Error fetching images from Unsplash:', error);
    return [];
  }
}

export async function getGamingImages() {
  const queries = [
    'gaming setup rgb',
    'esports tournament',
    'gaming hardware tech',
    'cyberpunk gaming'
  ];

  const allImages: UnsplashImage[] = [];

  for (const query of queries) {
    const images = await searchUnsplashImages(query, 3, 'landscape');
    allImages.push(...images);
  }

  return allImages;
}

export function getOptimizedImageUrl(image: UnsplashImage, width: number, height?: number): string {
  const params = new URLSearchParams({
    w: width.toString(),
    fit: 'crop',
    crop: 'center',
  });

  if (height) {
    params.append('h', height.toString());
  }

  return `${image.urls.raw}&${params}`;
} 