'use client';

import { useState, useEffect } from 'react';
import { NewsArticle, fetchBreakingGameNews, fetchEsportsNews, fetchHardwareNews, fetchIndieGameNews, fetchMobileGamingNews, formatNewsDate } from '@/lib/newsapi';
import { UnsplashImageComponent } from '@/components/UnsplashImage';

// Hero Breaking News Component with Dynamic Background
export function HeroBreakingNewsSection() {
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBreakingNews() {
      try {
        const articles = await fetchBreakingGameNews(1);
        if (articles.length > 0) {
          setArticle(articles[0]);
        }
      } catch (error) {
        console.error('Error loading breaking news:', error);
      } finally {
        setLoading(false);
      }
    }

    loadBreakingNews();
  }, []);

  // Generate background image query based on news title
  const getBackgroundQuery = (title: string): string => {
    const lowerTitle = title.toLowerCase();
    
    // Check for specific game/genre keywords and return appropriate Unsplash queries
    if (lowerTitle.includes('raid') || lowerTitle.includes('beat') || lowerTitle.includes('action')) {
      return 'action video game cyberpunk neon gaming';
    } else if (lowerTitle.includes('esports') || lowerTitle.includes('tournament') || lowerTitle.includes('competitive')) {
      return 'esports tournament gaming arena competitive';
    } else if (lowerTitle.includes('horror') || lowerTitle.includes('scary') || lowerTitle.includes('dark')) {
      return 'dark horror gaming atmosphere moody';
    } else if (lowerTitle.includes('racing') || lowerTitle.includes('car') || lowerTitle.includes('speed')) {
      return 'racing game cars speed neon lights';
    } else if (lowerTitle.includes('fantasy') || lowerTitle.includes('magic') || lowerTitle.includes('rpg')) {
      return 'fantasy gaming magical mystical environment';
    } else if (lowerTitle.includes('space') || lowerTitle.includes('sci-fi') || lowerTitle.includes('futuristic')) {
      return 'sci-fi space gaming futuristic technology';
    } else if (lowerTitle.includes('indie') || lowerTitle.includes('pixel') || lowerTitle.includes('retro')) {
      return 'retro gaming pixel art neon synthwave';
    } else {
      return 'gaming setup cyberpunk neon futuristic';
    }
  };

  const backgroundQuery = article ? getBackgroundQuery(article.title) : 'cyberpunk gaming futuristic neon city';
  const newsImageUrl = article?.urlToImage;

  return (
    <div className="relative h-screen flex">
      {/* Main Content */}
      <div className="flex-1 relative">
        {/* Use news article image if available, otherwise use Unsplash with dynamic query */}
        {newsImageUrl ? (
          <div className="absolute inset-0">
            <img 
              src={newsImageUrl}
              alt="Breaking News Background"
              className="w-full h-full object-cover"
              onError={(e) => {
                // If news image fails to load, hide it and let Unsplash show
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
            {/* Fallback Unsplash image */}
            <UnsplashImageComponent 
              query={backgroundQuery}
              alt="Gaming Background" 
              width={1920} 
              height={1080}
              fill={true}
              className="object-cover absolute inset-0 -z-10" 
              priority={true}
              orientation="landscape"
            />
          </div>
        ) : (
          <UnsplashImageComponent 
            query={backgroundQuery}
            alt="Gaming Background" 
            width={1920} 
            height={1080}
            fill={true}
            className="object-cover" 
            priority={true}
            orientation="landscape"
          />
        )}
        
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/30">
          <div className="flex flex-col justify-center h-full px-16">
            <div className="mb-8">
              {loading ? (
                <div className="max-w-5xl animate-pulse">
                  <h1 className="text-5xl font-black tracking-tight leading-[1.1] mb-0 text-white">
                    <span className="block mb-2">LOADING:</span>
                    <span className="block text-4xl lg:text-5xl leading-[1.2] bg-gray-700 rounded-lg p-2">
                      Fetching latest gaming news...
                    </span>
                  </h1>
                </div>
              ) : article ? (
                <div className="cursor-pointer" onClick={() => window.open(article.url, '_blank')}>
                  <div className="max-w-5xl">
                    <h1 className="text-5xl font-black tracking-tight leading-[1.1] mb-0 hover:text-[#cd48ec] transition-colors text-white drop-shadow-lg">
                      <span className="block mb-2">BREAKING:</span>
                      <span className="block text-4xl lg:text-5xl leading-[1.2] break-words">
                        {article.title}
                      </span>
                    </h1>
                    {article.description && (
                      <p className="text-white/90 text-lg font-medium mt-4 max-w-3xl leading-relaxed drop-shadow-md">
                        {article.description}
                      </p>
                    )}
                    <div className="mt-6 text-white/80 font-mono text-sm">
                      <span>Source: {article.source.name}</span> • <span>{formatNewsDate(article.publishedAt)}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="max-w-5xl">
                  <h1 className="text-5xl font-black tracking-tight leading-[1.1] mb-0 text-white">
                    <span className="block mb-2">BREAKING:</span>
                    <span className="block text-4xl lg:text-5xl leading-[1.2]">
                      Gaming News Updates Available
                    </span>
                  </h1>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Featured Esports Story Component
export function FeaturedEsportsStory() {
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEsportsNews() {
      try {
        const articles = await fetchEsportsNews(1);
        if (articles.length > 0) {
          setArticle(articles[0]);
        }
      } catch (error) {
        console.error('Error loading esports news:', error);
      } finally {
        setLoading(false);
      }
    }

    loadEsportsNews();
  }, []);

  if (loading) {
    return (
      <div className="lg:col-span-2 bg-gray-900 border border-gray-700 rounded-lg overflow-hidden animate-pulse">
        <div className="aspect-video bg-gray-700"></div>
        <div className="p-6">
          <div className="h-8 bg-gray-700 rounded mb-4"></div>
          <div className="h-4 bg-gray-700 rounded mb-2"></div>
          <div className="h-4 bg-gray-700 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="lg:col-span-2 bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
        <div className="p-6">
          <h3 className="text-2xl font-black mb-4">
            No Esports News Available
          </h3>
          <p className="text-gray-400 font-mono text-sm">
            Check back later for the latest esports updates.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="lg:col-span-2 bg-gray-900 border border-gray-700 rounded-lg overflow-hidden hover:border-[#cd48ec] transition-colors group cursor-pointer"
      onClick={() => window.open(article.url, '_blank')}
    >
      <div className="aspect-video relative">
        {article.urlToImage ? (
          <img 
            src={article.urlToImage} 
            alt={article.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        ) : (
          <div className="w-full h-full bg-purple-900 flex items-center justify-center">
            <span className="text-white font-mono text-sm">ESPORTS NEWS</span>
          </div>
        )}
        <div className="absolute top-4 left-4 bg-[#cd48ec] text-black px-3 py-1 text-xs font-mono font-bold">
          FEATURED
        </div>
        <div className="absolute bottom-4 left-4 bg-black/80 text-white px-4 py-2 backdrop-blur-sm">
          <p className="font-mono text-xs text-[#cd48ec] mb-1">[ESPORTS]</p>
          <p className="font-bold text-lg">{article.source.name?.toUpperCase() || 'ESPORTS UPDATE'}</p>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-black mb-4 group-hover:text-[#cd48ec] transition-colors">
          {article.title}
        </h3>
        <p className="text-gray-400 font-mono text-sm leading-relaxed mb-4">
          {article.description || 'Latest esports news and tournament updates from the competitive gaming world.'}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-xs font-mono text-gray-500">
            <span>[●] {formatNewsDate(article.publishedAt)}</span>
            <span>[●] BY {article.author?.toUpperCase() || 'NEWSAPI'}</span>
            <span>[●] ESPORTS</span>
          </div>
          <div className="text-[#cd48ec] font-mono text-sm cursor-pointer hover:text-white">
            READ_MORE [↗]
          </div>
        </div>
      </div>
    </div>
  );
}

// Hardware News Card Component
export function HardwareNewsCard() {
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHardwareNews() {
      try {
        const articles = await fetchHardwareNews(1);
        if (articles.length > 0) {
          setArticle(articles[0]);
        }
      } catch (error) {
        console.error('Error loading hardware news:', error);
      } finally {
        setLoading(false);
      }
    }

    loadHardwareNews();
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 animate-pulse">
        <div className="flex items-start space-x-4">
          <div className="w-20 h-20 bg-gray-700 rounded flex-shrink-0"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-700 rounded w-3/4"></div>
            <div className="h-3 bg-gray-700 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
        <div className="flex items-start space-x-4">
          <div className="w-20 h-20 bg-purple-900 rounded flex-shrink-0 flex items-center justify-center">
            <span className="text-white text-xs">HW</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-mono text-xs text-[#cd48ec] mb-2">[HARDWARE]</p>
            <h4 className="font-bold text-sm mb-2">
              No Hardware News Available
            </h4>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="bg-gray-900 border border-gray-700 rounded-lg p-6 hover:border-[#cd48ec] transition-colors group cursor-pointer"
      onClick={() => window.open(article.url, '_blank')}
    >
      <div className="flex items-start space-x-4">
        <div className="w-20 h-20 bg-purple-900 rounded overflow-hidden flex-shrink-0">
          {article.urlToImage ? (
            <img 
              src={article.urlToImage} 
              alt={article.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-white text-xs font-mono">GPU</span>
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-mono text-xs text-[#cd48ec] mb-2">[HARDWARE]</p>
          <h4 className="font-bold text-sm mb-2 group-hover:text-[#cd48ec] transition-colors line-clamp-2">
            {article.title}
          </h4>
          <div className="text-xs font-mono text-gray-500">
            <span>[●] {formatNewsDate(article.publishedAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Indie Game News Card Component
export function IndieGameNewsCard() {
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadIndieNews() {
      try {
        const articles = await fetchIndieGameNews(1);
        if (articles.length > 0) {
          setArticle(articles[0]);
        }
      } catch (error) {
        console.error('Error loading indie game news:', error);
      } finally {
        setLoading(false);
      }
    }

    loadIndieNews();
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 animate-pulse">
        <div className="flex items-start space-x-4">
          <div className="w-20 h-20 bg-gray-700 rounded flex-shrink-0"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-700 rounded w-3/4"></div>
            <div className="h-3 bg-gray-700 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
        <div className="flex items-start space-x-4">
          <div className="w-20 h-20 bg-blue-900 rounded flex-shrink-0 flex items-center justify-center">
            <span className="text-white text-xs">DEV</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-mono text-xs text-[#cd48ec] mb-2">[DEV_UPDATES]</p>
            <h4 className="font-bold text-sm mb-2">
              No Dev News Available
            </h4>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="bg-gray-900 border border-gray-700 rounded-lg p-6 hover:border-[#cd48ec] transition-colors group cursor-pointer"
      onClick={() => window.open(article.url, '_blank')}
    >
      <div className="flex items-start space-x-4">
        <div className="w-20 h-20 bg-blue-900 rounded overflow-hidden flex-shrink-0">
          {article.urlToImage ? (
            <img 
              src={article.urlToImage} 
              alt={article.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-white text-xs font-mono">INDIE</span>
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-mono text-xs text-[#cd48ec] mb-2">[DEV_UPDATES]</p>
          <h4 className="font-bold text-sm mb-2 group-hover:text-[#cd48ec] transition-colors line-clamp-2">
            {article.title}
          </h4>
          <div className="text-xs font-mono text-gray-500">
            <span>[●] {formatNewsDate(article.publishedAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Mobile Gaming News Card Component
export function MobileGamingNewsCard() {
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMobileNews() {
      try {
        const articles = await fetchMobileGamingNews(1);
        if (articles.length > 0) {
          setArticle(articles[0]);
        }
      } catch (error) {
        console.error('Error loading mobile gaming news:', error);
      } finally {
        setLoading(false);
      }
    }

    loadMobileNews();
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 animate-pulse">
        <div className="flex items-start space-x-4">
          <div className="w-20 h-20 bg-gray-700 rounded flex-shrink-0"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-700 rounded w-3/4"></div>
            <div className="h-3 bg-gray-700 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
        <div className="flex items-start space-x-4">
          <div className="w-20 h-20 bg-green-900 rounded flex-shrink-0 flex items-center justify-center">
            <span className="text-white text-xs">MOB</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-mono text-xs text-[#cd48ec] mb-2">[MOBILE]</p>
            <h4 className="font-bold text-sm mb-2">
              No Mobile Gaming News
            </h4>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="bg-gray-900 border border-gray-700 rounded-lg p-6 hover:border-[#cd48ec] transition-colors group cursor-pointer"
      onClick={() => window.open(article.url, '_blank')}
    >
      <div className="flex items-start space-x-4">
        <div className="w-20 h-20 bg-green-900 rounded overflow-hidden flex-shrink-0">
          {article.urlToImage ? (
            <img 
              src={article.urlToImage} 
              alt={article.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-white text-xs font-mono">📱</span>
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-mono text-xs text-[#cd48ec] mb-2">[MOBILE]</p>
          <h4 className="font-bold text-sm mb-2 group-hover:text-[#cd48ec] transition-colors line-clamp-2">
            {article.title}
          </h4>
          <div className="text-xs font-mono text-gray-500">
            <span>[●] {formatNewsDate(article.publishedAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Latest Gaming News Grid Component
export function LatestNewsGrid() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLatestNews() {
      try {
        const latestArticles = await fetchBreakingGameNews(4);
        setArticles(latestArticles);
      } catch (error) {
        console.error('Error loading latest news:', error);
      } finally {
        setLoading(false);
      }
    }

    loadLatestNews();
  }, []);

  // Generate appropriate image query based on news title
  const getImageQuery = (title: string): string => {
    const lowerTitle = title.toLowerCase();
    
    if (lowerTitle.includes('battle') || lowerTitle.includes('war') || lowerTitle.includes('fight')) {
      return 'gaming battle station rgb keyboard mouse setup';
    } else if (lowerTitle.includes('esports') || lowerTitle.includes('tournament') || lowerTitle.includes('competitive')) {
      return 'esports tournament competitive gaming arena';
    } else if (lowerTitle.includes('vr') || lowerTitle.includes('virtual reality') || lowerTitle.includes('immersive')) {
      return 'virtual reality gaming headset futuristic';
    } else if (lowerTitle.includes('stream') || lowerTitle.includes('content') || lowerTitle.includes('creator')) {
      return 'gaming streamer setup neon lights professional';
    } else if (lowerTitle.includes('hardware') || lowerTitle.includes('gpu') || lowerTitle.includes('cpu')) {
      return 'gaming hardware gpu computer components';
    } else if (lowerTitle.includes('mobile') || lowerTitle.includes('phone')) {
      return 'mobile gaming smartphone controller';
    } else if (lowerTitle.includes('indie') || lowerTitle.includes('developer')) {
      return 'indie game development retro pixel art';
    } else {
      return 'gaming setup cyberpunk neon lights';
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-3 mt-16">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="aspect-video bg-gray-300 rounded overflow-hidden animate-pulse">
            <div className="w-full h-full bg-gray-400"></div>
          </div>
        ))}
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="grid grid-cols-2 gap-3 mt-16">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="aspect-video bg-gray-300 rounded overflow-hidden relative">
            <UnsplashImageComponent
              query="gaming news placeholder"
              alt={`Gaming News ${i}`}
              width={300}
              height={169}
              className="w-full h-full object-cover"
              orientation="landscape"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-3">
              <p className="text-white font-bold text-sm">No Latest News Available</p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 mt-16">
      {articles.slice(0, 4).map((article, index) => {
        const imageQuery = getImageQuery(article.title);
        
        return (
          <div 
            key={index}
            className="aspect-video bg-purple-900 rounded overflow-hidden relative cursor-pointer hover:scale-105 transition-transform group"
            onClick={() => window.open(article.url, '_blank')}
          >
            {/* Use article image if available, otherwise use Unsplash */}
            {article.urlToImage ? (
              <div className="relative w-full h-full">
                <img 
                  src={article.urlToImage}
                  alt={article.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // If news image fails to load, hide it and show Unsplash fallback
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
                {/* Fallback Unsplash image */}
                <UnsplashImageComponent
                  query={imageQuery}
                  alt={article.title}
                  width={300}
                  height={169}
                  className="w-full h-full object-cover absolute inset-0 -z-10"
                  orientation="landscape"
                />
              </div>
            ) : (
              <UnsplashImageComponent
                query={imageQuery}
                alt={article.title}
                width={300}
                height={169}
                className="w-full h-full object-cover"
                orientation="landscape"
              />
            )}
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent flex items-end p-3">
              <div>
                <p className="text-white font-bold text-sm line-clamp-2 group-hover:text-[#cd48ec] transition-colors">
                  {article.title.length > 60 ? `${article.title.substring(0, 60)}...` : article.title}
                </p>
                <p className="text-white/70 font-mono text-xs mt-1">
                  {article.source.name} • {formatNewsDate(article.publishedAt)}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
} 