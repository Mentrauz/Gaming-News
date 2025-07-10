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

// Fetch gaming news from News API with enhanced category filtering
export async function fetchGamingNews(
  query: string = '"video game" OR "PC gaming" OR "console gaming" OR "gaming news" OR "esports news"',
  pageSize: number = 20,
  page: number = 1
): Promise<NewsArticle[]> {
  if (!NEWS_API_KEY) {
    console.error('News API key not configured');
    return [];
  }

  // Determine if this is a category-specific query
  const isCategoryQuery = query.includes('"') && query.length > 50;
  
  // Use different source strategies based on query type
  const sources = isCategoryQuery ? 
    'ign,polygon,gamespot,kotaku,the-verge,techcrunch,pcgamer' : 
    'ign,polygon,the-verge';

  try {
    // Primary search with gaming sources
    const sourcesParams = new URLSearchParams({
      sources: sources,
      q: query,
      language: 'en',
      sortBy: 'publishedAt',
      pageSize: Math.min(pageSize * 2, 40).toString(), // Get more results to filter from
      page: page.toString(),
      apiKey: NEWS_API_KEY,
    });

    const sourceResponse = await fetch(`${NEWS_API_BASE_URL}/everything?${sourcesParams}`);
    
    if (sourceResponse.ok) {
      const sourceData: NewsApiResponse = await sourceResponse.json();
      
      if (sourceData.status === 'ok' && sourceData.articles.length > 0) {
        let filtered = sourceData.articles;
        
        if (isCategoryQuery) {
          // Enhanced filtering for category-specific queries
          filtered = sourceData.articles.filter(article => {
            const text = `${article.title} ${article.description}`.toLowerCase();
            
            // Extract key terms from the query for better matching
            const queryTerms = query.toLowerCase()
              .replace(/['"]/g, '')
              .split(' or ')
              .map(term => term.trim())
              .filter(term => term.length > 2);
            
            // Check if article contains any of the query terms
            const hasRelevantContent = queryTerms.some(term => 
              text.includes(term) || 
              article.title.toLowerCase().includes(term)
            );
            
            // Exclude obviously non-gaming content
            const excludeTerms = [
              'nba', 'basketball', 'football', 'soccer', 'baseball', 'tennis',
              'blackpink', 'kpop', 'music', 'song', 'album', 'concert',
              'movie', 'film', 'netflix', 'streaming', 'tv show',
              'politics', 'election', 'government', 'covid', 'vaccine'
            ];
            
            const hasExcludedContent = excludeTerms.some(term => text.includes(term));
            
            return hasRelevantContent && !hasExcludedContent && article.title && article.description;
          });
        } else {
          // General gaming content filter
          filtered = sourceData.articles.filter(article => {
            const text = `${article.title} ${article.description}`.toLowerCase();
            return (text.includes('game') || text.includes('gaming') || text.includes('esports')) &&
                   !text.includes('nba') && !text.includes('basketball') && 
                   !text.includes('football') && !text.includes('soccer') &&
                   !text.includes('blackpink') && !text.includes('kpop') &&
                   !text.includes('music') && !text.includes('song');
          });
        }
        
        // Return up to the requested number of articles
        const result = filtered.slice(0, pageSize);
        
        if (result.length >= Math.min(pageSize, 3)) {
          return result;
        }
        
        // If we don't have enough results, fall back to broader search
        if (isCategoryQuery && result.length < 3) {
          console.log(`Category query returned ${result.length} results, trying broader search...`);
          // Extract first term from query for fallback
          const firstTerm = query.split(' OR ')[0].replace(/['"]/g, '');
          return await fetchGamingNews(`"${firstTerm}" AND (game OR gaming)`, pageSize, page);
        }
        
        return result;
      }
    }

    // Fallback to general search if sources fail
    const params = new URLSearchParams({
      q: isCategoryQuery ? 
        `(${query}) AND (game OR gaming OR esports)` : 
        '"video game news" OR "gaming industry" OR "PC game" OR "console game" OR "game release"',
      language: 'en',
      sortBy: 'publishedAt',
      pageSize: Math.min(pageSize * 2, 40).toString(),
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

    // Enhanced filtering for fallback results
    const filtered = data.articles.filter(article => {
      const text = `${article.title} ${article.description}`.toLowerCase();
      
      if (isCategoryQuery) {
        // For category queries, be more lenient but still relevant
        const queryTerms = query.toLowerCase()
          .replace(/['"]/g, '')
          .split(' or ')
          .map(term => term.trim())
          .filter(term => term.length > 2);
        
        const hasRelevantContent = queryTerms.some(term => 
          text.includes(term) || 
          article.title.toLowerCase().includes(term)
        ) || text.includes('game') || text.includes('gaming');
        
        return hasRelevantContent && 
               !text.includes('nba') && !text.includes('sports') && 
               !text.includes('music') && !text.includes('blackpink');
      } else {
        return (text.includes('video game') || text.includes('gaming') || text.includes('game')) &&
               !text.includes('nba') && !text.includes('sports') && !text.includes('music') &&
               !text.includes('blackpink') && !text.includes('kpop');
      }
    });

    return filtered.slice(0, pageSize) || [];
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

// Fetch featured game news for weekly spotlight
export async function fetchFeaturedGameNews(pageSize: number = 3): Promise<NewsArticle[]> {
  if (!NEWS_API_KEY) {
    console.error('News API key not configured');
    return [];
  }

  const featuredGameQueries = [
    '"game review" OR "game of the year" OR "must play" OR "best game"',
    '"new game release" OR "upcoming game" OR "game launch" OR "highly anticipated"',
    '"award winning game" OR "critically acclaimed" OR "metacritic" OR "game awards"'
  ];

  try {
    const allResults: NewsArticle[] = [];

    for (const query of featuredGameQueries) {
      const params = new URLSearchParams({
        sources: 'ign,polygon,gamespot,kotaku,the-verge,techcrunch',
        q: query,
        language: 'en',
        sortBy: 'publishedAt',
        pageSize: '10',
        apiKey: NEWS_API_KEY!,
      });

      const response = await fetch(`${NEWS_API_BASE_URL}/everything?${params}`);
      
      if (response.ok) {
        const data: NewsApiResponse = await response.json();
        
        if (data.status === 'ok') {
          const filtered = data.articles.filter(article => {
            const text = `${article.title} ${article.description}`.toLowerCase();
            return (text.includes('game') || text.includes('gaming')) &&
                   !text.includes('nba') && !text.includes('basketball') && 
                   !text.includes('football') && !text.includes('soccer') &&
                   !text.includes('music') && !text.includes('blackpink') &&
                   article.title && article.description && article.urlToImage;
          });
          
          allResults.push(...filtered);
        }
      }
    }

    // Remove duplicates and sort by date
    const uniqueArticles = allResults.filter((article, index, self) => 
      index === self.findIndex(a => a.url === article.url)
    );

    return uniqueArticles
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, pageSize);

  } catch (error) {
    console.error('Error fetching featured game news:', error);
    return [];
  }
}

// Fetch developer and industry news for spotlight
export async function fetchDeveloperSpotlightNews(pageSize: number = 3): Promise<NewsArticle[]> {
  if (!NEWS_API_KEY) {
    console.error('News API key not configured');
    return [];
  }

  const developerQueries = [
    '"game developer" OR "developer interview" OR "game studio" OR "indie developer"',
    '"gaming industry" OR "game development" OR "behind the scenes" OR "dev diary"',
    '"game creator" OR "industry veteran" OR "gaming executive" OR "studio head"'
  ];

  try {
    const allResults: NewsArticle[] = [];

    for (const query of developerQueries) {
      const params = new URLSearchParams({
        sources: 'ign,polygon,gamespot,kotaku,the-verge,techcrunch,gamasutra',
        q: query,
        language: 'en',
        sortBy: 'publishedAt',
        pageSize: '10',
        apiKey: NEWS_API_KEY!,
      });

      const response = await fetch(`${NEWS_API_BASE_URL}/everything?${params}`);
      
      if (response.ok) {
        const data: NewsApiResponse = await response.json();
        
        if (data.status === 'ok') {
          const filtered = data.articles.filter(article => {
            const text = `${article.title} ${article.description}`.toLowerCase();
            return (text.includes('developer') || text.includes('studio') || 
                   text.includes('industry') || text.includes('development')) &&
                   (text.includes('game') || text.includes('gaming')) &&
                   !text.includes('nba') && !text.includes('basketball') && 
                   !text.includes('music') && !text.includes('blackpink') &&
                   article.title && article.description;
          });
          
          allResults.push(...filtered);
        }
      }
    }

    // Remove duplicates and sort by date
    const uniqueArticles = allResults.filter((article, index, self) => 
      index === self.findIndex(a => a.url === article.url)
    );

    return uniqueArticles
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, pageSize);

  } catch (error) {
    console.error('Error fetching developer spotlight news:', error);
    return [];
  }
}

// Extract game name from article title for featured spotlight
export function extractGameName(title: string): string {
  // Common gaming terms and patterns
  const gamePatterns = [
    // Direct game mentions with quotes or specific formatting
    /"([^"]+)"/,
    /'([^']+)'/,
    /\b([A-Z][a-zA-Z0-9\s:'-]{2,30})\s+(Review|Preview|Update|Gets|Launches|Beta|Demo|DLC|Patch)/i,
    /\b(Call of Duty|Final Fantasy|Elder Scrolls|Grand Theft Auto|Assassin's Creed|Far Cry|Watch Dogs|Tom Clancy's|Dead Space|Mass Effect|Dragon Age|Battlefield|Need for Speed|The Sims|FIFA|Madden|NBA 2K|WWE 2K|Mortal Kombat|Street Fighter|Tekken|Super Mario|The Legend of Zelda|Pokemon|Metroid|Donkey Kong|Kirby|Star Fox|Fire Emblem|Xenoblade|Splatoon|Animal Crossing|Mario Kart|Super Smash Bros|Halo|Gears of War|Forza|Fable|Age of Empires|Microsoft Flight Simulator|Sea of Thieves|State of Decay|Ori and the|Cuphead|Among Us|Fall Guys|Rocket League|Minecraft|Roblox|Fortnite|PUBG|Apex Legends|Overwatch|Counter-Strike|Valorant|League of Legends|Dota|World of Warcraft|Hearthstone|Diablo|StarCraft|Heroes of the Storm|Destiny|The Division|Rainbow Six|Splinter Cell|Ghost Recon|For Honor|The Crew|Just Dance|Rayman|Beyond Good and Evil|Prince of Persia|Might and Magic|Anno|Settlers|Blue Byte|Trials|TrackMania|Steep|Riders Republic|Avatar|South Park|Scott Pilgrim|Child of Light|Valiant Hearts|This War of Mine|Papers Please|Hollow Knight|Celeste|Hades|Bastion|Transistor|Pyre|Supergiant|Ori and|Cuphead|Spelunky|Binding of Isaac|Super Meat Boy|Hotline Miami|Katana Zero|Dead Cells|Rogue Legacy|FTL|Into the Breach|Slay the Spire|Darkest Dungeon|Risk of Rain|Enter the Gungeon|Nuclear Throne|Hyper Light Drifter|Shovel Knight|A Hat in Time|Pizza Tower|Sonic|Crash Bandicoot|Spyro|Rayman|Psychonauts|Grim Fandango|Day of the Tentacle|Monkey Island|Sam & Max|Full Throttle|Indiana Jones|Star Wars|Marvel|DC Comics|Batman|Superman|Spider-Man|X-Men|Avengers|Guardians of the Galaxy|Iron Man|Captain America|Thor|Hulk|Black Widow|Fantastic Four|Deadpool|Wolverine|Daredevil|Punisher|Ghost Rider|Blade|Doctor Strange|Ant-Man|Captain Marvel|Black Panther|Shang-Chi|Eternals|Moon Knight|She-Hulk|Ms. Marvel|Hawkeye|Falcon|Winter Soldier|WandaVision|Loki|What If|Groot|Rocket|Star-Lord|Gamora|Drax|Mantis|Nebula|Yondu|Ego|Thanos|Infinity|Endgame|Civil War|Age of Ultron|Dark World|First Avenger|Ragnarok|Homecoming|Far From Home|No Way Home|Multiverse|Madness|Love and Thunder|Wakanda Forever|Quantumania|Volume|Phase|MCU|DCEU|Justice League|Wonder Woman|Aquaman|Flash|Green Lantern|Cyborg|Shazam|Black Adam|Blue Beetle|Supergirl|Batgirl|Nightwing|Robin|Red Hood|Red Robin|Batwoman|Catwoman|Joker|Harley Quinn|Poison Ivy|Two-Face|Penguin|Riddler|Scarecrow|Ra's al Ghul|Bane|Killer Croc|Mr. Freeze|Clayface|Mad Hatter|Calendar Man|Solomon Grundy|Deadshot|Captain Boomerang|El Diablo|Killer Shark|Katana|Rick Flag|Amanda Waller|Task Force X|Suicide Squad|Birds of Prey|Teen Titans|Doom Patrol|Legends of Tomorrow|Arrow|Supergirl|Batwoman|Black Lightning|Stargirl|Titans|Peacemaker|The Batman|Dark Knight|Man of Steel|Batman v Superman|Wonder Woman|Aquaman|Shazam|Birds of Prey|The Suicide Squad|The Flash|Black Adam|Blue Beetle|Aquaman and the Lost Kingdom)\b[^.]*?(?=\s|$)/i,
    // Generic pattern for game titles (capitalize first letter of each word, limit length)
    /\b([A-Z][a-zA-Z0-9\s:'-]{2,25})(?=\s+(game|gaming|release|launch|update|review|preview|beta|alpha|demo|trailer|gameplay|patch|DLC|expansion|sequel|prequel|remaster|remake|port|version|edition|collection|bundle|set|series|franchise|IP|title|project))/i,
  ];

  for (const pattern of gamePatterns) {
    const match = title.match(pattern);
    if (match && match[1]) {
      let gameName = match[1].trim();
      
      // Clean up common prefixes and suffixes
      gameName = gameName
        .replace(/^(The|A|An)\s+/i, '')
        .replace(/\s+(Game|Gaming|Review|Preview|Update|News|Trailer|Beta|Alpha|Demo|DLC|Expansion|Sequel|Prequel|Remaster|Remake|Port|Version|Edition|Collection|Bundle|Set|Series|Franchise|Title|Project).*$/i, '')
        .replace(/['"]/g, '')
        .trim();
      
      // Limit length and ensure it's meaningful
      if (gameName.length >= 3 && gameName.length <= 30) {
        return gameName;
      }
    }
  }

  // Fallback: extract first capitalized phrase
  const fallbackMatch = title.match(/\b([A-Z][a-zA-Z0-9\s]{2,20})\b/);
  if (fallbackMatch) {
    return fallbackMatch[1].trim();
  }

  return 'Latest Gaming News';
}

// Extract developer/studio name from article
export function extractDeveloperName(title: string, description: string): string {
  const text = `${title} ${description}`.toLowerCase();
  
  // Known studios/developers (shortened for UI display)
  const knownStudios = [
    'CD Projekt', 'FromSoftware', 'Naughty Dog', 'Valve', 'Epic Games',
    'Bungie', 'Bethesda', 'Ubisoft', 'EA', 'Activision', 'Blizzard',
    'Nintendo', 'Sony', 'Microsoft', 'Rockstar', 'Square Enix',
    'Capcom', 'Konami', 'Kojima Productions', 'Insomniac', 'Team Cherry',
    'Santa Monica', 'Guerrilla', 'Sucker Punch', 'Supergiant', 'Motion Twin',
    'id Software', 'Machine Games', 'Arkane', 'Tango Gameworks',
    'Hello Games', 'Coffee Stain', 'Ghost Ship', 'Devolver Digital'
  ];

  for (const studio of knownStudios) {
    if (text.includes(studio.toLowerCase())) {
      return studio;
    }
  }

  // Extract company names with size limits
  const patterns = [
    /(\w{2,15})\s+(?:games|studio|studios|entertainment|interactive|software|productions?)/i,
    /(?:by|from|developed by|published by|created by)\s+(\w{2,15}(?:\s+\w{2,10})?)/i,
    /(\w{2,15})\s+(?:developer|team|company)/i
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      let name = match[1].trim();
      if (name.length >= 2 && name.length <= 20) {
        return name;
      }
    }
  }

  return 'Game Studios';
} 