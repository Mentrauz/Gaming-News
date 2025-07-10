'use client';

import { useState, useEffect } from 'react';
import { NewsArticle, fetchFeaturedGameNews, fetchDeveloperSpotlightNews, extractGameName, extractDeveloperName, formatNewsDate } from '@/lib/newsapi';
import { UnsplashImageComponent } from '@/components/UnsplashImage';

export function FeaturedSpotlight() {
  const [featuredGame, setFeaturedGame] = useState<NewsArticle | null>(null);
  const [developerNews, setDeveloperNews] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSpotlightContent() {
      try {
        setLoading(true);
        
        // Fetch both featured game and developer news
        const [gameNews, devNews] = await Promise.all([
          fetchFeaturedGameNews(1),
          fetchDeveloperSpotlightNews(1)
        ]);

        console.log('Featured game news:', gameNews);
        console.log('Developer news:', devNews);

        if (gameNews.length > 0) {
          setFeaturedGame(gameNews[0]);
        }
        
        if (devNews.length > 0) {
          setDeveloperNews(devNews[0]);
        }
      } catch (error) {
        console.error('Error loading spotlight content:', error);
      } finally {
        // Ensure loading state is short enough to see content
        setTimeout(() => setLoading(false), 500);
      }
    }

    loadSpotlightContent();
  }, []);

  // Fallback content when no news is available
  const fallbackGameContent = {
    title: "Cyberpunk 2077: Phantom Liberty",
    description: "Experience the highly acclaimed expansion that brings new depth to Night City. Enhanced gameplay mechanics, improved AI systems, and a gripping espionage storyline that defines the future of RPG gaming.",
    developer: "CD Projekt",
    score: "9.2",
    year: "2023 • Expansion"
  };

  const fallbackDevContent = {
    title: "The Future of Interactive Entertainment and Game Development",
    description: "Deep dive into the latest trends shaping the gaming industry. From indie breakthroughs to AAA innovations, explore the creative vision behind today's most acclaimed titles.",
    developer: "Industry Veterans",
    studio: "Gaming Studios",
    topic: "Future of Gaming"
  };

  // Helper function to truncate long text
  const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  };

  // Helper function to clean up extracted names/titles
  const cleanTitle = (title: string): string => {
    // Remove common prefixes and clean up
    return title
      .replace(/^(Review:|News:|Update:|Preview:)\s*/i, '')
      .replace(/\s+(Review|Gets|Update|News|Trailer|Preview).*$/i, '')
      .replace(/['"]/g, '')
      .trim();
  };

  // Helper function to get adaptive CSS class based on title length
  const getTitleSizeClass = (title: string): string => {
    const length = title.length;
    if (length > 80) return 'title-very-long';
    if (length > 60) return 'title-long';
    if (length > 40) return 'title-medium';
    return 'title-short';
  };

  const gameContent = featuredGame ? {
    title: truncateText(cleanTitle(extractGameName(featuredGame.title)), 35),
    description: truncateText(featuredGame.description || fallbackGameContent.description, 180),
    developer: truncateText(extractDeveloperName(featuredGame.title, featuredGame.description || ''), 25),
    score: "New",
    year: formatNewsDate(featuredGame.publishedAt),
    url: featuredGame.url,
    imageQuery: `${extractGameName(featuredGame.title)} video game screenshot gameplay`
  } : {
    ...fallbackGameContent,
    url: null,
    imageQuery: "cyberpunk 2077 gaming night city neon futuristic"
  };

  const devContent = developerNews ? {
    title: cleanTitle(developerNews.title), // Show full title without truncation
    description: truncateText(developerNews.description || fallbackDevContent.description, 180),
    developer: truncateText(extractDeveloperName(developerNews.title, developerNews.description || ''), 25),
    studio: "Gaming Industry",
    topic: truncateText(cleanTitle(extractGameName(developerNews.title)), 30),
    url: developerNews.url,
    imageQuery: "game developer programming coding gaming studio workspace"
  } : {
    ...fallbackDevContent,
    url: null,
    imageQuery: "game developer programming coding gaming studio workspace"
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white text-black flex">
        <div className="flex-1 flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="w-12 h-12 border-3 border-[#cd48ec] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="font-mono text-xs text-gray-600">LOADING GAME NEWS...</p>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center bg-black">
          <div className="text-center">
            <div className="w-12 h-12 border-3 border-[#cd48ec] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="font-mono text-xs text-white/60">LOADING DEV INSIGHTS...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black flex">
      <div className="flex-1 flex flex-col">
        {/* Game Spotlight Text */}
        <div className="flex-1 flex flex-col justify-center px-16 py-12">
          <div className="mb-12">
            <div className="text-xs font-mono mb-6 text-gray-600 uppercase tracking-wider">[FEATURED_SPOTLIGHT]</div>
            <h2 className="responsive-title text-4xl md:text-5xl lg:text-6xl font-black leading-[0.9] mb-8 max-w-lg break-words smooth-text-transition">
              GAME OF THE WEEK
              <br />
              <span className="text-[#cd48ec] block mt-2 leading-[0.85] text-with-tooltip" title={gameContent.title}>{gameContent.title}</span>
            </h2>
          </div>

          <div className="max-w-lg space-y-6 font-mono text-sm leading-relaxed">
            <p className="text-gray-800 leading-relaxed truncate-multiline">{gameContent.description}</p>
            
            <div className="pt-4 border-t border-gray-300">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[#cd48ec] font-bold text-xs">STATUS</span>
                <span className="bg-[#cd48ec] text-black px-3 py-1 font-bold text-xs">{gameContent.score}</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600 text-xs">DEVELOPER</span>
                <span className="font-bold text-xs text-right max-w-[60%] truncate" title={gameContent.developer}>{gameContent.developer}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 text-xs">UPDATED</span>
                <span className="font-bold text-xs">{gameContent.year}</span>
              </div>
              {gameContent.url && (
                <div className="pt-3">
                  <button
                    onClick={() => window.open(gameContent.url!, '_blank')}
                    className="bg-[#cd48ec] text-black px-6 py-2 font-mono text-xs font-bold hover:bg-[#b93fd4] transition-colors"
                  >
                    READ MORE [↗]
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Game Image */}
        <div className="flex-1 relative min-h-[400px]">
          <UnsplashImageComponent
            query={gameContent.imageQuery}
            alt={`${gameContent.title} Gaming`}
            width={800}
            height={400}
            className="w-full h-full object-cover"
            orientation="landscape"
          />
          <div className="absolute top-6 left-6 bg-black/70 text-white px-4 py-3 backdrop-blur-sm">
            <p className="font-mono text-xs mb-1 opacity-80">WEEKLY SPOTLIGHT</p>
            <p className="font-bold text-lg">NOW TRENDING</p>
          </div>
          <div className="absolute bottom-6 left-6 bg-[#cd48ec]/90 text-black px-4 py-3 backdrop-blur-sm">
            <p className="font-mono text-xs mb-1">{featuredGame ? 'LIVE NEWS' : 'FEATURED'}</p>
            <p className="font-bold text-sm">{featuredGame ? 'LATEST UPDATE' : 'EXPANSION AVAILABLE'}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        {/* Developer Image */}
        <div className="flex-1 relative min-h-[400px]">
          <UnsplashImageComponent
            query={devContent.imageQuery}
            alt="Developer Interview"
            width={800}
            height={400}
            className="w-full h-full object-cover"
            orientation="landscape"
          />
          <div className="absolute top-6 right-6 bg-black/70 text-white px-4 py-3 backdrop-blur-sm">
            <p className="font-mono text-xs mb-1 opacity-80">EXCLUSIVE CONTENT</p>
            <p className="font-bold text-lg">DEV INSIGHTS</p>
          </div>
          <div className="absolute bottom-6 right-6 bg-[#cd48ec]/90 text-black px-4 py-3 backdrop-blur-sm">
            <p className="font-mono text-xs mb-1">{developerNews ? 'LIVE NEWS' : 'INDUSTRY LEADERS'}</p>
            <p className="font-bold text-sm">{developerNews ? 'LATEST STORY' : 'BEHIND THE CODE'}</p>
          </div>
        </div>
        
        {/* Right Side - Developer Spotlight */}
        <div className="flex-1 relative bg-black">
          <div className="p-8 lg:p-16 h-full flex flex-col justify-center">
            <div className="mb-6 lg:mb-8">
              <div className="text-xs font-mono mb-4 lg:mb-6 text-white/60 uppercase tracking-wider">[DEVELOPER_SPOTLIGHT]</div>
              <h3 className={`adaptive-title ${getTitleSizeClass(devContent.title)} font-black text-white mb-4 lg:mb-6 smooth-text-transition`}
                  title={devContent.title}>
                {devContent.title}
              </h3>
            </div>

            <div className="space-y-4 font-mono text-sm text-white/70 leading-relaxed">
              <p className="leading-relaxed truncate-multiline">{devContent.description}</p>
              
              <div className="pt-4 border-t border-white/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[#cd48ec] font-bold text-xs">DEVELOPER</span>
                  <span className="text-white font-bold text-xs text-right max-w-[60%] truncate" title={devContent.developer}>{devContent.developer}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/50 text-xs">STUDIO</span>
                  <span className="text-white font-bold text-xs">{devContent.studio}</span>
                </div>
                {devContent.url && (
                  <div className="pt-3">
                    <button
                      onClick={() => window.open(devContent.url!, '_blank')}
                      className="bg-white text-black px-6 py-2 font-mono text-xs font-bold hover:bg-gray-200 transition-colors"
                    >
                      READ MORE [↗]
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 