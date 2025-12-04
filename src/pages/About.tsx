import { BookOpen, Users, Globe, Award, Heart, Sparkles } from "lucide-react";
import { Header } from "@/components/Header";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(41,50%,45%)] via-[hsl(41,48%,50%)] to-[hsl(41,55%,55%)]">
      <Header />
      
      {/* Hero Section - Rich Gold Theme */}
      <section className="relative overflow-hidden border-b border-[hsl(41,48%,55%)] bg-gradient-to-br from-[hsl(41,50%,48%)] via-[hsl(41,48%,52%)] to-[hsl(41,55%,58%)]">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/image.jpg" 
            alt="About" 
            className="w-full h-full object-cover opacity-30"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[hsl(41,50%,48%)] via-[hsl(41,48%,52%)] to-[hsl(41,55%,58%)]" />
        </div>
        <div className="absolute inset-0 opacity-20 z-0">
          <div className="absolute top-10 left-10 text-6xl">🏛️</div>
          <div className="absolute bottom-10 right-10 text-6xl">📜</div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-8xl opacity-10">👑</div>
        </div>
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="rounded-full bg-white/20 backdrop-blur p-3 border border-white/30">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white drop-shadow-lg">
                About HistoryHub
              </h1>
            </div>
            <p className="text-lg text-white/95 max-w-2xl mx-auto drop-shadow">
              Your digital sanctuary for exploring human history through beautifully crafted stories.
            </p>
          </div>
        </div>
      </section>
      
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Mission Section */}
        <div className="bg-white/95 backdrop-blur rounded-xl p-8 md:p-10 border-2 border-white/50 shadow-elegant mb-12 hover:shadow-[var(--shadow-card-hover)] transition-shadow">
          <div className="flex items-center gap-3 mb-6">
            <div className="rounded-full bg-[hsl(41,48%,50%)]/20 p-2 border-2 border-[hsl(41,48%,50%)]">
              <Heart className="h-6 w-6 text-[hsl(41,48%,40%)]" />
            </div>
            <h2 className="text-3xl font-serif font-bold text-[hsl(41,48%,30%)]">Our Mission</h2>
          </div>
          <p className="text-[hsl(41,48%,25%)] leading-relaxed text-lg">
            HistoryHub was created with a simple belief: <span className="font-semibold text-[hsl(41,48%,20%)]">history should be accessible to everyone</span>. 
            We transform complex historical events into engaging, easy-to-read stories that bring 
            the past to life. No signup required, no paywalls—just pure, beautiful storytelling 
            about the events that shaped our world.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white/95 backdrop-blur rounded-xl p-6 md:p-8 border-2 border-white/50 hover:shadow-elegant transition-all hover:scale-[1.02] group">
            <div className="rounded-full bg-[hsl(125,32%,25%)]/20 w-14 h-14 flex items-center justify-center mb-4 group-hover:bg-[hsl(125,32%,25%)]/30 transition-colors border-2 border-[hsl(125,32%,25%)]/30">
              <BookOpen className="h-7 w-7 text-[hsl(125,32%,25%)]" />
            </div>
            <h3 className="text-xl font-serif font-bold text-[hsl(41,48%,25%)] mb-3">Curated Stories</h3>
            <p className="text-[hsl(41,48%,30%)] leading-relaxed">
              Every story is carefully researched and written to be engaging, accurate, and accessible. 
              We combine scholarly rigor with beautiful storytelling.
            </p>
          </div>

          <div className="bg-white/95 backdrop-blur rounded-xl p-6 md:p-8 border-2 border-white/50 hover:shadow-elegant transition-all hover:scale-[1.02] group">
            <div className="rounded-full bg-[hsl(41,48%,50%)]/20 w-14 h-14 flex items-center justify-center mb-4 group-hover:bg-[hsl(41,48%,50%)]/30 transition-colors border-2 border-[hsl(41,48%,50%)]/30">
              <Globe className="h-7 w-7 text-[hsl(41,48%,40%)]" />
            </div>
            <h3 className="text-xl font-serif font-bold text-[hsl(41,48%,25%)] mb-3">Global Perspective</h3>
            <p className="text-[hsl(41,48%,30%)] leading-relaxed">
              From Ancient Egypt to Modern revolutions, we cover history from every corner of the world, 
              ensuring diverse voices and perspectives.
            </p>
          </div>

          <div className="bg-white/95 backdrop-blur rounded-xl p-6 md:p-8 border-2 border-white/50 hover:shadow-elegant transition-all hover:scale-[1.02] group">
            <div className="rounded-full bg-[hsl(125,32%,25%)]/20 w-14 h-14 flex items-center justify-center mb-4 group-hover:bg-[hsl(125,32%,25%)]/30 transition-colors border-2 border-[hsl(125,32%,25%)]/30">
              <Users className="h-7 w-7 text-[hsl(125,32%,25%)]" />
            </div>
            <h3 className="text-xl font-serif font-bold text-[hsl(41,48%,25%)] mb-3">Free for Everyone</h3>
            <p className="text-[hsl(41,48%,30%)] leading-relaxed">
              No account needed. Start reading immediately—100% of our content is free, forever. 
              Knowledge should never be behind a paywall.
            </p>
          </div>

          <div className="bg-white/95 backdrop-blur rounded-xl p-6 md:p-8 border-2 border-white/50 hover:shadow-elegant transition-all hover:scale-[1.02] group">
            <div className="rounded-full bg-[hsl(41,48%,50%)]/20 w-14 h-14 flex items-center justify-center mb-4 group-hover:bg-[hsl(41,48%,50%)]/30 transition-colors border-2 border-[hsl(41,48%,50%)]/30">
              <Award className="h-7 w-7 text-[hsl(41,48%,40%)]" />
            </div>
            <h3 className="text-xl font-serif font-bold text-[hsl(41,48%,25%)] mb-3">Quality First</h3>
            <p className="text-[hsl(41,48%,30%)] leading-relaxed">
              Beautiful typography, stunning imagery, and meticulous attention to historical accuracy. 
              Every detail matters in bringing history to life.
            </p>
          </div>
        </div>

        {/* Quote Section */}
        <div className="bg-white/95 backdrop-blur rounded-xl p-8 md:p-10 border-2 border-white/50 text-center relative overflow-hidden">
          <div className="absolute top-4 right-4 opacity-20">
            <Sparkles className="h-16 w-16 text-[hsl(41,48%,50%)]" />
          </div>
          <div className="relative z-10">
            <p className="text-xl md:text-2xl font-serif italic text-[hsl(41,48%,25%)] mb-4 leading-relaxed">
              "Those who cannot remember the past are condemned to repeat it."
            </p>
            <p className="text-sm text-[hsl(41,48%,35%)] font-medium">— George Santayana</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;
