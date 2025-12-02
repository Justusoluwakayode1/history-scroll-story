import { useState } from "react";
import { Header } from "@/components/Header";
import { EbookCard } from "@/components/EbookCard";
import { stories } from "@/data/stories";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [selectedEra, setSelectedEra] = useState<string>("all");
  const [selectedRegion, setSelectedRegion] = useState<string>("all");
  const [selectedTopic, setSelectedTopic] = useState<string>("all");

  const eras = [
    { id: "all", label: "All Eras", icon: "📚" },
    { id: "ancient", label: "Ancient", icon: "🏛️" },
    { id: "medieval", label: "Medieval", icon: "⚔️" },
    { id: "renaissance", label: "Renaissance", icon: "🎨" },
    { id: "modern", label: "Modern", icon: "🌍" },
  ];

  const regions = [
    { id: "all", label: "All Regions", icon: "🌍" },
    { id: "europe", label: "Europe", icon: "🇪🇺" },
    { id: "asia", label: "Asia", icon: "🌏" },
    { id: "africa", label: "Africa", icon: "🌍" },
    { id: "americas", label: "Americas", icon: "🌎" },
    { id: "middle east", label: "Middle East", icon: "🕌" },
  ];

  const topics = [
    { id: "all", label: "All Topics", icon: "📖" },
    { id: "empires & kings", label: "Empires & Kings", icon: "👑" },
    { id: "wars & battles", label: "Wars & Battles", icon: "⚔️" },
    { id: "arts & culture", label: "Arts & Culture", icon: "🎨" },
    { id: "science & tech", label: "Science & Tech", icon: "🔬" },
    { id: "religion & myth", label: "Religion & Myth", icon: "🙏" },
    { id: "disasters", label: "Disasters", icon: "🌋" },
  ];

  const filteredStories = stories.filter((story) => {
    const matchesEra = selectedEra === "all" || story.era.toLowerCase() === selectedEra;
    const matchesRegion = selectedRegion === "all" || story.region.toLowerCase() === selectedRegion;
    const matchesTopic = selectedTopic === "all" || story.topic.toLowerCase() === selectedTopic;
    return matchesEra && matchesRegion && matchesTopic;
  });

  return (
    <div className="min-h-screen bg-background paper-texture">
      <Header />

      {/* Hero Section with Background Image */}
      <section className="relative overflow-hidden border-b border-border">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1920&q=80" 
            alt="Ancient books"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/85 to-primary/20" />
        </div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-up">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-foreground leading-tight drop-shadow-lg">
              Read History Like
              <span className="block text-primary mt-2">Beautiful Ebooks</span>
            </h1>
            <p className="text-lg sm:text-xl text-foreground/90 max-w-2xl mx-auto leading-relaxed drop-shadow">
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
                className="border-2 px-8 h-12 text-base font-medium hover:bg-muted backdrop-blur"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 text-6xl opacity-20 animate-float z-10 drop-shadow">🏛️</div>
        <div className="absolute bottom-10 right-10 text-6xl opacity-20 animate-float z-10 drop-shadow" style={{ animationDelay: "1s" }}>
          📖
        </div>
      </section>

      {/* Multi-Level Filters */}
      <section className="border-b border-border bg-card/50 backdrop-blur sticky top-16 z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-3">
          {/* Era Filter */}
          <div className="space-y-2">
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Era</h3>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {eras.map((era) => (
                <Button
                  key={era.id}
                  variant={selectedEra === era.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedEra(era.id)}
                  className={`whitespace-nowrap gap-1.5 transition-all text-xs h-8 ${
                    selectedEra === era.id
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "hover:bg-muted"
                  }`}
                >
                  <span className="text-sm">{era.icon}</span>
                  {era.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Region Filter */}
          <div className="space-y-2">
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Region</h3>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {regions.map((region) => (
                <Button
                  key={region.id}
                  variant={selectedRegion === region.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedRegion(region.id)}
                  className={`whitespace-nowrap gap-1.5 transition-all text-xs h-8 ${
                    selectedRegion === region.id
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "hover:bg-muted"
                  }`}
                >
                  <span className="text-sm">{region.icon}</span>
                  {region.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Topic Filter */}
          <div className="space-y-2">
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Topic</h3>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {topics.map((topic) => (
                <Button
                  key={topic.id}
                  variant={selectedTopic === topic.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTopic(topic.id)}
                  className={`whitespace-nowrap gap-1.5 transition-all text-xs h-8 ${
                    selectedTopic === topic.id
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "hover:bg-muted"
                  }`}
                >
                  <span className="text-sm">{topic.icon}</span>
                  {topic.label}
                </Button>
              ))}
            </div>
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

          {/* Ebook Grid - More cards per row */}
          {filteredStories.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 lg:gap-5 animate-fade-in">
              {filteredStories.map((story, index) => (
                <div
                  key={story.id}
                  className="animate-fade-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
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
                No stories found with these filters. Try different selections!
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
