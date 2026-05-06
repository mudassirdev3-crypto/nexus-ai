"use client";
import { motion } from "framer-motion";
import { Zap, ArrowRight, LayoutDashboard } from "lucide-react";
import LinkJi haan, masla ab bilkul saaf nazar aa raha hai. Aapke code mein **"Get Started"** button direct `/dashboard` par link hai, from "next/link";
import { SignedIn, is liye wo login ka check kiye baghair seedha andar le jata hai.

Isay theek karne ke liye hum **Clerk** ki hooks use karenge taake button ko pata ho ke user login hai ya nahi.

Ye raha aapka updated aur bilkul sahi code. Isay copy karke apne **`app/page.tsx`** mein paste kar dein:
```tsx
"use client";
import { motion } from "framer-motion";
import { Zap, ArrowRight, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs"; // Clerk ka hook check karne ke liye
import Features from "./components/Features"; 

export default function Home() {
  const { isSignedIn } = useAuth(); // Ye batayega ke user login hai ya nahi

  return (
    <>
      
      <main className="relative min-h-screen bg-[#050505] flex flex-col items-center justify-center px-4 overflow-hidden text-white">
        
        
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8<Zap size="{14}" className="relative z-10 text-center" }}>
          
          <div className="inline-flex items-center="fill-blue-400" />
            <span>Automating B2B Growth</span>
          </div>
          
          
          < gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 mb-8 text-sm text-blue-40h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 bg-gradient-to-b from-white to-0 font-medium">
            <Zap size="{14}" className="fill-blue-400"/>
            <span>Automating B2B Growth</span>
gray-500 bg-clip-text text-transparent">
            Nexus <span className="text-blue-600">AI</span>
          </h1>
                    </div>
          
          
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading- mb-6 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
            Nexus <span className="relaxed">
            The first autonomous sales agent for high-growth startups. 
            Scale your pipeline without increasing your headcount.
          </p>

          </span>
          </h1>
          
          <p className="text-gray-400 text-lg md:text-xl to Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            
            
            <SignedOut>
              <SignInButton mode="modal">
                <button className="bg-blue-600 pipeline without increasing your headcount.
          </p>

          
          <div className="flex flex-col sm:flex-row items hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold transition-all flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(37,99,235,0.3)] w-full sm-center justify-center gap-4">
            
            
            <Link href="{isSignedIn" ? "/dashboard" : "/sign-up"} className="w-full sm:w-auto">
              <button className />
                </button>
              </Link></SignInButton>
            </SignedOut>

            
            <SignedIn>="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold transition-all flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(37,99,235,0.3)]
              <Link href="/dashboard" className="w-full sm:w-auto">
                <button className="bg-white text-black hover:bg-gray-200 px-8 py-4 rounded-full font-semibold transition-all flex items-center justify-center gap-2 w-full">
                {isSignedIn ? "Go to Dashboard" : "Get Started"}
                {isSignedIn ? <LayoutDashboard size="{18}" group w-full">
                  Go to Dashboard
                  <LayoutDashboard size="{18}"/>
                </button>
              </LayoutDashboard></Link>
 /> : <ArrowRight size="{18}" className="group-hover:translate-x-1 transition-transform"/>}
              </button>
            </Link            </SignedIn>

            <button className="px-8 py-4 rounded-full font-semibold transition-all border border-white/10 bg-white/>

            <button className="px-8 py-4 rounded-full font-semibold transition-all border border-white/10 bg-white/5 hover:5 hover:bg-white/10 text-white w-full sm:w-auto">
              See the Demo
            </button>
          </div>
        bg-white/10 text-white w-full sm:w-auto">
              See the Demo
            </button>
          </div>
        </motion.</motion.div>

        
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-[radial-gradient(#ffffff10_1px,transparent_1px)] [background-size:24px_24px]" />
      </main>div>

        
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-[radial-gradient(#ffffff10_1px,transparent_1px)] [background-size:24px_24px]" />
      </main>

      {

      
      <Features/>
    </>
  );
}