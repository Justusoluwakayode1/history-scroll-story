import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { EbookCard } from "@/components/EbookCard";
import { FeaturedStory } from "@/components/FeaturedStory";
import { stories } from "@/data/stories";
import { Button } from "@/components/ui/button";
import { SearchDialog } from "@/components/SearchDialog";

const Index = () => {
  const [selectedEra, setSelectedEra] = useState<string>("all");
  const [selectedRegion, setSelectedRegion] = useState<string>("all");
  const [selectedTopic, setSelectedTopic] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

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
    const matchesSearch = searchQuery === "" || 
      story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesEra && matchesRegion && matchesTopic && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background paper-texture">
      <Header />

      {/* Hero Section with Historic Background Image */}
      <section className="relative overflow-hidden border-b border-border">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1461360370896-922624d12a74?w=1920&q=80" 
            alt="Historic manuscripts and ancient texts"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/85 to-primary/20" />
        </div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="max-w-4xl mx-auto text-center space-y-5 animate-fade-up">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-foreground leading-tight drop-shadow-lg">
              Read History Like
              <span className="block text-primary mt-2">Beautiful Ebooks</span>
            </h1>
            <p className="text-base sm:text-lg text-foreground/90 max-w-2xl mx-auto leading-relaxed drop-shadow">
              Explore centuries of human achievement through beautifully crafted stories.
              No signup required—just dive in and start reading.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-3">
              <SearchDialog
                eras={eras}
                regions={regions}
                topics={topics}
                selectedEra={selectedEra}
                selectedRegion={selectedRegion}
                selectedTopic={selectedTopic}
                searchQuery={searchQuery}
                onEraChange={setSelectedEra}
                onRegionChange={setSelectedRegion}
                onTopicChange={setSelectedTopic}
                onSearchChange={setSearchQuery}
                totalResults={filteredStories.length}
              />
              <Button
                size="lg"
                variant="outline"
                className="border-2 px-6 h-12 text-base font-medium hover:bg-muted backdrop-blur"
                onClick={() => {
                  document.getElementById("library")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Browse All →
              </Button>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 text-5xl opacity-20 animate-float z-10 drop-shadow">🏛️</div>
        <div className="absolute bottom-10 right-10 text-5xl opacity-20 animate-float z-10 drop-shadow" style={{ animationDelay: "1s" }}>
          📜
        </div>
      </section>

      {/* Featured Story - Dynamic Discovery */}
      <FeaturedStory />

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

          {/* Ebook Grid - Many more cards per row */}
          {filteredStories.length > 0 ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-2 sm:gap-3 animate-fade-in">
              {filteredStories.map((story, index) => (
                <div
                  key={story.id}
                  className="animate-fade-up"
                  style={{ animationDelay: `${Math.min(index * 0.02, 0.3)}s` }}
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

      {/* Call to Action - Gold Theme */}
      <section className="border-t border-border bg-gradient-to-br from-[hsl(41,48%,55%)]/20 via-[hsl(41,48%,49%)]/15 to-[hsl(41,60%,60%)]/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground">
              Want to Save Your Journey?
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Create a free account to bookmark stories, track your reading progress,
              and get personalized recommendations.
            </p>
            <Link to="/auth">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-[hsl(41,48%,49%)] text-[hsl(41,48%,40%)] hover:bg-[hsl(41,48%,49%)] hover:text-white px-8 h-12 text-base font-medium"
              >
                Create Free Account
              </Button>
            </Link>
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/auth" className="text-[hsl(41,48%,40%)] hover:underline font-medium">
                Sign in
              </Link>
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
                  <Link to="/library" className="hover:text-foreground transition-colors">
                    All Stories
                  </Link>
                </li>
                <li>
                  <Link to="/library" className="hover:text-foreground transition-colors">
                    Ancient History
                  </Link>
                </li>
                <li>
                  <Link to="/library" className="hover:text-foreground transition-colors">
                    Medieval Times
                  </Link>
                </li>
                <li>
                  <Link to="/library" className="hover:text-foreground transition-colors">
                    Modern Era
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-foreground">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link to="/about" className="hover:text-foreground transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-foreground transition-colors">
                    Contact
                  </Link>
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
