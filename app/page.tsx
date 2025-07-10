'use client';

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Download, X, Square, Grid3X3, RotateCcw, Plus, Minus } from "lucide-react"
import { UnsplashImageComponent } from "@/components/UnsplashImage"
import { GamingNews, BreakingNewsTicker } from "@/components/GamingNews"
import { HeroBreakingNewsSection, FeaturedEsportsStory, HardwareNewsCard, IndieGameNewsCard, MobileGamingNewsCard, LatestNewsGrid } from "@/components/CategoryNews"
import { FeaturedSpotlight } from "@/components/FeaturedSpotlight"

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const categories = [
    { id: 'fps_focus', label: 'FPS_FOCUS', query: '"first person shooter" OR "FPS game" OR "Call of Duty" OR "Counter-Strike" OR "Valorant" OR "Apex Legends" OR "Overwatch" OR "Doom"' },
    { id: 'rpg_realm', label: 'RPG_REALM', query: '"role playing game" OR "RPG game" OR "Final Fantasy" OR "Elder Scrolls" OR "Witcher" OR "Baldur\'s Gate" OR "Elden Ring" OR "Cyberpunk 2077"' },
    { id: 'indie_insider', label: 'INDIE_INSIDER', query: '"indie game" OR "independent game" OR "indie developer" OR "steam indie" OR "indie gaming" OR "small developer"' },
    { id: 'hardware_hub', label: 'HARDWARE_HUB', query: '"gaming hardware" OR "gaming PC" OR "graphics card" OR "GPU" OR "RTX" OR "Radeon" OR "gaming laptop" OR "CPU gaming"' },
    { id: 'rumor_radar', label: 'RUMOR_RADAR', query: '"gaming rumor" OR "game leak" OR "upcoming game" OR "game announcement" OR "game reveal" OR "rumored game" OR "leaked game"' },
    { id: 'patch_notes', label: 'PATCH_NOTES', query: '"patch notes" OR "game update" OR "hotfix" OR "balance update" OR "game patch" OR "software update" OR "bug fix"' },
    { id: 'esports_elite', label: 'ESPORTS_ELITE', query: 'esports OR "competitive gaming" OR "professional gaming" OR "gaming tournament" OR "esports championship" OR "gaming competition"' },
    { id: 'dev_diaries', label: 'DEV_DIARIES', query: '"developer diary" OR "game development" OR "behind the scenes" OR "dev blog" OR "game developer" OR "development update"' }
  ];

  const handleCategoryClick = (categoryId: string) => {
    if (isAnimating) return; // Prevent clicks during animation
    
    if (selectedCategory === categoryId) {
      // Close the section
      handleCloseCategory();
    } else if (selectedCategory && selectedCategory !== categoryId) {
      // Switch to different category
      handleCloseCategory(() => {
        setSelectedCategory(categoryId);
        setShowContent(true);
      });
    } else {
      // Open new section
      setSelectedCategory(categoryId);
      setShowContent(true);
    }
  };

  const handleCloseCategory = (callback?: () => void) => {
    setIsAnimating(true);
    setShowContent(false);
    
    // Wait for close animation to complete
    setTimeout(() => {
      setSelectedCategory(null);
      setIsAnimating(false);
      if (callback) callback();
    }, 400); // Match the slideUp animation duration
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-4 py-3 bg-black/90 backdrop-blur-sm">
        <div className="flex items-center space-x-8">
          <Image 
            src="/logo.png" 
            alt="Patchdrop Logo" 
            width={32} 
            height={32} 
            className="rounded-full" 
          />
          <div className="flex items-center space-x-6 text-sm font-mono">
            <span className="text-[#cd48ec]">[●] Patchdrop</span>
            <span className="text-gray-400">Latest Drops [↗]</span>
            <span className="text-gray-400">Patch Notes [↗]</span>
            <span className="text-gray-400">Gaming News [↗]</span>
            <span className="text-gray-400">Rumor Radar [↗]</span>
            <span className="text-gray-400">FPS Focus [↗]</span>
            <span className="text-gray-400">Dev Talk [↗]</span>
            <span className="text-gray-400">Drop Reviews [↗]</span>
          </div>
        </div>
        <div className="bg-[#cd48ec] text-black px-4 py-2 font-mono text-sm font-bold">SUBSCRIBE NOW [↗]</div>
      </nav>

      {/* Hero Section with Dynamic Background */}
      <HeroBreakingNewsSection />

      {/* News Section */}
      <div className="flex min-h-screen">
        {/* Left Content */}
        <div className="flex-1 bg-gray-100 text-black p-16">
          <div className="mb-8">
            <h2 className="text-4xl font-black mb-4">LATEST UPDATES</h2>
            <p className="text-gray-600 mb-8 max-w-md">
              Stay connected with the latest news, including upcoming releases, developer updates, and playfest
              information.
            </p>
            <Button className="bg-black text-white hover:bg-gray-800 font-mono">SEE ALL NEWS ↗</Button>
          </div>

          {/* Latest Gaming News Grid */}
          <LatestNewsGrid />
        </div>

        {/* Right Sidebar */}
        <div className="w-96 bg-[#cd48ec] text-black p-8">
          {/* Window Controls */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex space-x-2">
              <X className="w-4 h-4" />
              <Square className="w-4 h-4" />
            </div>
            <div className="bg-black text-[#cd48ec] px-3 py-1 text-xs font-mono">⚡ BREAKING NEWS</div>
          </div>

          {/* Wishlist Section */}
          <div className="mb-8">
            <div className="text-right mb-4 text-xs font-mono">TECH UPDATES</div>
            <p className="text-xs font-mono leading-relaxed mb-4">
              STAY INFORMED ON THE LATEST HARDWARE DEVELOPMENTS. FROM GPU LAUNCHES TO CPU BENCHMARKS, 
              GET DETAILED ANALYSIS OF GAMING HARDWARE. FEATURING REVIEWS, PERFORMANCE METRICS, AND PRICE COMPARISONS.
            </p>
          </div>

          {/* Social Links */}
          <div className="space-y-2 font-mono text-xs">
            <div>[●] TECH REVIEWS</div>
            <div>[●] BENCHMARKS</div>
            <div>[●] PRICE TRACKER</div>
            <div>[●] BUILD GUIDES</div>
            <div>[●] GPU NEWS</div>
            <div>[●] CPU UPDATES</div>
            <div>[●] PERIPHERALS</div>
            <div>[●] STORAGE SOLUTIONS</div>
            <div>[●] COOLING TECH</div>
            <div>[●] MARKET ANALYSIS</div>
            <div>[●] TECH DEALS</div>
          </div>

          {/* Subscribe Button */}
          {/* <div className="absolute bottom-8 right-8">
            <Button className="bg-black text-[#cd48ec] hover:bg-gray-800 font-mono">GET ALERTS ↗</Button>
          </div> */}
        </div>
      </div>

      {/* Gaming News Feed Section */}
      <div className="min-h-screen bg-black text-white">
        <div className="max-w-7xl mx-auto px-8 py-16">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-12">
            <div>
              <div className="text-xs font-mono mb-4 text-[#cd48ec] uppercase tracking-wider">[LIVE_FEED]</div>
              <h2 className="text-5xl lg:text-6xl font-black leading-tight mb-4">
                TRENDING NOW
                <br />
                <span className="text-[#cd48ec]">GAMING PULSE</span>
              </h2>
              <p className="text-gray-400 font-mono text-sm max-w-md">
                REAL-TIME GAMING NEWS, INDUSTRY UPDATES, AND BREAKING DEVELOPMENTS FROM ACROSS THE DIGITAL FRONTIER.
              </p>
            </div>
            <div className="bg-[#cd48ec] text-black px-6 py-3 font-mono text-sm font-bold hover:bg-[#b93fd4] transition-colors cursor-pointer">
              VIEW ALL STORIES [↗]
            </div>
          </div>

          {/* Breaking News Ticker */}
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mb-12">
            <div className="flex items-center space-x-4">
              <div className="bg-red-500 text-white px-3 py-1 text-xs font-mono font-bold animate-pulse">
                BREAKING
              </div>
              <BreakingNewsTicker maxArticles={3} />
            </div>
          </div>

          {/* News Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Featured Story */}
            <FeaturedEsportsStory />

            {/* Sidebar News */}
            <div className="space-y-6">
              {/* Hardware News */}
              <HardwareNewsCard />

              {/* Indie Game Dev News */}
              <IndieGameNewsCard />

              {/* Mobile Gaming News */}
              <MobileGamingNewsCard />
            </div>
          </div>

          {/* Live Gaming News Feed */}
          <div className="border-t border-gray-800 pt-12">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h4 className="text-sm font-black text-[#cd48ec] font-mono mb-2">[LIVE_NEWS_FEED]</h4>
                <h3 className="text-3xl font-black mb-4">REAL-TIME GAMING NEWS</h3>
                <p className="text-gray-400 font-mono text-sm max-w-md">
                  POWERED BY NEWS API • UPDATED EVERY MINUTE • MULTIPLE SOURCES
                </p>
              </div>
              <div className="bg-[#cd48ec] text-black px-6 py-3 font-mono text-sm font-bold hover:bg-[#b93fd4] transition-colors cursor-pointer">
                REFRESH FEED [↗]
              </div>
            </div>
            
            <GamingNews maxArticles={8} showImages={true} layout="list" />
          </div>

          {/* Category Tags */}
          <div className="border-t border-gray-800 pt-8 mt-12">
            <h4 className="text-sm font-black text-[#cd48ec] font-mono mb-6">[EXPLORE_CATEGORIES]</h4>
            <div className="flex flex-wrap gap-3">
                             {categories.map((category) => (
                 <div
                   key={category.id}
                   className={`bg-gray-900 px-4 py-2 rounded border border-gray-700 hover:border-[#cd48ec] hover:bg-gray-800 transition-all duration-300 cursor-pointer ${
                     selectedCategory === category.id ? 'border-[#cd48ec] bg-gray-800 category-tag-active' : ''
                   } ${isAnimating ? 'pointer-events-none' : ''}`}
                   onClick={() => handleCategoryClick(category.id)}
                 >
                   <span className="font-mono text-sm">[●] {category.label}</span>
                 </div>
               ))}
            </div>
          </div>

                     {/* News Articles for Selected Category */}
           {selectedCategory && (
             <div className={`border-t border-gray-800 pt-8 mt-12 ${showContent ? 'category-expand' : 'category-collapse'}`}>
               <div className="category-content">
                 <div className="flex items-center justify-between mb-6">
                   <h4 className="text-sm font-black text-[#cd48ec] font-mono">
                     [{categories.find(cat => cat.id === selectedCategory)?.label}_NEWS]
                   </h4>
                   <div className="flex items-center space-x-3">
                     {isAnimating && (
                       <div className="inline-flex items-center space-x-2 text-gray-400 font-mono text-xs">
                         <div className="w-3 h-3 border border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                         <span>SWITCHING...</span>
                       </div>
                     )}
                     <button
                       onClick={() => handleCloseCategory()}
                       className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded border border-gray-600 font-mono text-xs transition-all duration-200 hover:border-[#cd48ec] hover:shadow-lg disabled:opacity-50"
                       disabled={isAnimating}
                     >
                       CLOSE [X]
                     </button>
                   </div>
                 </div>
                 <GamingNews
                   maxArticles={4}
                   showImages={true}
                   layout="list"
                   query={categories.find(cat => cat.id === selectedCategory)?.query}
                 />
               </div>
             </div>
           )}
        </div>
      </div>

      {/* Featured Spotlight Section - Dynamic Content */}
      <FeaturedSpotlight />

      {/* Footer */}
      <footer className="bg-black text-white border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-8 py-16">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand Section */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <Image 
                  src="/logo.png" 
                  alt="Patchdrop Logo" 
                  width={40} 
                  height={40} 
                  className="rounded-full" 
                />
                <span className="text-xl font-black">PATCHDROP</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed font-mono">
                THE ULTIMATE DESTINATION FOR GAMING NEWS, HARDWARE REVIEWS, AND INDUSTRY INSIGHTS. 
                STAY AHEAD OF THE CURVE.
              </p>
              <div className="flex space-x-4">
                <div className="relative group w-10 h-10 bg-[#cd48ec] rounded flex items-center justify-center hover:bg-[#b93fd4] transition-colors cursor-pointer">
                  <span className="text-black font-mono text-xs">TW</span>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-black border border-[#cd48ec] rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                    <span className="text-[#cd48ec] font-mono text-xs">[● COMING SOON]</span>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[#cd48ec]"></div>
                  </div>
                </div>
                <div className="relative group w-10 h-10 bg-[#cd48ec] rounded flex items-center justify-center hover:bg-[#b93fd4] transition-colors cursor-pointer">
                  <span className="text-black font-mono text-xs">YT</span>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-black border border-[#cd48ec] rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                    <span className="text-[#cd48ec] font-mono text-xs">[● COMING SOON]</span>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[#cd48ec]"></div>
                  </div>
                </div>
                <div className="relative group w-10 h-10 bg-[#cd48ec] rounded flex items-center justify-center hover:bg-[#b93fd4] transition-colors cursor-pointer">
                  <span className="text-black font-mono text-xs">DC</span>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-black border border-[#cd48ec] rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                    <span className="text-[#cd48ec] font-mono text-xs">[● COMING SOON]</span>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[#cd48ec]"></div>
                  </div>
                </div>
                <div className="relative group w-10 h-10 bg-[#cd48ec] rounded flex items-center justify-center hover:bg-[#b93fd4] transition-colors cursor-pointer">
                  <span className="text-black font-mono text-xs">RD</span>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-black border border-[#cd48ec] rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                    <span className="text-[#cd48ec] font-mono text-xs">[● COMING SOON]</span>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[#cd48ec]"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Gaming Legends */}
            <div className="space-y-6">
              <h3 className="text-lg font-black text-[#cd48ec] font-mono">[GAMING_LEGENDS]</h3>
              <div className="space-y-3 font-mono text-sm">
                <div className="text-gray-400 hover:text-[#cd48ec] transition-colors cursor-pointer group">
                  <span className="opacity-60">"</span>WAR. WAR NEVER CHANGES.<span className="opacity-60">"</span>
                  <div className="text-xs opacity-50 group-hover:opacity-70">- FALLOUT</div>
                </div>
                <div className="text-gray-400 hover:text-[#cd48ec] transition-colors cursor-pointer group">
                  <span className="opacity-60">"</span>THE CAKE IS A LIE.<span className="opacity-60">"</span>
                  <div className="text-xs opacity-50 group-hover:opacity-70">- PORTAL</div>
                </div>
                <div className="text-gray-400 hover:text-[#cd48ec] transition-colors cursor-pointer group">
                  <span className="opacity-60">"</span>A MAN CHOOSES, A SLAVE OBEYS.<span className="opacity-60">"</span>
                  <div className="text-xs opacity-50 group-hover:opacity-70">- BIOSHOCK</div>
                </div>
                <div className="text-gray-400 hover:text-[#cd48ec] transition-colors cursor-pointer group">
                  <span className="opacity-60">"</span>FINISH HIM!<span className="opacity-60">"</span>
                  <div className="text-xs opacity-50 group-hover:opacity-70">- MORTAL KOMBAT</div>
                </div>
              </div>
            </div>

            {/* Epic Moments */}
            <div className="space-y-6">
              <h3 className="text-lg font-black text-[#cd48ec] font-mono">[EPIC_MOMENTS]</h3>
              <div className="space-y-3 font-mono text-sm">
                <div className="text-gray-400 hover:text-[#cd48ec] transition-colors cursor-pointer group">
                  <span className="opacity-60">"</span>WAKE UP, MR. FREEMAN.<span className="opacity-60">"</span>
                  <div className="text-xs opacity-50 group-hover:opacity-70">- HALF-LIFE</div>
                </div>
                <div className="text-gray-400 hover:text-[#cd48ec] transition-colors cursor-pointer group">
                  <span className="opacity-60">"</span>IT'S DANGEROUS TO GO ALONE!<span className="opacity-60">"</span>
                  <div className="text-xs opacity-50 group-hover:opacity-70">- ZELDA</div>
                </div>
                <div className="text-gray-400 hover:text-[#cd48ec] transition-colors cursor-pointer group">
                  <span className="opacity-60">"</span>KEPT YOU WAITING, HUH?<span className="opacity-60">"</span>
                  <div className="text-xs opacity-50 group-hover:opacity-70">- METAL GEAR</div>
                </div>
                <div className="text-gray-400 hover:text-[#cd48ec] transition-colors cursor-pointer group">
                  <span className="opacity-60">"</span>STAY AWHILE AND LISTEN.<span className="opacity-60">"</span>
                  <div className="text-xs opacity-50 group-hover:opacity-70">- DIABLO</div>
                </div>
              </div>
            </div>

            {/* Newsletter Signup - moved to the right */}
            <div className="space-y-6">
              <h3 className="text-lg font-black text-[#cd48ec] font-mono">[STAY_CONNECTED]</h3>
              <p className="text-gray-400 text-sm font-mono">
                GET BREAKING GAMING NEWS AND EXCLUSIVE DROPS DELIVERED TO YOUR TERMINAL.
              </p>
              <div className="space-y-3">
                <div className="flex">
                  <input 
                    type="email" 
                    placeholder="your.email@domain.com" 
                    className="flex-1 bg-gray-900 border border-gray-700 px-4 py-2 text-sm font-mono focus:border-[#cd48ec] focus:outline-none"
                  />
                  <Button className="bg-[#cd48ec] text-black hover:bg-[#b93fd4] font-mono px-6">
                    SYNC
                  </Button>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="newsletter" className="w-4 h-4 text-[#cd48ec]" />
                  <label htmlFor="newsletter" className="text-xs text-gray-400 font-mono">
                    RECEIVE WEEKLY TECH REPORTS
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Platform Links */}
          {/* <div className="border-t border-gray-800 pt-8 mb-8">
            <h4 className="text-sm font-black text-[#cd48ec] font-mono mb-4">[SUPPORTED_PLATFORMS]</h4>
            <div className="flex flex-wrap gap-4">
              <div className="bg-gray-900 px-4 py-2 rounded border border-gray-700 hover:border-[#cd48ec] transition-colors">
                <span className="font-mono text-sm">STEAM</span>
              </div>
              <div className="bg-gray-900 px-4 py-2 rounded border border-gray-700 hover:border-[#cd48ec] transition-colors">
                <span className="font-mono text-sm">PLAYSTATION 5</span>
              </div>
              <div className="bg-gray-900 px-4 py-2 rounded border border-gray-700 hover:border-[#cd48ec] transition-colors">
                <span className="font-mono text-sm">XBOX SERIES X|S</span>
              </div>
              <div className="bg-gray-900 px-4 py-2 rounded border border-gray-700 hover:border-[#cd48ec] transition-colors">
                <span className="font-mono text-sm">EPIC GAMES</span>
              </div>
              <div className="bg-gray-900 px-4 py-2 rounded border border-gray-700 hover:border-[#cd48ec] transition-colors">
                <span className="font-mono text-sm">NVIDIA GeForce NOW</span>
              </div>
            </div>
          </div> */}

          {/* Bottom Footer */}
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-8 text-xs font-mono text-gray-400">
              <span>© 2024 PATCHDROP INTERACTIVE. ALL RIGHTS RESERVED.</span>
              <div className="flex space-x-4">
                <span className="hover:text-white transition-colors cursor-pointer">PRIVACY_POLICY</span>
                <span className="hover:text-white transition-colors cursor-pointer">TERMS_OF_SERVICE</span>
                <span className="hover:text-white transition-colors cursor-pointer">COOKIE_SETTINGS</span>
                <span className="hover:text-white transition-colors cursor-pointer">CONTACT_US</span>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-xs font-mono text-gray-400">
              <span>POWERED BY</span>
              <div className="w-2 h-2 bg-[#cd48ec] rounded-full animate-pulse"></div>
              <span className="text-[#cd48ec]">NEXT.JS & VERCEL</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
