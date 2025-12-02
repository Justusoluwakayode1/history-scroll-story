import { useState } from "react";
import { Header } from "@/components/Header";
import { EbookCard } from "@/components/EbookCard";
import { stories } from "@/data/stories";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [selectedEra, setSelectedEra] = useState<string>("all");

  const eras = [
    { id: "all", label: "All Eras", icon: "📚" },
    { id: "ancient", label: "Ancient", icon: "🏛️" },
    { id: "medieval", label: "Medieval", icon: "⚔️" },
    { id: "renaissance", label: "Renaissance", icon: "🎨" },
    { id: "modern", label: "Modern", icon: "🌍" },
  ];

  const filteredStories =
    selectedEra === "all"
      ? stories
      : stories.filter((story) => story.era.toLowerCase() === selectedEra);

  return (
    <div className="min-h-screen bg-background paper-texture">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-up">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-foreground leading-tight">
              Read History Like
              <span className="block text-primary mt-2">Beautiful Ebooks</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Explore centuries of human achievement through beautifully crafted stories.
              No signup required—just dive in and start reading.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary-light text-primary-foreground px-8 h-12 text-base font-medium shadow-lg hover:shadow-xl transition-all"
                onClick={() => {
                  document.getElementById("library")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Start Reading →
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 px-8 h-12 text-base font-medium hover:bg-muted"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 text-6xl opacity-10 animate-float">🏛️</div>
        <div className="absolute bottom-10 right-10 text-6xl opacity-10 animate-float" style={{ animationDelay: "1s" }}>
          📖
        </div>
      </section>

      {/* Era Filter */}
      <section className="border-b border-border bg-card/50 backdrop-blur sticky top-16 z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {eras.map((era) => (
              <Button
                key={era.id}
                variant={selectedEra === era.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedEra(era.id)}
                className={`whitespace-nowrap gap-2 transition-all ${
                  selectedEra === era.id
                    ? "bg-primary text-primary-foreground shadow-md scale-105"
                    : "hover:bg-muted"
                }`}
              >
                <span className="text-base">{era.icon}</span>
                {era.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Library Grid */}
      <section id="library" className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="space-y-8">
          {/* Section Header */}
          <div className="text-center space-y-3">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground">
              Explore the Library
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {selectedEra === "all"
                ? `Discover ${stories.length} beautifully crafted historical stories`
                : `${filteredStories.length} ${eras.find((e) => e.id === selectedEra)?.label} stories`}
            </p>
          </div>

          {/* Ebook Grid */}
          {filteredStories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 animate-fade-in">
              {filteredStories.map((story, index) => (
                <div
                  key={story.id}
                  className="animate-fade-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <EbookCard
                    id={story.id}
                    slug={story.slug}
                    title={story.title}
                    era={story.era}
                    eraIcon={story.eraIcon}
                    coverImage={story.coverImage}
                    readTime={story.readTime}
                    rating={story.rating}
                    chapters={story.chapters.length}
                    description={story.description}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground">
                No stories found in this era yet. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="border-t border-border bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground">
              Want to Save Your Journey?
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Create a free account to bookmark stories, track your reading progress,
              and get personalized recommendations.
            </p>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 h-12 text-base font-medium"
            >
              Create Free Account
            </Button>
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <a href="#" className="text-primary hover:underline font-medium">
                Sign in
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="font-serif font-bold text-lg text-foreground">HistoryHub</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Read history like beautiful ebooks. No signup required.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-foreground">Library</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    All Stories
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Ancient History
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Medieval Times
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Modern Era
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-foreground">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-foreground">Follow Us</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            © 2024 HistoryHub. All rights reserved. Built with ❤️ for history lovers.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
