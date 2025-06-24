const NEWS_API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;
const NEWS_API_BASE_URL = 'https://newsapi.org/v2';

// Check if API key is available
if (!NEWS_API_KEY) {
  console.error('News API key is not configured. Please add NEXT_PUBLIC_NEWS_API_KEY to your .env.local file');
}

export interface NewsArticle {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

export interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles: NewsArticle[];
}

// Fetch gaming news from News API
export async function fetchGamingNews(
  query: string = '"video game" OR "PC gaming" OR "console gaming" OR "gaming news" OR "esports news"',
  pageSize: number = 20,
  page: number = 1
): Promise<NewsArticle[]> {
  if (!NEWS_API_KEY) {
    console.error('News API key not configured');
    return [];
  }

  // Try gaming sources first
  const sourcesParams = new URLSearchParams({
    sources: 'ign,polygon,the-verge',
    q: query,
    language: 'en',
    sortBy: 'publishedAt',
    pageSize: pageSize.toString(),
    page: page.toString(),
    apiKey: NEWS_API_KEY,
  });

  try {
    const sourceResponse = await fetch(`${NEWS_API_BASE_URL}/everything?${sourcesParams}`);
    
    if (sourceResponse.ok) {
      const sourceData: NewsApiResponse = await sourceResponse.json();
      
      if (sourceData.status === 'ok' && sourceData.articles.length > 0) {
        const filtered = sourceData.articles.filter(article => {
          const text = `${article.title} ${article.description}`.toLowerCase();
          return (text.includes('game') || text.includes('gaming') || text.includes('esports')) &&
                 !text.includes('nba') && !text.includes('basketball') && 
                 !text.includes('football') && !text.includes('soccer') &&
                 !text.includes('blackpink') && !text.includes('kpop') &&
                 !text.includes('music') && !text.includes('song');
        });
        
        if (filtered.length > 0) return filtered;
      }
    }

    // Fallback to general search with strict filtering
    const params = new URLSearchParams({
      q: '"video game news" OR "gaming industry" OR "PC game" OR "console game" OR "game release"',
      language: 'en',
      sortBy: 'publishedAt',
      pageSize: pageSize.toString(),
      page: page.toString(),
      apiKey: NEWS_API_KEY,
    });

    const response = await fetch(`${NEWS_API_BASE_URL}/everything?${params}`);
    
    if (!response.ok) {
      throw new Error(`News API error: ${response.status} ${response.statusText}`);
    }

    const data: NewsApiResponse = await response.json();
    
    if (data.status !== 'ok') {
      throw new Error(`News API error: ${data.status}`);
    }

    // Strict filtering for gaming content only
    const filtered = data.articles.filter(article => {
      const text = `${article.title} ${article.description}`.toLowerCase();
      return (text.includes('video game') || text.includes('gaming') || text.includes('game')) &&
             !text.includes('nba') && !text.includes('sports') && !text.includes('music') &&
             !text.includes('blackpink') && !text.includes('kpop');
    });

    return filtered || [];
  } catch (error) {
    console.error('Error fetching gaming news:', error);
    return [];
  }
}

// Fetch top gaming headlines
export async function fetchTopGamingHeadlines(
  country: string = 'us',
  pageSize: number = 20
): Promise<NewsArticle[]> {
  const params = new URLSearchParams({
    country,
    category: 'technology',
    pageSize: pageSize.toString(),
    apiKey: NEWS_API_KEY,
  });

  try {
    const response = await fetch(`${NEWS_API_BASE_URL}/top-headlines?${params}`);
    
    if (!response.ok) {
      throw new Error(`News API error: ${response.status} ${response.statusText}`);
    }

    const data: NewsApiResponse = await response.json();
    
    if (data.status !== 'ok') {
      throw new Error(`News API error: ${data.status}`);
    }

    // Filter for gaming-related content
    const gamingKeywords = [
      'gaming', 'esports', 'video game', 'playstation', 'xbox', 'nintendo', 
      'steam', 'epic games', 'twitch', 'game', 'console', 'pc gaming',
      'mobile gaming', 'indie game', 'AAA', 'fps', 'rpg', 'mmorpg'
    ];

    const filteredArticles = data.articles.filter(article => {
      const text = `${article.title} ${article.description}`.toLowerCase();
      return gamingKeywords.some(keyword => text.includes(keyword));
    });

    return filteredArticles;
  } catch (error) {
    console.error('Error fetching top gaming headlines:', error);
    return [];
  }
}

// Fetch news from specific gaming sources
export async function fetchNewsFromGamingSources(
  sources: string = 'ign,polygon,the-verge',
  pageSize: number = 20
): Promise<NewsArticle[]> {
  const params = new URLSearchParams({
    sources,
    q: '"video game" OR "gaming" OR "esports" OR "game review" OR "game news" OR "PC gaming" OR "console gaming"',
    language: 'en',
    sortBy: 'publishedAt',
    pageSize: pageSize.toString(),
    apiKey: NEWS_API_KEY,
  });

  try {
    const response = await fetch(`${NEWS_API_BASE_URL}/everything?${params}`);
    
    if (!response.ok) {
      throw new Error(`News API error: ${response.status} ${response.statusText}`);
    }

    const data: NewsApiResponse = await response.json();
    
    if (data.status !== 'ok') {
      throw new Error(`News API error: ${data.status}`);
    }

    // Filter out non-gaming content
    const filtered = data.articles.filter(article => {
      const text = `${article.title} ${article.description}`.toLowerCase();
      return (text.includes('game') || text.includes('gaming') || text.includes('esports')) &&
             !text.includes('nba') && !text.includes('basketball') && 
             !text.includes('football') && !text.includes('soccer') &&
             !text.includes('blackpink') && !text.includes('kpop') &&
             !text.includes('music') && !text.includes('song') &&
             !text.includes('netflix') && !text.includes('movie');
    });

    return filtered || [];
  } catch (error) {
    console.error('Error fetching news from gaming sources:', error);
    return [];
  }
}

// Format date for display
export function formatNewsDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 1) {
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    return `${diffInMinutes}m ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  } else {
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  }
}

// Extract domain from URL for source display
export function getSourceDomain(url: string): string {
  try {
    const domain = new URL(url).hostname;
    return domain.replace('www.', '');
  } catch {
    return 'Unknown Source';
  }
}

// Category-specific news fetching functions
export async function fetchEsportsNews(pageSize: number = 5): Promise<NewsArticle[]> {
  // First try gaming-specific sources
  const sourcesParams = new URLSearchParams({
    sources: 'ign,polygon,the-verge',
    q: 'esports OR "competitive gaming" OR "gaming tournament" OR "game championship" OR "gaming competition" OR "pro gaming"',
    language: 'en',
    sortBy: 'publishedAt',
    pageSize: pageSize.toString(),
    apiKey: NEWS_API_KEY,
  });

  try {
    const sourceResponse = await fetch(`${NEWS_API_BASE_URL}/everything?${sourcesParams}`);
    const sourceData: NewsApiResponse = await sourceResponse.json();
    
    if (sourceData.status === 'ok' && sourceData.articles.length > 0) {
      // Filter for esports content
      const filtered = sourceData.articles.filter(article => {
        const text = `${article.title} ${article.description}`.toLowerCase();
        return text.includes('esports') || text.includes('competitive gaming') || 
               text.includes('gaming tournament') || text.includes('pro gaming') ||
               text.includes('game championship') || text.includes('gaming competition');
      });
      
      if (filtered.length > 0) return filtered;
    }

    // Fallback: more specific gaming query
    const fallbackParams = new URLSearchParams({
      q: '"video game esports" OR "gaming championship" OR "competitive video gaming" OR "esports tournament"',
      language: 'en',
      sortBy: 'publishedAt',
      pageSize: pageSize.toString(),
      apiKey: NEWS_API_KEY,
    });

    const fallbackResponse = await fetch(`${NEWS_API_BASE_URL}/everything?${fallbackParams}`);
    const fallbackData: NewsApiResponse = await fallbackResponse.json();
    
    if (fallbackData.status === 'ok') {
      return fallbackData.articles.filter(article => {
        const text = `${article.title} ${article.description}`.toLowerCase();
        return (text.includes('game') || text.includes('gaming')) && 
               (text.includes('esports') || text.includes('competitive'));
      });
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching esports news:', error);
    return [];
  }
}

export async function fetchHardwareNews(pageSize: number = 5): Promise<NewsArticle[]> {
  // Focus on gaming sources first
  const sourcesParams = new URLSearchParams({
    sources: 'ign,polygon,the-verge,techcrunch',
    q: '"gaming GPU" OR "gaming graphics card" OR "gaming CPU" OR "gaming hardware" OR "PC gaming" OR "gaming rig" OR "RTX gaming"',
    language: 'en',
    sortBy: 'publishedAt',
    pageSize: pageSize.toString(),
    apiKey: NEWS_API_KEY,
  });

  try {
    const sourceResponse = await fetch(`${NEWS_API_BASE_URL}/everything?${sourcesParams}`);
    const sourceData: NewsApiResponse = await sourceResponse.json();
    
    if (sourceData.status === 'ok' && sourceData.articles.length > 0) {
      // Filter for gaming hardware content
      const filtered = sourceData.articles.filter(article => {
        const text = `${article.title} ${article.description}`.toLowerCase();
        return (text.includes('gaming') || text.includes('game')) && 
               (text.includes('gpu') || text.includes('graphics') || text.includes('cpu') || 
                text.includes('hardware') || text.includes('rtx') || text.includes('radeon'));
      });
      
      if (filtered.length > 0) return filtered;
    }

    // Fallback with more specific gaming hardware terms
    const fallbackParams = new URLSearchParams({
      q: '"gaming graphics card" OR "PC gaming hardware" OR "gaming CPU" OR "gaming GPU benchmark" OR "gaming rig"',
      language: 'en',
      sortBy: 'publishedAt',
      pageSize: pageSize.toString(),
      apiKey: NEWS_API_KEY,
    });

    const fallbackResponse = await fetch(`${NEWS_API_BASE_URL}/everything?${fallbackParams}`);
    const fallbackData: NewsApiResponse = await fallbackResponse.json();
    
    if (fallbackData.status === 'ok') {
      return fallbackData.articles.filter(article => {
        const text = `${article.title} ${article.description}`.toLowerCase();
        return text.includes('gaming') && 
               (text.includes('gpu') || text.includes('cpu') || text.includes('hardware'));
      });
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching hardware news:', error);
    return [];
  }
}

export async function fetchIndieGameNews(pageSize: number = 5): Promise<NewsArticle[]> {
  // Focus on gaming sources
  const sourcesParams = new URLSearchParams({
    sources: 'ign,polygon,the-verge',
    q: '"indie game" OR "independent game" OR "indie developer" OR "game development" OR "steam game"',
    language: 'en',
    sortBy: 'publishedAt',
    pageSize: pageSize.toString(),
    apiKey: NEWS_API_KEY,
  });

  try {
    const sourceResponse = await fetch(`${NEWS_API_BASE_URL}/everything?${sourcesParams}`);
    const sourceData: NewsApiResponse = await sourceResponse.json();
    
    if (sourceData.status === 'ok' && sourceData.articles.length > 0) {
      // Filter for indie game content
      const filtered = sourceData.articles.filter(article => {
        const text = `${article.title} ${article.description}`.toLowerCase();
        return (text.includes('indie') || text.includes('independent')) && 
               (text.includes('game') || text.includes('developer') || text.includes('gaming'));
      });
      
      if (filtered.length > 0) return filtered;
    }

    // Fallback for indie game content
    const fallbackParams = new URLSearchParams({
      q: '"indie video game" OR "independent video game" OR "indie game developer" OR "steam indie game"',
      language: 'en',
      sortBy: 'publishedAt',
      pageSize: pageSize.toString(),
      apiKey: NEWS_API_KEY,
    });

    const fallbackResponse = await fetch(`${NEWS_API_BASE_URL}/everything?${fallbackParams}`);
    const fallbackData: NewsApiResponse = await fallbackResponse.json();
    
    if (fallbackData.status === 'ok') {
      return fallbackData.articles.filter(article => {
        const text = `${article.title} ${article.description}`.toLowerCase();
        return text.includes('game') && (text.includes('indie') || text.includes('independent'));
      });
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching indie game news:', error);
    return [];
  }
}

export async function fetchMobileGamingNews(pageSize: number = 5): Promise<NewsArticle[]> {
  // Focus on gaming sources
  const sourcesParams = new URLSearchParams({
    sources: 'ign,polygon,the-verge,techcrunch',
    q: '"mobile gaming" OR "mobile video game" OR "smartphone game" OR "iOS game" OR "Android game" OR "mobile game app"',
    language: 'en',
    sortBy: 'publishedAt',
    pageSize: pageSize.toString(),
    apiKey: NEWS_API_KEY,
  });

  try {
    const sourceResponse = await fetch(`${NEWS_API_BASE_URL}/everything?${sourcesParams}`);
    const sourceData: NewsApiResponse = await sourceResponse.json();
    
    if (sourceData.status === 'ok' && sourceData.articles.length > 0) {
      // Filter for mobile gaming content
      const filtered = sourceData.articles.filter(article => {
        const text = `${article.title} ${article.description}`.toLowerCase();
        return (text.includes('mobile') || text.includes('smartphone') || text.includes('ios') || text.includes('android')) && 
               (text.includes('game') || text.includes('gaming'));
      });
      
      if (filtered.length > 0) return filtered;
    }

    // Fallback for mobile gaming content
    const fallbackParams = new URLSearchParams({
      q: '"mobile video game" OR "smartphone gaming" OR "iOS video game" OR "Android video game"',
      language: 'en',
      sortBy: 'publishedAt',
      pageSize: pageSize.toString(),
      apiKey: NEWS_API_KEY,
    });

    const fallbackResponse = await fetch(`${NEWS_API_BASE_URL}/everything?${fallbackParams}`);
    const fallbackData: NewsApiResponse = await fallbackResponse.json();
    
    if (fallbackData.status === 'ok') {
      return fallbackData.articles.filter(article => {
        const text = `${article.title} ${article.description}`.toLowerCase();
        return (text.includes('mobile') || text.includes('smartphone')) && text.includes('game');
      });
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching mobile gaming news:', error);
    return [];
  }
}

export async function fetchBreakingGameNews(pageSize: number = 1): Promise<NewsArticle[]> {
  // Priority: Gaming-specific sources
  const sourcesParams = new URLSearchParams({
    sources: 'ign,polygon,the-verge',
    q: '"video game" OR "new game" OR "game release" OR "game announcement" OR "gaming studio" OR "game developer"',
    language: 'en',
    sortBy: 'publishedAt',
    pageSize: pageSize.toString(),
    apiKey: NEWS_API_KEY,
  });

  try {
    const sourceResponse = await fetch(`${NEWS_API_BASE_URL}/everything?${sourcesParams}`);
    const sourceData: NewsApiResponse = await sourceResponse.json();
    
    if (sourceData.status === 'ok' && sourceData.articles.length > 0) {
      // Filter for gaming content only
      const filtered = sourceData.articles.filter(article => {
        const text = `${article.title} ${article.description}`.toLowerCase();
        return (text.includes('game') || text.includes('gaming')) && 
               !text.includes('nba') && !text.includes('basketball') && 
               !text.includes('football') && !text.includes('soccer') &&
               !text.includes('blackpink') && !text.includes('kpop') &&
               !text.includes('music') && !text.includes('song');
      });
      
      if (filtered.length > 0) return filtered;
    }

    // Fallback with very specific gaming terms
    const fallbackParams = new URLSearchParams({
      q: '"video game announcement" OR "new video game" OR "game studio news" OR "gaming industry" OR "PC game" OR "console game"',
      language: 'en',
      sortBy: 'publishedAt',
      pageSize: pageSize.toString(),
      apiKey: NEWS_API_KEY,
    });

    const fallbackResponse = await fetch(`${NEWS_API_BASE_URL}/everything?${fallbackParams}`);
    const fallbackData: NewsApiResponse = await fallbackResponse.json();
    
    if (fallbackData.status === 'ok') {
      return fallbackData.articles.filter(article => {
        const text = `${article.title} ${article.description}`.toLowerCase();
        return (text.includes('video game') || text.includes('gaming') || text.includes('game studio')) &&
               !text.includes('nba') && !text.includes('sports') && !text.includes('music');
      });
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching breaking game news:', error);
    return [];
  }
} 