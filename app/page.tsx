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
          <div className="grid grid-cols-2 gap-4 mt-16">
            <div className="aspect-video bg-purple-900 rounded overflow-hidden relative">
              <UnsplashImageComponent
                query="gaming setup rgb keyboard mouse"
                alt="Game Screenshot 1"
                width={400}
                height={225}
                className="w-full h-full object-cover"
                orientation="landscape"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                <p className="text-white font-bold">BATTLE STATION READY</p>
              </div>
            </div>
            <div className="aspect-video bg-blue-900 rounded overflow-hidden relative">
              <UnsplashImageComponent
                query="esports tournament competitive gaming"
                alt="Game Screenshot 2"
                width={400}
                height={225}
                className="w-full h-full object-cover"
                orientation="landscape"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                <p className="text-white font-bold">COMPETE AT THE HIGHEST LEVEL</p>
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
    </div>
  )
}
