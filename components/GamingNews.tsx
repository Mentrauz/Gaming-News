'use client';

import { useState, useEffect } from 'react';
import { NewsArticle, fetchGamingNews, fetchNewsFromGamingSources, formatNewsDate, getSourceDomain } from '@/lib/newsapi';
import { Button } from '@/components/ui/button';
import { ExternalLink, Clock, User } from 'lucide-react';

interface GamingNewsProps {
  maxArticles?: number;
  showImages?: boolean;
  layout?: 'grid' | 'list';
  query?: string;
}

export function GamingNews({ 
  maxArticles = 10, 
  showImages = true, 
  layout = 'list',
  query 
}: GamingNewsProps) {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadNews() {
      try {
        setLoading(true);
        setError(null);
        
        if (query) {
          // Fetch news for specific category query
          const categoryNews = await fetchGamingNews(query, maxArticles);
          setArticles(categoryNews);
        } else {
          // Fetch from multiple sources for better coverage (default behavior)
          const [generalGamingNews, sourceSpecificNews] = await Promise.all([
            fetchGamingNews('gaming OR esports OR video games', 10),
            fetchNewsFromGamingSources('ign,polygon,gamespot,kotaku,the-verge', 10)
          ]);

          // Combine and deduplicate articles
          const allArticles = [...sourceSpecificNews, ...generalGamingNews];
          const uniqueArticles = allArticles.filter((article, index, self) => 
            index === self.findIndex(a => a.url === article.url)
          );

          // Sort by publication date (newest first)
          const sortedArticles = uniqueArticles
            .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
            .slice(0, maxArticles);

          setArticles(sortedArticles);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch gaming news');
      } finally {
        setLoading(false);
      }
    }

    loadNews();
  }, [maxArticles, query]);

  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: query ? 4 : 3 }).map((_, i) => (
          <div key={i} className="bg-gray-900 border border-gray-700 rounded-lg p-6 animate-pulse loading-pulse">
            <div className="flex space-x-4">
              {showImages && <div className="w-20 h-20 bg-gray-700 rounded flex-shrink-0" />}
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-700 rounded w-3/4" />
                <div className="h-3 bg-gray-700 rounded w-1/2" />
                <div className="h-3 bg-gray-700 rounded w-1/4" />
              </div>
            </div>
          </div>
        ))}
        {query && (
          <div className="text-center py-4">
            <div className="inline-flex items-center space-x-2 text-[#cd48ec] font-mono text-sm">
              <div className="w-4 h-4 border-2 border-[#cd48ec] border-t-transparent rounded-full animate-spin"></div>
              <span>LOADING CATEGORY NEWS...</span>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900/20 border border-red-700 rounded-lg p-6 text-center">
        <p className="text-red-400 font-mono text-sm mb-4">
          [ERROR] Failed to load gaming news: {error}
        </p>
        <Button 
          onClick={() => window.location.reload()} 
          className="bg-red-600 hover:bg-red-700 text-white"
        >
          Retry
        </Button>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 text-center">
        <p className="text-gray-400 font-mono text-sm">
          [NO_DATA] No gaming news available at the moment.
        </p>
      </div>
    );
  }

  const containerClasses = layout === 'grid' 
    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
    : 'space-y-6';

  return (
    <div className={containerClasses}>
      {articles.map((article, index) => (
        <article 
          key={article.url} 
          className="bg-gray-900 border border-gray-700 rounded-lg hover:border-[#cd48ec] transition-colors group cursor-pointer overflow-hidden news-item-enter"
          onClick={() => window.open(article.url, '_blank')}
        >
          {showImages && article.urlToImage && layout === 'grid' && (
            <div className="aspect-video relative overflow-hidden">
              <img 
                src={article.urlToImage} 
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
              <div className="absolute top-4 left-4 bg-[#cd48ec] text-black px-3 py-1 text-xs font-mono font-bold">
                {index === 0 ? 'BREAKING' : 'NEWS'}
              </div>
            </div>
          )}
          
          <div className="p-6">
            <div className="flex items-start space-x-4">
              {showImages && article.urlToImage && layout === 'list' && (
                <div className="w-20 h-20 bg-gray-700 rounded overflow-hidden flex-shrink-0">
                  <img 
                    src={article.urlToImage} 
                    alt={article.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>
              )}
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="font-mono text-xs text-[#cd48ec] uppercase">
                    [{article.source.name || getSourceDomain(article.url)}]
                  </span>
                  {index === 0 && (
                    <span className="bg-red-500 text-white px-2 py-0.5 text-xs font-mono font-bold animate-pulse">
                      LIVE
                    </span>
                  )}
                </div>
                
                <h3 className="font-bold text-sm md:text-base mb-2 group-hover:text-[#cd48ec] transition-colors line-clamp-2">
                  {article.title}
                </h3>
                
                {article.description && (
                  <p className="text-gray-400 text-xs md:text-sm leading-relaxed mb-3 line-clamp-2">
                    {article.description}
                  </p>
                )}
                
                <div className="flex items-center justify-between text-xs font-mono text-gray-500">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{formatNewsDate(article.publishedAt)}</span>
                    </div>
                    {article.author && (
                      <div className="flex items-center space-x-1">
                        <User className="w-3 h-3" />
                        <span className="truncate max-w-24">{article.author}</span>
                      </div>
                    )}
                  </div>
                  <ExternalLink className="w-3 h-3 text-[#cd48ec] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

// Compact version for breaking news ticker
export function BreakingNewsTicker({ maxArticles = 5 }: { maxArticles?: number }) {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBreakingNews() {
      try {
        const news = await fetchNewsFromGamingSources('ign,polygon,gamespot', maxArticles);
        setArticles(news.slice(0, maxArticles));
      } catch (error) {
        console.error('Error loading breaking news:', error);
      } finally {
        setLoading(false);
      }
    }

    loadBreakingNews();
  }, [maxArticles]);

  if (loading || articles.length === 0) {
    return (
      <div className="font-mono text-sm text-gray-300">
        <span className="text-[#cd48ec]">[LOADING]</span> Fetching latest gaming news...
      </div>
    );
  }

  return (
    <div className="font-mono text-sm text-gray-300 flex-1 overflow-hidden">
      <div className="flex space-x-8 animate-marquee">
        {articles.map((article, index) => (
          <span key={article.url} className="flex-shrink-0">
            <span className="text-[#cd48ec]">[{formatNewsDate(article.publishedAt)}]</span>{' '}
            <span 
              className="hover:text-white cursor-pointer transition-colors"
              onClick={() => window.open(article.url, '_blank')}
            >
              {article.title}
            </span>
            {index < articles.length - 1 && ' • '}
          </span>
        ))}
      </div>
    </div>
  );
} 