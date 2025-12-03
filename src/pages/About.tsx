import { BookOpen, Users, Globe, Award } from "lucide-react";
import { Header } from "@/components/Header";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">
            About HistoryHub
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your digital sanctuary for exploring human history through beautifully crafted stories.
          </p>
        </div>

        <div className="prose prose-lg max-w-none mb-12">
          <div className="bg-card rounded-xl p-8 border border-border shadow-elegant mb-8">
            <h2 className="text-2xl font-serif font-bold text-foreground mb-4">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              HistoryHub was created with a simple belief: history should be accessible to everyone. 
              We transform complex historical events into engaging, easy-to-read stories that bring 
              the past to life. No signup required, no paywalls—just pure, beautiful storytelling 
              about the events that shaped our world.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-card rounded-xl p-6 border border-border hover:shadow-elegant transition-shadow">
            <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-serif font-bold text-foreground mb-2">Curated Stories</h3>
            <p className="text-muted-foreground text-sm">
              Every story is carefully researched and written to be engaging, accurate, and accessible.
            </p>
          </div>

          <div className="bg-card rounded-xl p-6 border border-border hover:shadow-elegant transition-shadow">
            <div className="rounded-full bg-secondary/10 w-12 h-12 flex items-center justify-center mb-4">
              <Globe className="h-6 w-6 text-secondary" />
            </div>
            <h3 className="text-lg font-serif font-bold text-foreground mb-2">Global Perspective</h3>
            <p className="text-muted-foreground text-sm">
              From Ancient Egypt to Modern revolutions, we cover history from every corner of the world.
            </p>
          </div>

          <div className="bg-card rounded-xl p-6 border border-border hover:shadow-elegant transition-shadow">
            <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-serif font-bold text-foreground mb-2">Free for Everyone</h3>
            <p className="text-muted-foreground text-sm">
              No account needed. Start reading immediately—100% of our content is free, forever.
            </p>
          </div>

          <div className="bg-card rounded-xl p-6 border border-border hover:shadow-elegant transition-shadow">
            <div className="rounded-full bg-secondary/10 w-12 h-12 flex items-center justify-center mb-4">
              <Award className="h-6 w-6 text-secondary" />
            </div>
            <h3 className="text-lg font-serif font-bold text-foreground mb-2">Quality First</h3>
            <p className="text-muted-foreground text-sm">
              Beautiful typography, stunning imagery, and meticulous attention to historical accuracy.
            </p>
          </div>
        </div>

        <div className="text-center bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 rounded-xl p-8 border border-border">
          <p className="text-lg font-serif italic text-foreground">
            "Those who cannot remember the past are condemned to repeat it."
          </p>
          <p className="text-sm text-muted-foreground mt-2">— George Santayana</p>
        </div>
      </main>
    </div>
  );
};

export default About;
