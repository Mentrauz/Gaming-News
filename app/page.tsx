import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Download, X, Square, Grid3X3, RotateCcw, Plus, Minus } from "lucide-react"
import { UnsplashImageComponent } from "@/components/UnsplashImage"

export default function HomePage() {
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

      {/* Hero Section */}
      <div className="relative h-screen flex">
        {/* Main Content */}
        <div className="flex-1 relative">
          <UnsplashImageComponent 
            query="cyberpunk gaming futuristic neon city" 
            alt="Patchdrop Game Background" 
            width={1920} 
            height={1080}
            fill={true}
            className="object-cover" 
            priority={true}
            orientation="landscape"
          />
          <div className="absolute inset-0 bg-black/20">
            <div className="flex flex-col justify-center h-full px-16">
              <div className="mb-8">
                <h1 className="text-5xl font-black tracking-tight leading-tight mb-0 max-w-4xl">
                  BREAKING:<br />
                  Game Studio<br />
                  Announces New Title
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>

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

          {/* Game Screenshots */}
          <div className="grid grid-cols-2 gap-3 mt-16">
            <div className="aspect-video bg-purple-900 rounded overflow-hidden relative">
              <UnsplashImageComponent
                query="gaming setup rgb keyboard mouse"
                alt="Game Screenshot 1"
                width={300}
                height={169}
                className="w-full h-full object-cover"
                orientation="landscape"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-3">
                <p className="text-white font-bold text-sm">BATTLE STATION READY</p>
              </div>
            </div>
            <div className="aspect-video bg-blue-900 rounded overflow-hidden relative">
              <UnsplashImageComponent
                query="esports tournament competitive gaming"
                alt="Game Screenshot 2"
                width={300}
                height={169}
                className="w-full h-full object-cover"
                orientation="landscape"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-3">
                <p className="text-white font-bold text-sm">COMPETE AT THE HIGHEST LEVEL</p>
              </div>
            </div>
            <div className="aspect-video bg-green-900 rounded overflow-hidden relative">
              <UnsplashImageComponent
                query="virtual reality gaming headset futuristic"
                alt="Game Screenshot 3"
                width={300}
                height={169}
                className="w-full h-full object-cover"
                orientation="landscape"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-3">
                <p className="text-white font-bold text-sm">NEXT-GEN IMMERSION</p>
              </div>
            </div>
            <div className="aspect-video bg-red-900 rounded overflow-hidden relative">
              <UnsplashImageComponent
                query="gaming streamer setup neon lights professional"
                alt="Game Screenshot 4"
                width={300}
                height={169}
                className="w-full h-full object-cover"
                orientation="landscape"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-3">
                <p className="text-white font-bold text-sm">STREAM LIKE A PRO</p>
              </div>
            </div>
          </div>
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
              <div className="font-mono text-sm text-gray-300 flex-1">
                <span className="text-[#cd48ec]">[12:45 GMT]</span> Major gaming studio announces surprise acquisition • 
                <span className="text-[#cd48ec]"> [12:30 GMT]</span> New GPU benchmark results leaked • 
                <span className="text-[#cd48ec]"> [12:15 GMT]</span> Esports tournament prize pool reaches record high
              </div>
            </div>
          </div>

          {/* News Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Featured Story */}
            <div className="lg:col-span-2 bg-gray-900 border border-gray-700 rounded-lg overflow-hidden hover:border-[#cd48ec] transition-colors group">
              <div className="aspect-video relative">
                                 <UnsplashImageComponent
                   query="esports tournament championship prize pool competitive gaming arena"
                   alt="Featured Gaming News"
                   width={600}
                   height={338}
                   className="w-full h-full object-cover"
                   orientation="landscape"
                 />
                <div className="absolute top-4 left-4 bg-[#cd48ec] text-black px-3 py-1 text-xs font-mono font-bold">
                  FEATURED
                </div>
                <div className="absolute bottom-4 left-4 bg-black/80 text-white px-4 py-2 backdrop-blur-sm">
                  <p className="font-mono text-xs text-[#cd48ec] mb-1">[ESPORTS]</p>
                  <p className="font-bold text-lg">WORLD CHAMPIONSHIP FINALS SET</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-black mb-4 group-hover:text-[#cd48ec] transition-colors">
                  MAJOR ESPORTS TOURNAMENT ANNOUNCES RECORD PRIZE POOL AND NEW FORMAT CHANGES
                </h3>
                <p className="text-gray-400 font-mono text-sm leading-relaxed mb-4">
                  The upcoming championship will feature revolutionary gameplay mechanics and the largest prize pool in competitive gaming history. Teams from around the world prepare for the ultimate showdown.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-xs font-mono text-gray-500">
                    <span>[●] 2 HOURS AGO</span>
                    <span>[●] BY PATCHDROP_TEAM</span>
                    <span>[●] 847 VIEWS</span>
                  </div>
                  <div className="text-[#cd48ec] font-mono text-sm cursor-pointer hover:text-white">
                    READ_MORE [↗]
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar News */}
            <div className="space-y-6">
              {/* News Card 1 */}
              <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 hover:border-[#cd48ec] transition-colors group cursor-pointer">
                <div className="flex items-start space-x-4">
                  <div className="w-20 h-20 bg-purple-900 rounded overflow-hidden flex-shrink-0">
                                         <UnsplashImageComponent
                       query="next generation GPU graphics card performance benchmark leak"
                       alt="GPU News"
                       width={80}
                       height={80}
                       className="w-full h-full object-cover"
                       orientation="squarish"
                     />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-xs text-[#cd48ec] mb-2">[HARDWARE]</p>
                    <h4 className="font-bold text-sm mb-2 group-hover:text-[#cd48ec] transition-colors">
                      NEXT-GEN GPU LEAK REVEALS MASSIVE PERFORMANCE GAINS
                    </h4>
                    <div className="text-xs font-mono text-gray-500">
                      <span>[●] 4 HOURS AGO</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* News Card 2 */}
              <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 hover:border-[#cd48ec] transition-colors group cursor-pointer">
                <div className="flex items-start space-x-4">
                  <div className="w-20 h-20 bg-blue-900 rounded overflow-hidden flex-shrink-0">
                                         <UnsplashImageComponent
                       query="indie game development studio programming engine revolutionary coding"
                       alt="Dev News"
                       width={80}
                       height={80}
                       className="w-full h-full object-cover"
                       orientation="squarish"
                     />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-xs text-[#cd48ec] mb-2">[DEV_UPDATES]</p>
                    <h4 className="font-bold text-sm mb-2 group-hover:text-[#cd48ec] transition-colors">
                      INDIE STUDIO RELEASES REVOLUTIONARY GAME ENGINE
                    </h4>
                    <div className="text-xs font-mono text-gray-500">
                      <span>[●] 6 HOURS AGO</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* News Card 3 */}
              <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 hover:border-[#cd48ec] transition-colors group cursor-pointer">
                <div className="flex items-start space-x-4">
                  <div className="w-20 h-20 bg-green-900 rounded overflow-hidden flex-shrink-0">
                                         <UnsplashImageComponent
                       query="mobile gaming market milestone smartphone gaming industry growth"
                       alt="Mobile Gaming News"
                       width={80}
                       height={80}
                       className="w-full h-full object-cover"
                       orientation="squarish"
                     />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-xs text-[#cd48ec] mb-2">[MOBILE]</p>
                    <h4 className="font-bold text-sm mb-2 group-hover:text-[#cd48ec] transition-colors">
                      MOBILE GAMING MARKET REACHES NEW MILESTONE
                    </h4>
                    <div className="text-xs font-mono text-gray-500">
                      <span>[●] 8 HOURS AGO</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Category Tags */}
          <div className="border-t border-gray-800 pt-8">
            <h4 className="text-sm font-black text-[#cd48ec] font-mono mb-6">[EXPLORE_CATEGORIES]</h4>
            <div className="flex flex-wrap gap-3">
              <div className="bg-gray-900 px-4 py-2 rounded border border-gray-700 hover:border-[#cd48ec] hover:bg-gray-800 transition-colors cursor-pointer">
                <span className="font-mono text-sm">[●] FPS_FOCUS</span>
              </div>
              <div className="bg-gray-900 px-4 py-2 rounded border border-gray-700 hover:border-[#cd48ec] hover:bg-gray-800 transition-colors cursor-pointer">
                <span className="font-mono text-sm">[●] RPG_REALM</span>
              </div>
              <div className="bg-gray-900 px-4 py-2 rounded border border-gray-700 hover:border-[#cd48ec] hover:bg-gray-800 transition-colors cursor-pointer">
                <span className="font-mono text-sm">[●] INDIE_INSIDER</span>
              </div>
              <div className="bg-gray-900 px-4 py-2 rounded border border-gray-700 hover:border-[#cd48ec] hover:bg-gray-800 transition-colors cursor-pointer">
                <span className="font-mono text-sm">[●] HARDWARE_HUB</span>
              </div>
              <div className="bg-gray-900 px-4 py-2 rounded border border-gray-700 hover:border-[#cd48ec] hover:bg-gray-800 transition-colors cursor-pointer">
                <span className="font-mono text-sm">[●] RUMOR_RADAR</span>
              </div>
              <div className="bg-gray-900 px-4 py-2 rounded border border-gray-700 hover:border-[#cd48ec] hover:bg-gray-800 transition-colors cursor-pointer">
                <span className="font-mono text-sm">[●] PATCH_NOTES</span>
              </div>
              <div className="bg-gray-900 px-4 py-2 rounded border border-gray-700 hover:border-[#cd48ec] hover:bg-gray-800 transition-colors cursor-pointer">
                <span className="font-mono text-sm">[●] ESPORTS_ELITE</span>
              </div>
              <div className="bg-gray-900 px-4 py-2 rounded border border-gray-700 hover:border-[#cd48ec] hover:bg-gray-800 transition-colors cursor-pointer">
                <span className="font-mono text-sm">[●] DEV_DIARIES</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Creators Section */}
      <div className="min-h-screen bg-white text-black flex">
        <div className="flex-1 flex flex-col">
          {/* Text content */}
          <div className="flex-1 flex flex-col justify-center px-16 py-12">
            <div className="mb-12">
              <div className="text-xs font-mono mb-6 text-gray-600 uppercase tracking-wider">A TEAM-BASED EXTRACTION SHOOTER</div>
              <h2 className="text-5xl lg:text-6xl font-black leading-[0.9] mb-8 max-w-lg">
                FROM THE CREATORS
                <br />
                OF HALO AND DESTINY
              </h2>
            </div>

            <div className="max-w-lg space-y-6 font-mono text-sm leading-relaxed">
              <p>
                YOU ARE A RUNNER, A CYBERNETIC MERCENARY SCOURING THE REMAINS OF A LOST COLONY FOR FORTUNE AND POWER. TEAM
                UP IN CREWS OF THREE AS YOU BATTLE RIVAL RUNNER TEAMS AND HOSTILE SECURITY FORCES FOR WEAPONS AND
                UPGRADES.
              </p>
              <p>
                SURVIVE AND EVERYTHING YOU'VE SCAVENGED IS YOURS TO KEEP FOR FUTURE RUNS ON TAU CETI IV OR IF YOU'RE BRAVE
                ENOUGH, A JOURNEY TO THE DERELICT Patchdrop SHIP THAT HANGS ABOVE.
              </p>
            </div>
          </div>
          
          {/* Half-height image below text */}
          <div className="flex-1 relative min-h-[400px]">
            <UnsplashImageComponent
              query="cyberpunk runner mercenary gaming character art"
              alt="Cybernetic Runner Character"
              width={800}
              height={400}
              className="w-full h-full object-cover"
              orientation="landscape"
            />
            <div className="absolute top-6 left-6 bg-black/70 text-white px-4 py-3 backdrop-blur-sm">
              <p className="font-mono text-xs mb-1 opacity-80">BECOME THE LEGEND</p>
              <p className="font-bold text-lg">FORGE YOUR DESTINY</p>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          {/* Half-height image */}
          <div className="flex-1 relative min-h-[400px]">
            <UnsplashImageComponent
              query="futuristic spaceship sci-fi gaming concept art"
              alt="Patchdrop Game Artwork"
              width={800}
              height={400}
              className="w-full h-full object-cover"
              orientation="landscape"
            />
            <div className="absolute top-6 right-6 bg-black/70 text-white px-4 py-3 backdrop-blur-sm">
              <p className="font-mono text-xs mb-1 opacity-80">EXPLORE THE UNKNOWN</p>
              <p className="font-bold text-lg">NEW FRONTIERS AWAIT</p>
            </div>
          </div>
          
          {/* Text content below image */}
          <div className="flex-1 flex flex-col justify-center px-16 py-12">
            <div className="mb-12">
              <div className="text-xs font-mono mb-6 text-gray-600 uppercase tracking-wider">NEXT-GENERATION GAMEPLAY</div>
              <h3 className="text-5xl lg:text-6xl font-black leading-[0.9] mb-8 max-w-lg">
                IMMERSIVE COMBAT
                <br />
                TACTICAL STRATEGY
              </h3>
            </div>

            <div className="max-w-lg space-y-6 font-mono text-sm leading-relaxed">
              <p>
                EXPERIENCE REVOLUTIONARY COMBAT MECHANICS WITH ADVANCED AI COMPANIONS. UTILIZE CUTTING-EDGE WEAPONS SYSTEMS
                AND ENVIRONMENTAL DESTRUCTION TO GAIN THE UPPER HAND IN BATTLES.
              </p>
              <p>
                COORDINATE WITH YOUR SQUAD USING REAL-TIME TACTICAL COMMUNICATION. ADAPT YOUR STRATEGY AS DYNAMIC EVENTS
                UNFOLD ACROSS PROCEDURALLY GENERATED BATTLEFIELDS.
              </p>
            </div>
          </div>
        </div>
      </div>

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

            {/* Gaming Coverage */}
            <div className="space-y-6">
              <h3 className="text-lg font-black text-[#cd48ec] font-mono">[GAMING_COVERAGE]</h3>
              <div className="space-y-3 font-mono text-sm">
                <div className="text-gray-400 hover:text-white transition-colors cursor-pointer">[●] LATEST DROPS</div>
                <div className="text-gray-400 hover:text-white transition-colors cursor-pointer">[●] PATCH NOTES</div>
                <div className="text-gray-400 hover:text-white transition-colors cursor-pointer">[●] GAMING NEWS</div>
                <div className="text-gray-400 hover:text-white transition-colors cursor-pointer">[●] RUMOR RADAR</div>
                <div className="text-gray-400 hover:text-white transition-colors cursor-pointer">[●] FPS FOCUS</div>
                <div className="text-gray-400 hover:text-white transition-colors cursor-pointer">[●] DEV INTERVIEWS</div>
                <div className="text-gray-400 hover:text-white transition-colors cursor-pointer">[●] DROP REVIEWS</div>
              </div>
            </div>

            {/* Tech Hub */}
            <div className="space-y-6">
              <h3 className="text-lg font-black text-[#cd48ec] font-mono">[TECH_HUB]</h3>
              <div className="space-y-3 font-mono text-sm">
                <div className="text-gray-400 hover:text-white transition-colors cursor-pointer">[●] HARDWARE REVIEWS</div>
                <div className="text-gray-400 hover:text-white transition-colors cursor-pointer">[●] BENCHMARKS</div>
                <div className="text-gray-400 hover:text-white transition-colors cursor-pointer">[●] PRICE TRACKER</div>
                <div className="text-gray-400 hover:text-white transition-colors cursor-pointer">[●] BUILD GUIDES</div>
                <div className="text-gray-400 hover:text-white transition-colors cursor-pointer">[●] GPU UPDATES</div>
                <div className="text-gray-400 hover:text-white transition-colors cursor-pointer">[●] COOLING TECH</div>
                <div className="text-gray-400 hover:text-white transition-colors cursor-pointer">[●] MARKET ANALYSIS</div>
              </div>
            </div>

            {/* Newsletter Signup */}
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
